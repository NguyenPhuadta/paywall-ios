from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
output=root/'downloads/castduo-pro-dev.zip'
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted((root/'paywalls/castduo').rglob('*')):
  if p.is_file():z.write(p,'castduo-pro/'+str(p.relative_to(root/'paywalls/castduo')))
 z.write(root/'downloads/castduo-pro-spec.json','castduo-pro/spec.json')
 z.writestr('castduo-pro/README.txt','CastDuo PRO / iOS interactive concept\nServe this folder with a local HTTP server and open index.html.\nNative frame 390x844; status bar included.\nMotion uses CSS, not Lottie. Reduced Motion renders a static badge.\nPurchase and restore are simulations. Real product IDs, storefront pricing, StoreKit eligibility and policy URLs are still required.\n')
print(output.name,output.stat().st_size,'bytes')
