import { aiToolsTranslations } from "./ai-tools-2026-10-23";
import { aiActionsTranslations } from "./ai-actions-2026-10-23";
import { aiResearchTranslations } from "./ai-research-2026-10-23";
import { aiChoicesTranslations } from "./ai-choices-2026-10-22";
import { aiDataTranslations } from "./ai-data-2026-10-22";
import { aiSecurityTranslations } from "./ai-security-2026-10-22";
import { aiSelectionTranslations } from "./ai-selection-guides";
import { aiSessionTranslations } from "./ai-session-guides";
import { aiPlaywrightTranslations } from "./ai-playwright-guides";
import { editorialGuideTranslations } from "./editorial-guides";
import { refreshedGuideTranslationsA } from "./refreshed-guides-a";
import { refreshedGuideTranslationsB } from "./refreshed-guides-b";
import { environmentGuideTranslationsA } from "./environment-guides-a";
import { environmentGuideTranslationsB } from "./environment-guides-b";
import { dailyGuideTranslations } from "./daily-guides-2026-10-20";

/** Complete editions only; untranslated legacy URLs retain labelled English. */
export const guideEditions = {
	...aiToolsTranslations,
	...aiActionsTranslations,
	...aiResearchTranslations,
	...aiChoicesTranslations,
	...aiDataTranslations,
	...aiSecurityTranslations,
	...aiSelectionTranslations,
	...aiSessionTranslations,
	...aiPlaywrightTranslations,
	...editorialGuideTranslations,
	...refreshedGuideTranslationsA,
	...refreshedGuideTranslationsB,
	...environmentGuideTranslationsA,
	...environmentGuideTranslationsB,
	...dailyGuideTranslations
};
