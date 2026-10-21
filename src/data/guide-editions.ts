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
