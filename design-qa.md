# Stock library / KienTD structure / 27 October 2026

final result: passed

## Source truth and intended differences

Captured live Home, FlyNote batch 22/10/2026 and PW38 Xem/Dev from https://kientd-paywall.vercel.app/ with browser DOM, computed styles and screenshots. Source evidence: ../castduo/research/stock-clone/. User explicitly requested source structure/interaction layout and only Ghost styling. Website font Archivo, off-white paper, rectangular controls and blue accents are intentional. Paywalls themselves retain their approved design.

Content is exactly one app, one batch: CastDuo Đợt 1 (approval date 26/10/2026), with PRO and Plus. Existing standalone and detail routes retained. No unapproved designs, invented markets, translations, Lottie files or prices.

## Evidence and normalization

Implementation evidence: ../castduo/validation/stock-clone/ (home, batch, detail, dev; desktop and mobile). Comparisons: comparison-home-desktop.png, comparison-detail-desktop.png, comparison-dev-desktop.png, comparison-batch-mobile.png. Source desktop 1280×720 CSS, captured image 1265×712 excluding scrollbar chrome; comparison crop 1265×712. Implementation desktop CSS 1265×712, browser screenshot transport appended canvas beyond that region; cropped to the CSS viewport before comparison. Mobile implementation CSS 390×844; source mobile captured as actual remote site inside a 390×844 iframe because the source tab's viewport override did not apply. Transport screenshots normalized by cropping their content rectangle, never stretching paywall artwork.

Source and implementation deliberately have different content counts (12 vs 2 PW; 7 locales vs 1 approved English locale). Comparison evaluates region hierarchy, navigation, grid track sizing, card proportions, prototype/sidebar placement and Dev layout, not invented content parity. Focused text/tokens/layer measurements inspected in browser at native CSS dimensions.

## Iterations and fixes

- P1 old Home flattened individual paywalls and added search/save/sort/navigation. Replaced with source title → app chooser → count → batch card. Removed extra functionality and marketing/footer chrome.
- P1 batch/detail flow mismatch. Batch now uses source auto-fill portrait grid (228px minimum, 18px gap, four desktop tracks); each card links to Xem/Dev. Xem follows prototype → brief/history → responsive → offers/states → languages → hero resources. Dev follows preview/state controls + pack/Animation/Lottie/Layer/Đo/Font/Chuỗi/Changelog.
- P2 thumbnail transport padding. Recaptured approved source phones and cropped to actual 390×844; contain fit shows complete paywalls in the Home batch collage.
- P2 mobile prototype overflow (406px on 390px). Constrained prototype parent to available width. Rechecked 390px viewport: detail scrollWidth 370, Home 390, batch 370; no horizontal clipping.
- P2 Dev layers were initially empty because the hidden tab had zero-size boxes at iframe load. Recollect visible layers on opening Layer. Rechecked 16 visible layers and selected actual footer element geometry (73×44pt with CSS padding/font/radius).
- P2 source/implementation Xem capture scroll mismatch. Recaptured a fresh detail tab at scrollY 0 before comparison.

## Required fidelity surfaces

- Typography: approved Ghost Archivo/Archivo Narrow website type; same source hierarchy and compact labels. Paywall system SF typography unchanged. PRO metadata corrected to its actual 36px title and 15% offer fill.
- Layout rhythm: source max widths 980/1240, Home 1.1fr/1fr batch card, 228px auto-fill grid, Xem left phone/right controls, Dev left inspector/right tables. Mobile cards and panels stack with no page overflow.
- Tokens: off-white, quiet grain, black text, blue selected controls are intentional Ghost style changes. Source hierarchy retained.
- Assets: own approved raster/SVG/CSS assets; actual phone screenshots for collage, no KienTD app artwork copied. No new generated media or illustrations. No source assets hotlinked into the shipped app.
- Copy: CastDuo-specific approved names, correct batch 1, truthful English-only/placeholder pricing and CSS-only animation. Removed unused saved notes/search/sort UI.

## Interaction verification

Browser verified Home app filter/hash, batch navigation, both PW links, Xem/Dev tabs, keyboard tab handling in code, trial and no-trial state, compact device switch, billing delay/ready control, CTA → simulated processing → verified success, reopen, Terms demo, Dev package table/download URL, 16 live layers and geometry measurement. ZIP integrity passed. JS syntax checks and static packaging passed. Dev source assets render.

Console inspection found recurring MutationObserver.observe errors from the browser session; no MutationObserver exists in the repository. These appear instrumentation-related rather than shipped application code. No library.js/dev-content.js exception observed during the tested flows. This operational issue does not hide controls or prevent the tested functions.

## Follow-up / truthful limitations

No translations or Lottie are present in the approved paywalls; matching reference sections state that explicitly. Real StoreKit products/prices and Terms/Privacy URLs are outside this visual library update. No additional product UI was added.


## Notion visual update — 27 October 2026
Installed DESIGN.md via npx getdesign@latest add notion. Applied the documented warm paper #f6f5f4, Inter typography, Notion blue #0075de, white surfaces and gentle rounded corners to the stock website. The information architecture and approved paywall previews remain intact. Browser-checked Home, CastDuo batch and Dev tab. Fixed mobile Dev grid horizontal overflow (390 CSS viewport: scrollWidth 406 before, 370 after). Inter is bundled with its OFL licence. Static packaging and JavaScript syntax checks passed.
