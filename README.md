# ELIAN Ultimate Calculator v8.0

Ein wissenschaftlicher Taschenrechner und Funktionsplotter als **einzelne HTML-Datei** — ohne Build, ohne Abhängigkeiten, ohne Server. Einfach öffnen und rechnen. Alle Daten bleiben lokal im Browser (localStorage).

**Neu: iOS- und iPadOS-App.** Die gleiche Datei läuft als native App (Capacitor) auf iPhone und iPad — inklusive 3D-Plotter, Apple-Pencil-Skizzen und nativem Teilen-Dialog. Bauanleitung: [`ios/`](ios/).

---

## Was ist neu in v8.0

Version 8.0 überarbeitet **jedes Modul und das komplette Design** und bringt die App auf iPhone und iPad.

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **3D-Funktionsplotter** | `z = f(x, y)` als drehbare, nach Höhe gefärbte Fläche — Ziehen dreht, Rad/Pinch zoomt, Auflösung bis 80×80, Parameter-Support |
| 2 | **RPN-Modus** | Umgekehrte Polnische Notation (HP-Stil): Stapelanzeige T Z Y X, ENTER, SWAP, ROLL, DROP, LASTx — umschaltbar im Rechner |
| 3 | **Exakte symbolische Ableitungen** | Kettenregel auf syntaktischem Baum: Tangenten, Normalen und Newton-Iteration rechnen analytisch exakt statt numerisch genähert |
| 4 | **Taylor-Reihen** | Beliebiger Grad (1–30), beliebiger Entwicklungspunkt, Taylor-Polynom direkt im Plotter |
| 5 | **Hypothesentests** | Einstichproben-t-Test, Zweistichproben-t-Test (Welch), z-Test, χ²-Anpassungstest — mit p-Wert, kritischem Wert, Konfidenzintervall |
| 6 | **Numerische Integration mit Methodenwahl** | Simpson oder Trapezregel, mit Kennzahlen-Karte |
| 7 | **Apple-Pencil-Skizze (iPad)** | Direkt auf dem Graphen zeichnen; Skizze wird in PNG/SVG-Export und Teilen eingebunden |
| 8 | **Natives Teilen** | Graphen als PNG über die iOS/iPadOS-Teilen-Funktion (Capacitor-Share-Plugin, Web-Share-Fallback) |
| 9 | **Helles Design** | automatisch nach Systemeinstellung (Light/Dark) oder manuell umschaltbar |
| 10 | **Dynamische Schriftgröße** | 80 %–150 % per Schieber in den Einstellungen |
| 11 | **iPadOS-Optimierung** | Split-View-taugliches Layout, sichere Bereiche (Notch/Dynamic Island), 44-px-Touch-Ziele, Hardware-Keyboard-Shortcuts (⌘1–⌘9 Module, ⌘B Seitenleiste, ⌘K Palette) |
| 12 | **iOS/iPadOS-App** | Capacitor-Projekt mit eigenen App-Icons und Splash-Screens, GitHub-Actions-Build (unsigned + optional signiert) |

### Design-Überholung

- Durchgängige Design-Tokens, einheitliche Radien/Abstände, Fokus-States
- Light-Mode vollständig umgesetzt (alle Karten, Tabellen, Code, Plotter)
- Sichere Bereiche, `100dvh`, Overscroll-Kontrolle
- Größere Touch-Ziele (≥ 44 px), reduzierter Text-Rauschen
- `prefers-reduced-motion` respektiert, Druck-Styles erhalten

---

