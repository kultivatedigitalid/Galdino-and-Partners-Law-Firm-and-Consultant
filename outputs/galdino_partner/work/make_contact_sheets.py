from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFont

source = Path(sys.argv[1])
output = Path(sys.argv[2])
output.mkdir(parents=True, exist_ok=True)
files = sorted(source.glob('page-*.png'), key=lambda p: int(p.stem.split('-')[-1]))
font = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)

for group_index in range(0, len(files), 6):
    group = files[group_index:group_index + 6]
    thumbs = []
    for file in group:
        image = Image.open(file).convert('RGB')
        width = 520
        height = round(image.height * width / image.width)
        image = image.resize((width, height), Image.Resampling.LANCZOS)
        panel = Image.new('RGB', (width + 24, height + 64), '#D9E1DE')
        panel.paste(image, (12, 48))
        draw = ImageDraw.Draw(panel)
        draw.text((14, 10), f'PAGE {int(file.stem.split("-")[-1])}', font=font, fill='#173F3B')
        thumbs.append(panel)
    cell_w = max(img.width for img in thumbs)
    cell_h = max(img.height for img in thumbs)
    sheet = Image.new('RGB', (cell_w * 3 + 64, cell_h * 2 + 64), '#F2F0E9')
    for i, image in enumerate(thumbs):
        x = 16 + (i % 3) * cell_w
        y = 16 + (i // 3) * cell_h
        sheet.paste(image, (x, y))
    sheet.save(output / f'sheet-{group_index // 6 + 1}.jpg', quality=90, optimize=True)
