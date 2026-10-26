# Paywall iOS

A personal library of interactive iOS paywall designs.

**Live:** https://nguyenphuadta.github.io/paywall-ios/

## Structure

- Home: filter apps and browse dated design batches, with live paywall previews visible in each batch.
- App / batch: `apps/castduo/2026-10-26/` groups the selected paywalls.
- Paywall review: `library/castduo-pro/` has Preview and Dev tabs.
- Standalone simulation: `paywalls/castduo/` preserves the approved mobile design.
- Developer package: `downloads/castduo-pro-dev.zip` and a JSON handoff spec.

Information architecture follows [KienTD Paywall](https://kientd-paywall.vercel.app/). Visual styling takes typography, quiet paper/dark surfaces, spacing and rectangular blue actions from [Ghost](https://ghost.ai/). The site's structure is a library, not Ghost's marketing landing page.

## Features

Search and app filtering, browser-local saved items, trial eligibility, purchase/restore simulation states, 390×844 and 375×667 previews, 200% text stress test, motion on/off, browser-local review notes and JSON export. Dev tabs document assets, motion, layout, copy and revision history.

Only the selected CastDuo PRO design is currently in the collection. Locale is the approved English version; no invented storefront prices or translated variants are included. Notes and saved items stay in the visitor's browser and do not sync between users.

## Run locally

No dependency installation or build is needed for GitHub Pages:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

For the optional static build output:

```sh
node scripts/build-static.mjs
```

Recreate the developer ZIP after editing the paywall:

```sh
python3 scripts/package-dev.py
```

GitHub Pages publishes the repository root from `main`. The optional Sites deployment is separate; GitHub Pages is the selected public host.

## Design and assets

The PRO badge was generated for this project. Close and status bar SVG assets came from the owner's workspace. Archivo and Archivo Narrow are bundled locally with their OFL licenses. Grain textures are the small surface SVG filters observed in Ghost's public stylesheet; Ghost's product imagery and logo are not used.

The paywall remains a design simulation: real StoreKit products, subscription-group eligibility, storefront prices and policy URLs are needed before native integration. CSS tilt is not a Lottie animation. Reduced Motion keeps the badge static.


PW 002: CastDuo Plus — `/paywalls/castduo-plus/`, review `/library/castduo-plus/`. Approved cinematic option 01; three room scenes loop every 6 seconds. Dev download: `downloads/castduo-plus-dev.zip`.