## Was ist neu in v7.0 (übernommen)

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **Polynom-Werkzeug** | Koeffizienten eingeben, auswerten, ableiten, integrieren, Nullstellen bestimmen, faktorisieren |
| 2 | **Komplexe Zahlen** | Grundrechenarten auf ℂ, Betrag, Argument, Konjugation, Kehrwert, Polarform, √z, e^z, ln(z) |
| 3 | **Grenzwerte** | Numerische Bestimmung ein- und beidseitiger Grenzwerte inkl. Pol- und Sprungstellen |
| 4 | **Tangente & Normale** | An beliebiger Stelle berechnen und direkt plotten |
| 5 | **Newton-Iteration** | Nullstellen numerisch bestimmen, mit Iterationstabelle |
| 6 | **Folgen & Reihen** | Muster erkennen, Summe, Monotonie, Extremwerte |
| 7 | **Geometrie** | Kreis, Rechteck, Dreieck (inkl. Heron), Kugel, Zylinder, Kegel |
| 8 | **Datum & Zeit** | Differenz mit Arbeitstagen, Datumsrechnung, Wochentag, Kalenderwoche, Schaltjahr, Stoppuhr |
| 9 | **Erweiterte Umrechnung** | Neun Kategorien: Temperatur, Winkel, Datenrate, Frequenz, Leistung, Drehmoment, Brennstoff, Kochmaße, Schuhgrößen |
| 10 | **Formelbibliothek** | 28 Formeln aus Mathematik, Physik, Finanzen — suchbar, übernehmbar |
| 11 | **Konstanten-Tabelle** | 25 Konstanten — durchsuchbar, per Klick kopierbar |
| 12 | **Übungsmodus** | Rechenaufgaben in drei Stufen mit Punktezähler |
| 13 | **Notizen** | Speichern, mit Formelauswertung beim Export |
| 14 | **Bruchrechnung** | Exakte Brucharithmetik mit automatischem Kürzen |
| 15 | **Matrix-Raster** | 1×1 bis 8×8 setzen, zufällig füllen |
| 16 | **Verteilungsdiagramm** | Häufigkeitsverteilung als Balkendiagramm |
| 17 | **Regression & Korrelation** | Linear und quadratisch, r, r², direkter Plot |
| 18 | **Befehlspalette** | <kbd>Strg</kbd>+<kbd>K</kbd> oder <kbd>/</kbd> — alle Module und Aktionen per Tastatur |
| 19 | **Verlaufssuche** | Suchen, merken, CSV-Export |
| 20 | **Migrationspfad** | Daten aus v6.2, v6.3, v6.4 und v7.0 werden automatisch übernommen |

---

## Der Kern: mathematisch korrekt

Die Parser von v6.3 und früher **rechneten falsch**. Die implizite Multiplikation erkannte `+` und `-` als Faktoranfang und verschlang damit die Operatoren:

| Eingabe | v6.3 (alt) | v7.0+ (korrekt) |
|---|---|---|
| `2+3*4` | 24 ❌ | 14 ✅ |
| `2-3` | −6 ❌ | −1 ✅ |
| `5-3-1` | 15 ❌ | 1 ✅ |
| `sin(30)+cos(60)` | 0,25 ❌ | 1 ✅ |

v8.0 ergänzt darauf einen **symbolischen Rechenkern**: parse → AST → strukturelle Differentiation mit Kettenregel → exakte Auswertung. Dabei bleibt der Ableitungskalkül konsistent mit dem Winkelmodus der App (DEG/GON/RAD) — symbolisches und numerisches Ergebnis stimmen überein (im Browser verifiziert).

## Alle Module (25)

**Rechnen:** Rechner (algebraisch + RPN) · Wissenschaft · Algebra & LGS · Polynome · Komplexe Zahlen · Analysis (Grenzwerte, Tangente, Newton, Taylor) · Folgen & Reihen · Geometrie

**Darstellen:** Funktionsplotter 2D (10 Objekttypen) · **3D-Funktionsplotter** · Graphen-Skizze (Apple Pencil) · PNG/SVG-Export · Teilen

**Daten:** Statistik (Kennwerte, Quartile, Verteilungsdiagramm) · **Hypothesentests** · Matrizen (inkl. Raster 8×8) · Regression & Korrelation

**Umwandeln:** Einheiten (10 Kategorien) · Erweiterte Umrechnung (9 Kategorien) · Programmierer (Basis 2/8/10/16, Bit-Toggle)

**Finanzen:** Tilgungsplan mit Zins- und Gesamtbelastung

**Werkzeuge:** Datum & Zeit · Formelbibliothek · Konstanten · Übungsmodus · Notizen · Bruchrechner

**Verwalten:** Verlauf (Suche, Merken, CSV) · Benutzerkonten (Gast/Normal/Admin) · Admin-Zentrale · Einstellungen (Design, Hell/Dunkel, Schriftgröße, Backup)

## Bedienung

| Kürzel | Aktion |
|---|---|
| <kbd>⌘/Strg</kbd>+<kbd>K</kbd> oder <kbd>/</kbd> | Befehlspalette |
| <kbd>⌘/Strg</kbd>+<kbd>1</kbd>…<kbd>9</kbd> | Direkt zum Modul (iPad-Hardware-Keyboard) |
| <kbd>⌘/Strg</kbd>+<kbd>B</kbd> | Seitenleiste ein/aus |
| <kbd>Enter</kbd> | Berechnen (algebraisch) bzw. ENTER (RPN) |
| <kbd>Esc</kbd> | Eingabe leeren / Dialog schließen |
| <kbd>Backspace</kbd> | Letztes Zeichen löschen |

