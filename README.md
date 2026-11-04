# ELIAN Ultimate Calculator v8.1

Ein wissenschaftlicher Taschenrechner und Funktionsplotter als **eine einzige HTML-Datei** — ohne Build, ohne Abhängigkeiten, ohne Server. Einfach öffnen und rechnen. Alle Daten bleiben lokal im Browser. Das Design: **Liquid Glass** — schwebende Glasflächen, runde Tasten, Feder-Animationen und eine Tab-Leiste unten, wie man sie von modernen iOS-Geräten kennt.

**Live-Demo:** Datei herunterladen und im Browser öffnen — fertig. Funktioniert auf Desktop, Handy und Tablet.

---

## Was ist neu in v8.1 — „Liquid Glass"

Version 8.1 ist ein **Design-Reboot** plus Intelligenz- und Update-System.

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **Komplett neues Design** | Liquid-Glass-Oberfläche: schwebende Karten, runde Rechnertasten, iOS-Systemfarben, Feder-Animationen — durchgängig neu |
| 2 | **Floating-Tab-Bar** | Schwebende Tableiste unten (Handy): Rechner, Wissenschaft, Funktionen, 3D, Statistik + „Mehr" — mit dem Daumen erreichbar |
| 3 | **Large-Title-Navigation** | Großer Modultitel, der beim Scrollen zusammenschrumpft und die kompakte Kopfzeile hervorholt — wie in iOS |
| 4 | **Helles Design** | Automatisch nach Systemeinstellung oder manuell; dark und light vollständig umgesetzt |
| 5 | **Update-System über GitHub** | Prüft auf neue Versionen (opt-in), installiert sie vor dem Laden und verifiziert jede Datei per SHA-256 |
| 6 | **Live-Vorschau beim Tippen** | Der Rechner rechnet beim Tippen mit — Ergebnis erscheint unter der Eingabe, bevor man „=" drückt |
| 7 | **Natürliche Sprache** | „wurzel aus 144", „sinus von 30 Grad", „50 % von 200", „2 hoch 10", „5 plus 3 mal 2" → rechnet direkt |
| 8 | **Absichts-Erkennung** | Bei „2x+5=17" erscheint ein Knopf „Gleichung lösen →"; Einheiten und Datumsangaben werden ebenfalls erkannt |
| 9 | **Auto-Klammern** | Fehlende schließende Klammern werden ergänzt — mit Hinweis auf die Korrektur |
| 10 | **Bottom-Sheets** | Dialoge kommen auf dem Handy von unten als Sheet mit Greif-Lasche, nicht als kleines Fenster |

### Vorherige Versionen (übernommen)

- **v8.0**: 3D-Funktionsplotter, RPN-Modus, exakte symbolische Ableitungen (AST), Taylor-Reihen, Hypothesentests (t/z/χ²), Integration mit Simpson/Trapez, Apple-Pencil-Skizze, natives Teilen (Web-Share-API), dynamische Schriftgröße (80–150 %), iPad-Layout und Hardware-Keyboard-Shortcuts (⌘1–⌘9, ⌘B, ⌘K)
- **v7.0**: Polynome, komplexe Zahlen, Grenzwerte, Tangenten/Normalen, Newton-Iteration, Folgen & Reihen, Geometrie, Datum & Zeit, Umrechnung, Formelbibliothek, Konstanten, Übungsmodus, Notizen, Bruchrechnung, Matrix-Raster, Verteilungsdiagramm, Regression, Befehlspalette (⌘K), Verlaufssuche
- **v6.4**: mathematisch korrekter Kern (Operatorreihenfolge, implizite Multiplikation, rechtsassoziative Potenz)

---

## Alle Module (25)

**Rechnen:** Rechner (algebraisch + RPN) · Wissenschaft · Algebra & LGS · Polynome · Komplexe Zahlen · Analysis (Grenzwerte, Tangente, Newton, Taylor) · Folgen & Reihen · Geometrie

**Darstellen:** 2D-Funktionsplotter (10 Objekttypen) · 3D-Funktionsplotter · Skizzen-Layer (Apple Pencil) · PNG/SVG-Export · Teilen

**Daten:** Statistik (Kennwerte, Quartile, Verteilungsdiagramm) · Hypothesentests · Matrizen (inkl. Raster 8×8) · Regression & Korrelation

