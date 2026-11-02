# Generiert App-Icon und Splash-Screen für ELIAN Ultimate Calculator v8.0
# Aufruf: python make_assets.py   (benötigt Pillow)
import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
RES = os.path.join(HERE, "resources")
os.makedirs(RES, exist_ok=True)

FONT_BOLD = r"C:\Windows\Fonts\seguisb.ttf"
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"

# --- Farbwelten ---
BG_TOP = (10, 18, 32)        # #0a1220
BG_BOT = (16, 26, 46)        # #101a2e
ACCENT_A = (0x6f, 0xb5, 0xff)  # Blau
ACCENT_B = (0xa9, 0x8c, 0xff)  # Violett
ACCENT_C = (0x59, 0xe6, 0xc2)  # Türkis
WHITE = (247, 251, 255)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def diagonal_gradient(size, top, bottom):
    """Weicher diagonaler Verlauf."""
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(0, size, 4):
            t = (x + y) / (2 * size)
            c = lerp(top, bottom, t)
            for dx in range(4):
                if x + dx < size:
                    px[x + dx, y] = c
    return img


def rounded_mask(size, radius_ratio=0.235):
    """Abgerundetes Quadrat (Superellipsen-Annahme: iOS squircle-ähnlich)."""
    img = Image.new("L", (size * 4, size * 4), 0)
    d = ImageDraw.Draw(img)
    r = int(size * 4 * radius_ratio)
    d.rounded_rectangle([0, 0, size * 4 - 1, size * 4 - 1], radius=r, fill=255)
    return img.resize((size, size), Image.LANCZOS)


def make_icon():
    S = 1024
    # Hintergrund: dunkler Verlauf
    base = diagonal_gradient(S, BG_TOP, BG_BOT).convert("RGBA")

    # Farbakzent-Globen (sanft)
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-S * 0.25, -S * 0.30, S * 0.55, S * 0.50], fill=ACCENT_A + (70,))
    gd.ellipse([S * 0.55, S * 0.45, S * 1.25, S * 1.15], fill=ACCENT_B + (60,))
    gd.ellipse([S * 0.30, S * 0.72, S * 0.80, S * 1.22], fill=ACCENT_C + (42,))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.09))
    base = Image.alpha_composite(base, glow)

    d = ImageDraw.Draw(base)

    # "E" im Akzent-Gadienten-Text
    font = ImageFont.truetype(FONT_BOLD, int(S * 0.52))
    cx, cy = S * 0.5, S * 0.52
    bbox = d.textbbox((0, 0), "E", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    # Gradient-Textmaske: E in Weiß zeichnen, dann mit Verlauf maskieren
    text_layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    td = ImageDraw.Draw(text_layer)
    td.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), "E", font=font, fill=WHITE)
    grad = diagonal_gradient(S, lerp(ACCENT_A, WHITE, 0.15), ACCENT_B).convert("RGBA")
    base.paste(grad, (0, 0), text_layer.split()[3])

    # Dezente Formel-Symbole als Wasserzeichen
    sym_font = ImageFont.truetype(FONT_REG, int(S * 0.115))
    for ch, x, y, a in [("∫", S * 0.135, S * 0.16, 110), ("∑", S * 0.80, S * 0.20, 90),
                        ("π", S * 0.17, S * 0.82, 100), ("√", S * 0.78, S * 0.80, 80)]:
        d.text((x, y), ch, font=sym_font, fill=WHITE[:3] + (a,))

    # iOS: keine Transparenz, abgerundetes Vollbild
    mask = rounded_mask(S)
    out = Image.new("RGBA", (S, S), BG_TOP + (255,))
    out.paste(base, (0, 0), mask)
    out.convert("RGB").save(os.path.join(RES, "icon.png"))
    print("icon.png geschrieben")


def make_splash():
    S = 2732
    base = diagonal_gradient(S, BG_TOP, BG_BOT).convert("RGBA")
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([S * 0.10, S * 0.05, S * 0.75, S * 0.70], fill=ACCENT_A + (46,))
    gd.ellipse([S * 0.35, S * 0.45, S * 0.95, S * 1.05], fill=ACCENT_B + (40,))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.05))
    base = Image.alpha_composite(base, glow)
    d = ImageDraw.Draw(base)

    # App-Symbol (wie Icon) zentriert, kleiner
    icon = Image.open(os.path.join(RES, "icon.png")).convert("RGBA")
    isz = int(S * 0.30)
    icon = icon.resize((isz, isz), Image.LANCZOS)
    base.alpha_composite(icon, (int((S - isz) / 2), int(S * 0.335)))

    # Titel
    tf = ImageFont.truetype(FONT_BOLD, int(S * 0.052))
    sub = ImageFont.truetype(FONT_REG, int(S * 0.026))
    title = "ELIAN Ultimate Calculator"
    tbb = d.textbbox((0, 0), title, font=tf)
    d.text(((S - (tbb[2] - tbb[0])) / 2 - tbb[0], S * 0.685), title, font=tf, fill=WHITE)
    sub_t = "Version 8.0 · vollständig offline"
    sbb = d.textbbox((0, 0), sub_t, font=sub)
    d.text(((S - (sbb[2] - sbb[0])) / 2 - sbb[0], S * 0.775), sub_t, font=sub,
           fill=(174, 189, 206))

    base.convert("RGB").save(os.path.join(RES, "splash.png"))
    print("splash.png geschrieben")


if __name__ == "__main__":
    make_icon()
    make_splash()