## Erster Start

1. Datei `ELIAN_Ultimate_Calculator_v8.0.html` im Browser öffnen (oder die iOS-App installieren)
2. Mit **admin / 123456** anmelden
3. **Sofort die Admin-PIN ändern** (Benutzer → Admin bearbeiten)

## iOS-/iPadOS-App

Das native Projekt liegt in [`ios/`](ios/):

```
ios/
├── capacitor.config.json   appId app.elian.ultimate, WebDir www
├── package.json            Capacitor 8 + Share/SplashScreen/StatusBar
├── www/index.html          die Single-File-App (wird aus dem Repo-Root kopiert)
├── resources/              icon.png (1024²), splash.png (2732²)
├── make_assets.py          Icon-/Splash-Generator (Pillow)
└── ios/App/                Xcode-Projekt (SwiftPM, iPhone + iPad)
```

**Bauen (Windows/Mac/Linux über CI):** Der Workflow `.github/workflows/build-ios.yml` läuft auf `macos-15`, kopiert die HTML-Datei ins Projekt, führt `npx cap sync ios` aus und erzeugt ein Xcode-Archiv als Artefakt. **Ohne Signatur-Geheimnisse** entsteht ein unsigned-Archiv (zum Testen/Öffnen in Xcode); mit den optionalen Geheimnissen (`APPLE_P12_BASE64`, `APPLE_P12_PASSWORD`, `APPLE_API_KEY_*`, `APPLE_TEAM_ID`, `PROVISIONING_PROFILE_NAME`) zusätzlich eine signierte IPA.

**Lokal auf dem Mac:**

```bash
cd ios
python make_assets.py        # Icons/Splash erzeugen (optional, bereits im Repo)
npm ci
cp ../ELIAN_Ultimate_Calculator_v8.0.html www/index.html
npx cap sync ios
open ios/App/App.xcworkspace # in Xcode öffnen und auf Gerät/Simulator laufen lassen
```

## Funktionen im Parser

```
Trigonometrie   sin cos tan cot sec csc asin acos atan atan2
Hyperbolisch    sinh cosh tanh coth asinh acosh atanh
Logarithmen     ln log(x,b) log2 log10 exp
Wurzeln/Potenzen sqrt cbrt ^ **
Rundung         abs floor ceil round sign trunc
Kombinatorik    factorial nCr nPr
Zahlentheorie   gcd lcm
Statistik       min max sum mean normaldist
Konstanten      pi e tau phi
Besonderheiten  ans (letztes Ergebnis), Variablen, implizite Multiplikation
```

Winkelmodus umschaltbar zwischen **DEG**, **RAD** und **GON** — gilt durchgängig auch für symbolische Ableitungen.

## Technik

- Eine Datei, ~248 KB, keine Build-Schritte, keine externen Anfragen
- Canvas-2D für 2D- und 3D-Plotter (Painter-Algorithmus für Tiefensortierung)
- Symbolische Mathematik: Tokenizer → Parser → AST → Differentiation → Auswertung
- WebCrypto (SHA-256) für PINs, FNV-1a-Fallback
- localStorage mit Versionsmigration aus v6.2–v8.0
- iOS-App: Capacitor 8, SwiftPM, Share-API bzw. Capacitor-Share-Plugin

## Sicherheit

- PINs als SHA-256-Hash, nie im Klartext
- Alle dynamisch erzeugten Inhalte HTML-escaped
- Keine Netzwerkzugriffe, keine Telemetrie, keine externen Ressourcen (auch nicht in der App)
- Integritätsprüfung der lokalen Datenbank

## Lizenz

**Proprietär — alle Rechte vorbehalten. Nutzung nur im engsten Rahmen gestattet.**

Die vollständigen Bedingungen stehen in [`LICENSE`](LICENSE) und [`DATENSCHUTZ.md`](DATENSCHUTZ.md).

Erlaubt ist ausschließlich die Nutzung der **unveränderten** Software für **private, nicht-kommerzielle** Zwecke auf dem eigenen Gerät. Kommerzielle Nutzung nur auf ausdrückliche schriftliche Anfrage.

**Geltendes Recht:** Bundesrepublik Deutschland, Fassung 2026.