**Umwandeln:** Einheiten (10 Kategorien) · Erweiterte Umrechnung (9 Kategorien) · Programmierer (Basis 2/8/10/16, Bit-Toggle)

**Finanzen:** Tilgungsplan mit Zins- und Gesamtbelastung

**Werkzeuge:** Datum & Zeit · Formelbibliothek · Konstanten · Übungsmodus · Notizen · Bruchrechnung

**Verwalten:** Verlauf (Suche, Merken, CSV) · Benutzerkonten (Gast/Normal/Admin) · Admin-Zentrale · Einstellungen

## Update-System (GitHub)

Die Datei kann sich selbst aktualisieren — transparent und überprüfbar:

1. **Einstellungen → Updates → Update-Prüfung** einschalten (opt-in, standardmäßig **aus**)
2. Die App fragt höchstens alle 12 Stunden die neueste Version aus den GitHub-Releases dieses Repositories ab
3. Liegt eine neuere Version vor, erscheint ein Banner am oberen Rand (Dynamic-Island-Stil)
4. **Installieren** lädt die Datei herunter, prüft ihre SHA-256-Summe gegen die im Release hinterlegte Prüfsumme und legt sie für den nächsten Start ab
5. Beim nächsten Öffnen wird die neue Version geladen — voherige lokal gespeicherte Daten bleiben erhalten

Ohne aktivierte Update-Prüfung findet **kein** Netzwerkzugriff statt — das Offline-Versprechen bleibt Standard.

## Bedienung

| Kürzel | Aktion |
|---|---|
| <kbd>⌘/Strg</kbd>+<kbd>K</kbd> oder <kbd>/</kbd> | Befehlspalette |
| <kbd>⌘/Strg</kbd>+<kbd>1</kbd>…<kbd>9</kbd> | Direkt zum Modul (Hardware-Tastatur) |
| <kbd>⌘/Strg</kbd>+<kbd>B</kbd> | Seitenleiste ein/aus |
| <kbd>Enter</kbd> | Berechnen (algebraisch) bzw. ENTER (RPN) |
| <kbd>Esc</kbd> | Eingabe leeren / Dialog schließen |

Tab-Leiste (Handy): Rechner · Wissenschaft · Funktionen · 3D · Statistik — weitere Module über „Mehr".

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
Besonderheiten  ans (letztes Ergebnis), Variablen, implizite Multiplikation,
                Live-Vorschau, natürliche Sprache, Auto-Klammern
```

Winkelmodus umschaltbar zwischen **DEG**, **RAD** und **GON** — gilt durchgängig auch für symbolische Ableitungen und Taylor-Reihen.

## Technik

- Eine Datei (~270 KB), kein Build-Schritt, keine externen Anfragen standardmäßig
- Canvas-2D für 2D- und 3D-Plotter (Painter-Algorithmus für Tiefensortierung)
- Symbolische Mathematik: Tokenizer → Parser → AST → Differentiation → Auswertung
- WebCrypto (SHA-256) für PINs **und** Update-Verifikation, FNV-1a-Fallback
- localStorage mit Versionsmigration aus v6.2 bis v8.0
- Update-Mechanismus: GitHub-Releases-API (opt-in), SHA-256-Prüfsumme aus dem Release-Text

## Sicherheit

- PINs als SHA-256-Hash, nie im Klartext
- Alle dynamisch erzeugten Inhalte HTML-escaped
- Keine Netzwerkzugriffe bei Standardeinstellung; mit aktivierter Update-Prüfung ausschließlich Abfragen der GitHub-Release-API und der Release-Datei
- Integritätsprüfung der lokalen Datenbank
- Update-Dateien: SHA-256 gegen Release-Prüfsumme, Versionsnummer-Download-Sperre (kein Downgrade)

## Lizenz

**Proprietär — alle Rechte vorbehalten. Nutzung nur im engsten Rahmen gestattet.**

Die vollständigen Bedingungen stehen in [`LICENSE`](LICENSE) und [`DATENSCHUTZ.md`](DATENSCHUTZ.md).

Erlaubt ist ausschließlich die Nutzung der **unveränderten** Datei für **private, nicht-kommerzielle** Zwecke auf dem eigenen Gerät. Kommerzielle Nutzung nur auf ausdrückliche schriftliche Anfrage.

**Geltendes Recht:** Bundesrepublik Deutschland, Fassung 2026.
