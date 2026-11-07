# ELIAN Ultimate Calculator v9.1

Ein wissenschaftlicher Taschenrechner, Funktionsplotter und Computer-Algebra-System als **eine einzige HTML-Datei** — ohne Build, ohne Abhängigkeiten, ohne Server. Einfach öffnen und rechnen. Alle Daten bleiben lokal im Browser. Das Design: **Liquid Glass** — schwebende Glasflächen, runde Tasten, Feder-Animationen und eine Tab-Leiste unten, wie man sie von modernen iOS-Geräten kennt.

**Live-Demo:** Datei herunterladen und im Browser öffnen — fertig. Funktioniert auf Desktop, Handy und Tablet.

---

## Neu in v9.1 — „Bedienintelligenz"

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **Tiefe Spracheingabe** | „nullstellen von x² minus 1" öffnet das Algebra-Modul mit vorausgefüllter Gleichung; ebenso Kurvendiskussion, Stammfunktion, Ableitung, Gradient, Eigenwerte, Determinante, Grenzwert |
| 2 | **Favoriten** | ⭐ speichert den aktuellen Ausdruck, Chips unter dem Display laden ihn mit einem Tap |
| 3 | **Undo/Redo** | ↶ / ↷ oder ⌘Z / ⌘Y — jeder Tastendruck im Rechner ist umkehrbar |

### Was ist neu in v9.0 — „Exakte Mathematik"

Version 9.0 macht den Rechner zum **CAS**: Brüche statt Float-Rauschen, symbolische Algebra, exakte Analysis.

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **Exakte rationale Arithmetik** | 1/3 + 1/6 = **1/2** als Bruch, nicht 0,5 — intern rechnet der Rechner mit Brüchen |
| 2 | **Symbolische Polynome** | zusammenfassen, ausmultiplizieren, Potenzen — exakt mit Bruchkoeffizienten |
| 3 | **Stammfunktionen** | ∫x²dx = x³/3 exakt; Grundintegrale sin/cos/exp/ln/1/x; Hauptsatz numerisch verifiziert |
| 4 | **Nullstellen exakt** | pq-/Mitternachtsformel, komplexe Lösungen, rationale Probeteiler mit Deflation |
| 5 | **Partielle Ableitungen** | Gradient und Tangentialebene im 3D-Plotter einblendbar |
| 6 | **Kurvendiskussion automatisch** | Ableitungen, Nullstellen, Extrema, Wendepunkte, Polstellen, Symmetrie, Monotonie — ein Knopf |
| 7 | **Vektoren 2D/3D** | Kreuzprodukt, Skalarprodukt, Winkel, Abstände, Parameterdarstellungen |
| 8 | **Eigenwerte & Potenzen** | char. Polynom, exakt 2×2, QR-Iteration für größere Matrizen |
| 9 | **Grenzwerte exakt** | 0/0 durch Kürzen, ∞ durch Gradvergleich; ∞ und π als Grenzpunkt |
| 10 | **Differentialgleichungen** | exakt für y′=f(x), y′=a+by, Trennung der Variablen; sonst Runge-Kutta |
| 11 | **Verteilungen** | Binomial, Poisson, Φ/Quantile, Konfidenzintervalle |

### Vorherige Versionen (übernommen)

- **v8.1**: Liquid-Glass-Design, Floating-Tab-Bar, Large-Title, GitHub-Updates mit SHA-256, Live-Vorschau, natürliche Sprache
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
