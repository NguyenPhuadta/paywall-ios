# Design QA — 2026-10-26

## Scope and selected references

User explicitly clarified: KienTD defines the **structure**, Ghost defines **style only**. The approved CastDuo paywall is preserved, not redesigned.

- Structure: https://kientd-paywall.vercel.app/ — app filters, dated batch cards, batch view, individual Preview/Dev pages.
- Visual style: https://ghost.ai/ — Archivo / Archivo Narrow, off-white and dark surfaces, restrained typography, rectangular blue buttons, quiet surface grain.
- Source captures and implementation screenshots were opened and inspected in the in-app browser. Comparison evidence is kept in the parent design workspace under castduo/research/stock-redesign and castduo/validation/stock-redesign.

## Corrections

1. Removed the landing-page hero, oversized spaced PAYWALL headline, announcement and marketing sections after the user's clarification. Home now starts with a concise library introduction, app filters and a chronological batch list.
2. Reduced initially excessive grain to a subtle surface texture.
3. Gave iframe instances distinct query identifiers so both embedded previews render correctly in browser review.

## Required fidelity surfaces

- Typography: locally bundled Archivo/Archivo Narrow; interface uses Ghost-inspired weights/spacing. Native paywall typography is unchanged.
- Layout: KienTD hierarchy retained: Home → app/date batch → paywall detail → Preview/Dev. Actual preview is visible on Home, per the user's original requirement.
- Color: Ghost-inspired neutral paper/dark surfaces and rectangular blue actions; no import of Ghost's product-page structure.
- Images: the approved badge remains sharp, transparent and animated. No Ghost product imagery or invented replacement artwork.
- Copy: truthful count of one app/batch/paywall. Storefront price, locale and policy-data limitations are explicit in review and developer documentation.

## Validation performed

- Home search empty state and reset; saved-item filtering and persistence.
- Home → batch → detail → Dev navigation.
- Preview/Dev tabs and motion/layout developer sub-tabs.
- Device, trial eligibility and billing controls update the actual simulation.
- Compact 375×667: no horizontal or vertical overflow; ineligible CTA is Subscribe.
- Large text: no horizontal overflow; vertical scrolling works.
- Unknown eligibility: Checking offer CTA is disabled.
- Verified success state shows access confirmation, not an unverified success.
- Local review note survives reload; QA test note was cleared afterward.
- Mobile Home and Review rendered in real 390×844 iframe viewports and visually inspected.
- Developer ZIP integrity, referenced entrypoint assets, JSON spec, JS syntax and static packaging checked.

## Intentional limits

Only English and the one approved design are provided. Shared server comments and real StoreKit transactions are outside this static library; local notes are labelled honestly. Ghost is a style reference, not a pixel-for-pixel layout target.

final result: passed


## CastDuo Plus / PW 002 — 2026-10-26
User approved publishing option 01. Added unchanged visual source with three room photos, 2s scene / 6s loop, plain football kit/ball, blue-purple Plus tag, Weekly 18px, fill 10%, padding 16px/hug, title gap 24px. Added inline Home card, dated batch entry, per-item review controls and Dev ZIP/spec. Browser checked Home has both PRO and Plus, Plus detail and Dev resources render. Existing PRO preserved.
