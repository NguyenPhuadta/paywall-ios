# Paywall iOS

A handpicked library of interactive iOS paywall concepts. The homepage shows live previews directly, without opening a detail page.

## First paywall

CastDuo PRO: dark violet-blue gradient, satin metallic badge, continuous 6-second tilt with moving shade and shimmer. Current design: semibold white headline (44px, 120% leading, -1% tracking), weekly offer with 48px continuous corners and white 20% fill. User-supplied close icon positioned 16px below the status bar and 16px from the left.

## Preview

Static HTML/CSS/JavaScript, no build step. Run from this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/. The standalone preview is at `paywalls/castduo/`.

The native-size preview is 390×844 and includes the status bar. Homepage scaling changes presentation only. Reduced Motion keeps the badge static. Purchase/restore are simulations; product prices and policy links still need real app data.

## Assets

The PRO badge was generated for this project. Close/status SVGs and the paywall design come from the owner's supplied workspace. These are design concepts, not a StoreKit implementation.
