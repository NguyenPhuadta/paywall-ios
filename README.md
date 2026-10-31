# Paywall iOS

A static paywall stock hosted on GitHub Pages. Its information architecture and interaction layout follow https://kientd-paywall.vercel.app/; website styling uses the Notion-inspired system in DESIGN.md, adapted to dark mode with SF Pro Rounded and a licensed Nunito fallback. No KienTD paywall content or assets are distributed.

## Structure

- Home: title, inspiration credit, app chooser, counts, one wide card per design batch.
- CastDuo / Đợt 1 / 26 October 2026: PW 01 PRO and PW 02 Plus, in the reference's portrait card grid (four columns when desktop width permits).
- Paywall detail: batch/PW navigation, Xem and Dev tabs.
- Xem: interactive purchase simulation, trial/device/billing controls, brief/history, responsive demos, plan states, language and hero resources.
- Dev: downloadable source ZIP, preview state controls, Animation, Lottie (none in these two approved designs), live Layer inspection, point measurements, Font, Chuỗi and Changelog.

Five preview locales are available: English, Simplified Chinese (zh-Hans), Filipino (fil), Spanish (es), Vietnamese (vi). Prices are placeholders. Native StoreKit configuration and actual Terms/Privacy URLs remain outstanding.

## Local preview

Serve this directory with a static HTTP server. Open index.html. `node scripts/build-static.mjs` packages a dist copy; GitHub Pages serves main at the repository root. Existing standalone and detail URLs remain valid.

The batch date is the approval date, 26 October 2026. Both paywalls belong to CastDuo Đợt 1. Do not fabricate new batches or unapproved designs.

## CTA update · 28 October 2026

Both published paywalls use the SmartHue CTA hierarchy from Figma node 539:32897: 16px horizontal inset, trial disclosure above the 56px button with an 8px gap, eligible-trial payment badge 12px below, and Privacy / Terms / Restore footer. Original CTA colours are preserved. Source ZIPs and specs include the same structure.

## Localization · 30 October 2026

All five published paywalls support `?lang=en|zh-Hans|fil|es|vi`, including purchase/restore/error/policy states. Review and Dev controls offer all five locales; the language demo and Strings tab use the same catalog. Standalone previews have a language selector. Export: assets/i18n/strings.json and strings.csv; each Dev ZIP includes its offline catalog and runtime. Prices remain placeholders; changing language does not change storefront/currency or trial eligibility. Translation review is still required before native release.

On smaller screens and at large text sizes the whole paywall can scroll vertically. English layouts are retained; translated text wraps rather than being clipped.

## Responsive iPhone matrix · 30 October 2026

All five detail pages show the same approved nine iPhone sizes in Demo responsive: 440×956, 420×912, 430×932, 402×874, 393×852, 390×844, 414×896, 375×812, 375×667. The matrix, prototype picker and Dev picker share `iphoneSizes`. Frame dimensions include status/system areas at 1× CSS px; preview scaling does not change the layout size. Text 200%, Terms and Privacy are separate accessibility/state demonstrations. No Android device presets, dp conversion or Android safe-area rules apply. Animation canvas dimensions such as 360×240 are asset dimensions, not phone presets.

## Billing states · 30 October 2026

All five paywalls share two inline busy presentations: loading uses plan-label/price/disclosure skeletons and a disabled gray spinner CTA; purchasing preserves the loaded offer and shows a disabled gray CTA with spinner and localized “Opening App Store…”. Neither state adds an overlay or a duplicate status panel. A loading card never shows an unconfirmed product price. Standard error/retry and restore behavior remain available. Dev ZIPs contain the same adapters.


### Prototype comments
Each library detail has a yellow comment tool below Reopen. Drag a region or click to pin. New comments sync in real time per paywall via the separate paywall-ios-comments Firebase project (Firestore database comments, Singapore). Anyone with the site link can read and add comments without a visible login; anonymous Firebase identity restricts editing and deletion to the original browser. Clearing browser data or switching browsers loses edit ownership. Previous localStorage comments remain on the original browser and are marked local; they are not uploaded automatically. JSON export includes visible comments. Use “Ẩn comment” / “Hiện comment” to hide or show pins and the comment list without changing shared data; the preference is stored on the current browser. Anyone can reply, mark a shared comment resolved, or reopen it; a reply can be deleted by its author. Local-only comments can be resolved locally but cannot receive shared replies. The UI records locale, iPhone size, eligibility and billing state. Keyboard: activate comment mode, Enter pins at center, Escape exits. The public anonymous write endpoint is not a team access control or anti-spam system; review abuse controls and usage before wider distribution.

## Hiệu ứng khi mở paywall

Head stylesheet giữ UI ở opacity 0 trước paint đầu tiên. Sau khi font và ảnh sẵn sàng (tối đa 1,2 giây), UI fade trong 520 ms với easing .4/0/.2/1 và stagger 32 ms, tối đa 128 ms. Xem, Dev, local và ZIP dùng chung runtime. Reduce Motion hiện nội dung ngay. Prototype cập nhật sản phẩm trong màn đang mở, không tải lại iframe hay reset hero. Tương tác trong màn không phát lại entrance.

Nguồn kỹ thuật: https://web.dev/articles/animations-guide (opacity và compositing), https://m2.material.io/design/motion/the-motion-system.html (fade cho thành phần xuất hiện trong màn).

Billing loading → ready: skeleton fade-out 140 ms, giá/CTA fade-in 320 ms. Bố cục loading giữ sẵn chỗ cho nội dung thật; không animate height. Reduce Motion cập nhật ngay.

## Performance · 30 October 2026

Preview đơn chỉ dựng một figure; demo ngoài vùng xem được unload và nạp lại khi cuộn tới. Canvas Moments dừng khi khuất và giảm số lượt vẽ ảnh. Xem [kết quả đo và phạm vi kiểm tra](docs/performance-2026-10-30.md). Xem và Dev dùng cùng runtime; ZIP đã đồng bộ.

## Team review stability

Tab Xem ưu tiên prototype chính. Mỗi lượt đổi bộ lọc hoặc Mở lại huỷ listener/timer của lượt cũ; chỉ lượt mới nhất được hoàn tất billing. Phát lại chạy đầy đủ chu kỳ billing. Mở thẳng tab Dev không nạp prototype Xem ở nền. Demo ngoài viewport chờ 800 ms trước khi unload để tránh tải lại liên tục khi cuộn sát ranh giới. Resize được gom theo animation frame.
