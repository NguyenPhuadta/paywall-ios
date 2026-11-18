from pathlib import Path
import re
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
app = Path('apps/smarthue/2026-11-16')
destination = root / 'downloads/smarthue-christmas-dev.zip'
website = 'https://nguyenphuadta.github.io/paywall-ios/'
shared = [
    Path('assets/library.css'),
    *(p.relative_to(root) for p in (root / 'assets/fonts').glob('*') if p.is_file()),
]

with ZipFile(destination, 'w', ZIP_DEFLATED) as archive:
    index = (root / app / 'index.html').read_text()
    index = re.sub(r'<script src="[^"]*review-comments\.js[^"]*"[^>]*></script>', '', index)
    archive.writestr(str(app / 'index.html'), index.replace('../../../index.html#smarthue', website + 'index.html#smarthue'))
    dev = (root / app / 'dev.html').read_text()
    dev = dev.replace('../../../index.html#smarthue', website + 'index.html#smarthue')
    dev = dev.replace('../../../downloads/', website + 'downloads/')
    archive.writestr(str(app / 'dev.html'), dev)
    for path in sorted((root / app).rglob('*')):
        if path.is_file() and path not in [root / app / 'index.html', root / app / 'dev.html']:
            archive.write(path, path.relative_to(root))
    for path in sorted(shared):
        archive.write(root / path, path)
    archive.writestr('README.txt', '''SmartHue Christmas paywall / Web prototype

Start a local HTTP server in this extracted directory:
  python3 -m http.server 8080
Open http://localhost:8080/apps/smarthue/2026-11-16/
Select Dev for the measured preview and copy export.

Includes simulated App Store and restore states, 13 preview layouts,
English, German, Danish, Christmas artwork, and Inter with its license.
Product IDs, production pricing and policy URLs must come from the app.
''')
print(destination.name, destination.stat().st_size, 'bytes')
