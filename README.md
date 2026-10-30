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
