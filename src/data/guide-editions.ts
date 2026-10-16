import { editorialGuideTranslations } from "./editorial-guides";
import { refreshedGuideTranslationsA } from "./refreshed-guides-a";
import { refreshedGuideTranslationsB } from "./refreshed-guides-b";

/** Complete editions only; untranslated legacy URLs retain labelled English. */
export const guideEditions = {
	...editorialGuideTranslations,
	...refreshedGuideTranslationsA,
	...refreshedGuideTranslationsB
};
