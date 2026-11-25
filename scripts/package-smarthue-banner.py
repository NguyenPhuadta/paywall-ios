from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
app = Path('apps/smarthue/2026-11-25')
website = 'https://nguyenphuadta.github.io/paywall-ios/'
with ZipFile(root / 'downloads/smarthue-christmas-banner-dev.zip', 'w', ZIP_DEFLATED) as archive:
    for path in sorted((root / app).rglob('*')):
        if not path.is_file():
            continue
        relative = path.relative_to(root)
        if path.name == 'index.html':
            html = path.read_text().replace('../../../index.html#smarthue', website + 'index.html#smarthue')
            html = html.replace('../2026-11-16/?', website + 'apps/smarthue/2026-11-16/?')
            html = html.replace('../../../downloads/', website + 'downloads/')
            archive.writestr(str(relative), html)
        else:
            archive.write(path, relative)
    for name in ['Inter-Variable.ttf', 'OFL-Inter.txt']:
        archive.write(root / 'assets/fonts' / name, 'assets/fonts/' + name)
    archive.writestr('START-HERE.txt', '''SmartHue Christmas banner / 361 x 96 px
Run python3 -m http.server 8080 from this extracted root.
Open /apps/smarthue/2026-11-25/
The whole banner opens the existing online Christmas paywall prototype.
In the native app, wire this to the existing paywall presentation callback;
do not start a purchase directly from the banner.
A is proposed. Figma frame links and exact-size PNG exports are included.
No new pricing or trial promises. Inter font and OFL license are included.
Original and optimized generated light/gift artwork are included locally.
''')
print('Packaged smarthue-christmas-banner-dev.zip')
