# Cleanup review

Additional cleanup has not been authorised. Keep these files until the owner explicitly confirms removal:

| File | Evidence | Status |
| --- | --- | --- |
| src/components/ArticleCard.astro | No source imports; article pages use the dedicated insight layouts. | Retained, pending confirmation |
| src/components/PageHero.astro | No active source imports after the dedicated page replacement. | Retained, pending confirmation |
| src/components/RegulatoryMap.astro | No source imports; active workflows use the existing Home process and PermitPathway. | Retained, pending confirmation |
| public/favicon.svg | BaseLayout uses the proportional favicon.png. | Retained, pending confirmation |
| public/og-default.svg | BaseLayout uses og-default.png. | Retained, pending confirmation |

ContentPage.astro and vercel.json were already replaced during the earlier authorised implementation: dedicated service/case components replace the old generic template, and the application now targets Node/Hostinger. Their historical versions remain recoverable from Git. No additional archive, business document, design source, skill, or historical project file has been removed.

Review the five remaining candidates together before deleting. Do not infer that every unimported asset or historical document is permanently useless.
