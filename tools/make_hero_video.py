from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent / "python-packages"))

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ROOT / "public/assets/projects/virtual-event.jpg",
    ROOT / "public/assets/projects/3d-design.jpg",
    ROOT / "public/assets/projects/product-render.jpg",
    ROOT / "public/assets/projects/personal-study.jpg",
    ROOT / "public/assets/projects/ue-render.jpg",
]
OUTPUT = ROOT / "public/assets/video/hero-reel.mp4"
WIDTH, HEIGHT = 1920, 1080
FPS, DURATION = 24, 12


def cover_image(img, zoom, offset_x, offset_y):
    scale = max(WIDTH / img.width, HEIGHT / img.height) * zoom
    size = (int(img.width * scale), int(img.height * scale))
    resized = img.resize(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (WIDTH, HEIGHT), "#05070a")
    x = int((WIDTH - size[0]) / 2 + offset_x)
    y = int((HEIGHT - size[1]) / 2 + offset_y)
    canvas.paste(resized, (x, y))
    return canvas


def blend(a, b, amount):
    return Image.blend(a, b, max(0, min(1, amount)))


def overlay_frame(base, frame_index):
    draw = ImageDraw.Draw(base, "RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay, "RGBA")
    od.rectangle((0, 0, WIDTH, HEIGHT), fill=(5, 7, 10, 128))
    od.rectangle((0, 0, 980, HEIGHT), fill=(5, 7, 10, 112))
    od.rectangle((1450, 0, WIDTH, HEIGHT), fill=(5, 7, 10, 122))
    base.alpha_composite(overlay)

    shift = int((frame_index * 1.7) % 96)
    for x in range(-96, WIDTH + 96, 96):
        draw.line((x + shift, 0, x + shift, HEIGHT), fill=(255, 255, 255, 18), width=1)
    for y in range(0, HEIGHT, 96):
        draw.line((0, y, WIDTH, y), fill=(255, 255, 255, 14), width=1)

    pulse = int(np.sin(frame_index / 14) * 85)
    draw.rectangle((144, 792, 500 + pulse, 794), fill=(120, 212, 255, 150))
    draw.rectangle((144, 812, 352 - pulse // 3, 814), fill=(168, 242, 198, 110))
    return base.convert("RGB")


def main():
    images = []
    for source in SOURCES:
        img = Image.open(source).convert("RGB")
        img = ImageEnhance.Color(img).enhance(0.92)
        img = ImageEnhance.Contrast(img).enhance(1.08)
        images.append(img)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    writer = imageio.get_writer(
        OUTPUT,
        fps=FPS,
        codec="libx264",
        quality=8,
        macro_block_size=16,
        output_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    )
    total = FPS * DURATION
    for frame in range(total):
        t = frame / total
        exact = t * len(images)
        current = int(exact) % len(images)
        next_index = (current + 1) % len(images)
        local = exact - int(exact)
        fade = max(0, min(1, (local - 0.72) / 0.28))
        offset_x = np.sin(t * np.pi * 2) * 34
        offset_y = np.cos(t * np.pi * 2) * 18
        a = cover_image(images[current], 1.03 + local * 0.08, offset_x, offset_y)
        b = cover_image(images[next_index], 1.08 - fade * 0.05, -28 * fade, 12 * fade)
        frame_img = blend(a, b, fade).convert("RGBA")
        writer.append_data(np.asarray(overlay_frame(frame_img, frame)))
    writer.close()
    print(OUTPUT)


if __name__ == "__main__":
    main()
