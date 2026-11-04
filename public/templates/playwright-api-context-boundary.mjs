import { createServer } from 'node:http';
import { createHash } from 'node:crypto';

const playwrightModuleUrl = process.env.PLAYWRIGHT_MODULE_URL;
const playwrightModuleLabel = playwrightModuleUrl ? 'module URL override' : 'package resolution';
const playwrightModule = playwrightModuleUrl || 'playwright';
const { chromium, request } = await import(playwrightModule);

const host = '127.0.0.1';
const cookieName = 'demo-session';
const cookieValue = 'local-only';
const expectedFile = Buffer.from('  synthetic-upload\r\n');
const server = createServer((req, res) => {
	if (req.url === '/set-cookie') {
		res.writeHead(204, { 'Set-Cookie': `${cookieName}=${cookieValue}; Path=/; SameSite=Lax` });
		res.end();
		return;
	}
	if (req.url === '/whoami') {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end(req.headers.cookie ?? '');
		return;
	}
	if (req.url === '/upload' && req.method === 'POST') {
		const contentType = req.headers['content-type'] ?? '';
		const boundary = /boundary=([^;]+)/i.exec(contentType)?.[1]?.replace(/^"|"$/g, '');
		if (!contentType.toLowerCase().startsWith('multipart/form-data;') || !boundary) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'multipart boundary missing' }));
			return;
		}
		const chunks = [];
		let size = 0;
		req.on('data', (chunk) => {
			size += chunk.length;
			if (size > 65536) req.destroy(new Error('fixture body exceeds 64 KiB'));
			else chunks.push(chunk);
		});
		req.on('end', () => {
			const raw = Buffer.concat(chunks).toString('latin1');
			const parts = raw.split(`--${boundary}`).map((part) => part.replace(/^\r\n/, '').replace(/\r\n$/, '')).filter((part) => part && part !== '--');
			const filePart = parts.find((part) => /name="attachment"/.test(part));
			const textPart = parts.find((part) => /name="label"/.test(part));
			if (!filePart || !textPart) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: 'expected label and attachment parts' }));
				return;
			}
			const [fileHeaders, fileBody = ''] = filePart.split('\r\n\r\n');
			const [textHeaders, textBody = ''] = textPart.split('\r\n\r\n');
			const payload = fileBody;
			const fileBytes = Buffer.from(payload, 'latin1');
			const fieldNames = parts.map((part) => /name="([^"]+)"/.exec(part)?.[1]).filter(Boolean);
			const summary = {
				fieldNames,
				label: textBody,
				filename: /filename="([^"]+)"/.exec(fileHeaders)?.[1] ?? '',
				mimeType: /content-type:\s*([^\r\n]+)/i.exec(fileHeaders)?.[1] ?? '',
				fileBytes: fileBytes.length,
				fileSha256: createHash('sha256').update(fileBytes).digest('hex'),
				boundaryPresent: true
			};
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(summary));
		});
		return;
	}
	res.writeHead(404);
	res.end('not found');
});

let browser;
let context;
let isolated;

try {
	await new Promise((resolve, reject) => {
		server.once('error', reject);
		server.listen(0, host, resolve);
	});
	const address = server.address();
	if (!address || typeof address === 'string') throw new Error('Could not read loopback server port');
	const origin = `http://${host}:${address.port}`;

	browser = await chromium.launch({
		headless: true,
		timeout: 10000,
		executablePath: process.env.CHROME_EXECUTABLE_PATH || undefined,
		args: ['--password-store=basic', '--use-mock-keychain']
	});
	context = await browser.newContext();
	const page = await context.newPage();
	await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
	const shared = context.request;
	const setResponse = await shared.get(`${origin}/set-cookie`, { timeout: 5000 });
	if (setResponse.status() !== 204) throw new Error(`Expected 204 from /set-cookie, received ${setResponse.status()}`);
	await setResponse.dispose();

	const browserResponse = await page.goto(`${origin}/whoami`, { waitUntil: 'domcontentloaded', timeout: 5000 });
	if (!browserResponse || browserResponse.status() !== 200) throw new Error('Browser page did not receive the synthetic response');
	const browserCookie = await page.locator('body').innerText();
	if (!browserCookie.includes(`${cookieName}=${cookieValue}`)) {
		throw new Error(`Browser context did not receive expected test cookie: ${browserCookie || '(empty)'}`);
	}

	isolated = await request.newContext({ timeout: 5000 });
	const isolatedResponse = await isolated.get(`${origin}/whoami`);
	if (isolatedResponse.status() !== 200) throw new Error(`Expected 200 from isolated /whoami, received ${isolatedResponse.status()}`);
	const isolatedCookie = await isolatedResponse.text();
	if (isolatedCookie !== '') {
		throw new Error(`Standalone APIRequestContext unexpectedly received a cookie: ${isolatedCookie}`);
	}
	await isolatedResponse.dispose();

	const uploadResponse = await shared.post(`${origin}/upload`, {
		timeout: 5000,
		multipart: {
			label: 'local-fixture',
			attachment: { name: 'sample.txt', mimeType: 'text/plain', buffer: expectedFile }
		}
	});
	if (uploadResponse.status() !== 200) throw new Error(`Expected 200 from /upload, received ${uploadResponse.status()}`);
	const upload = await uploadResponse.json();
	const expectedFileSha256 = createHash('sha256').update(expectedFile).digest('hex');
	if (upload.filename !== 'sample.txt' || upload.mimeType !== 'text/plain' || upload.fileBytes !== expectedFile.length || upload.fileSha256 !== expectedFileSha256 || upload.label !== 'local-fixture' || upload.fieldNames.join(',') !== 'label,attachment' || !upload.boundaryPresent) {
		throw new Error(`Multipart server assertion failed: ${JSON.stringify(upload)}`);
	}
	await uploadResponse.dispose();
	console.log(JSON.stringify({
		result: 'api_cookie_context_boundary_verified',
		nodeVersion: process.version,
		playwrightModuleLabel,
		browserVersion: browser.version(),
		origin: '127.0.0.1 loopback',
		sharedBrowserCookieObserved: true,
		standaloneRequestCookieIsolated: true,
		multipartUploadVerified: upload,
		storageTested: ['cookies'],
		storageNotTested: ['localStorage', 'sessionStorage', 'IndexedDB', 'CSRF', 'full authentication', 'large-file streaming performance']
	}, null, 2));
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exitCode = 1;
} finally {
	if (isolated) await isolated.dispose().catch(() => {});
	if (context) await context.close().catch(() => {});
	if (browser) await browser.close().catch(() => {});
	if (server.listening) await new Promise((resolve) => server.close(resolve));
}
