# Paywall performance review · 30 October 2026

Measured locally in headless Chrome at 1280×900, with the Moments detail page open for approximately 5.5 seconds. These are browser measurements, not native iOS benchmarks.

| Measurement | Before | After |
| --- | ---: | ---: |
| Requests during entry | 707 | 43 |
| Canvas elements across loaded frames | 357 | 1 |
| Prototype frame intervals >33 ms | 25 / 300 | 0 / 333 |
| Prototype cumulative layout shift | 0.117 | 0 |
| Main page LayoutCount | 347 | 62 |
| Main page RecalcStyleCount | 1760 | 160 |
| Main page TaskDuration | 6.20 s | 0.65 s |

The detail page still has its complete set of demo iframe placeholders. Only nearby, visible demo frames receive a URL. Offscreen demos unload and reload when revisited; the interactive prototype is retained. Switching to Dev loads its preview when visible.

Each single/embedded paywall instantiates only its first figure. `?view=board` explicitly keeps the complete state board. Hidden board figures are no longer instantiated in every embedded preview.

Moments draws only visible photo cards, uses one image draw for flat photos and 32 strips during bending, reads dimensions through ResizeObserver, and pauses its animation when the host is offscreen or the document is hidden.

Billing reserves the final layout: benefits remain visible, the unknown billing row remains masked, card geometry matches the final offer, and eligible-trial badge space is reserved. Loading-to-ready animates opacity only. There are no height transitions or per-frame geometry reads. Real pricing remains hidden until products are ready. Reduce Motion switches immediately.

Checks: all five prototypes load a usable CTA; Moments keeps its three rows; all five Dev previews load; nearby responsive previews mount on scroll; Moments renders at 375×667, 390×844 and 440×956; Reduce Motion leaves content visible. No page JavaScript errors were reported during the sweep. The same runtime and assets are included in Dev ZIPs.
