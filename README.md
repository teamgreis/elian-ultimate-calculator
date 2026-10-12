# ELIAN Ultimate Calculator v7.0

Ein wissenschaftlicher Taschenrechner und Funktionsplotter als **einzelne HTML-Datei** — ohne Build, ohne Abhängigkeiten, ohne Server. Einfach öffnen und rechnen. Alle Daten bleiben lokal im Browser (localStorage).

**Live-Demo:** Datei herunterladen und im Browser öffnen — fertig.

---

## Was ist neu in v7.0

Version 7.0 baut auf dem vollständig neu geschriebenen, mathematisch korrekten Kern von 6.4 auf und ergänzt **elf neue Module** mit über 20 neuen Funktionen.

| # | Neuerung | Beschreibung |
|---|---|---|
| 1 | **Polynom-Werkzeug** | Koeffizienten eingeben, auswerten, ableiten, integrieren, Nullstellen bestimmen und über rationale Nullstellen faktorisieren |
| 2 | **Komplexe Zahlen** | Grundrechenarten auf ℂ, Betrag, Argument, Konjugation, Kehrwert, Polarform, √z, e^z, ln(z) |
| 3 | **Grenzwerte** | Numerische Bestimmung ein- und beidseitiger Grenzwerte inkl. Erkennung von Pol- und Sprungstellen |
| 4 | **Tangente & Normale** | Tangente und Normale an beliebiger Stelle berechnen und direkt plotten |
| 5 | **Newton-Iteration** | Nullstellen numerisch bestimmen, mit Iterationstabelle |
| 6 | **Folgen & Reihen** | Arithmetische, geometrische und quadratische Muster automatisch erkennen, Summe, Monotonie, Extremwerte |
| 7 | **Geometrie** | Kreis, Rechteck, Dreieck (inkl. Heron und Winkeln), Kugel, Zylinder, Kegel |
| 8 | **Datum & Zeit** | Datumsdifferenz mit Arbeitstagen, Datumsrechnung, Wochentag, Kalenderwoche, Schaltjahrprüfung, Stoppuhr |
| 9 | **Erweiterte Umrechnung** | Neun Kategorien: Temperatur, Winkel, Datenrate, Frequenz, Leistung, Drehmoment, Brennstoff, Kochmaße, Schuhgrößen |
| 10 | **Formelbibliothek** | 28 Formeln aus Mathematik, Physik und Finanzen, durchsuchbar, direkt in den Rechner übernehmbar |
| 11 | **Konstanten-Tabelle** | 25 physikalische und mathematische Konstanten, durchsuchbar, per Klick kopierbar |
| 12 | **Übungsmodus** | Rechenaufgaben in drei Schwierigkeitsstufen mit Punktezähler |
| 13 | **Notizen** | Notizen speichern, mit Formelauswertung beim Export |
| 14 | **Bruchrechnung** | Exakte Brucharithmetik mit automatischem Kürzen |
| 15 | **Matrix-Raster** | Matrix beliebig von 1×1 bis 8×8 setzen, zufällig füllen, direkt übernehmen |
| 16 | **Verteilungsdiagramm** | Häufigkeitsverteilung als Balkendiagramm direkt bei der Statistik |
| 17 | **Regression & Korrelation** | Lineare und quadratische Regression, Korrelationskoeffizient r, Bestimmtheitsmaß r², direkter Plot |
| 18 | **Befehlspalette** | <kbd>Strg</kbd>+<kbd>K</kbd> oder <kbd>/</kbd> — alle Module und Aktionen per Tastatur |
| 19 | **Verlaufssuche** | Verlauf durchsuchen, Einträge merken, als CSV exportieren |
| 20 | **Migrationspfad** | Bestehende Daten aus v6.2, v6.3 und v6.4 werden automatisch übernommen |

---

## Der Kern: mathematisch korrekt

Die Parser von v6.3 und früher **rechneten falsch**. Die implizite Multiplikation erkannte `+` und `-` als Faktoranfang und verschlang damit die Operatoren:

| Eingabe | v6.3 (alt) | v7.0 (korrekt) |
|---|---|---|
| `2+3*4` | 24 ❌ | 14 ✅ |
| `2-3` | −6 ❌ | −1 ✅ |
| `5-3-1` | 15 ❌ | 1 ✅ |
| `sin(30)+cos(60)` | 0,25 ❌ | 1 ✅ |
| `3--2` | 6 ❌ | 5 ✅ |
| `-2^2` | 4 ❌ | −4 ✅ |

Version 7.0 wurde daher von Grund auf neu geschrieben. Verifiziert durch **181 automatisierte Tests** mit null Fehlschlägen und null Laufzeitfehlern.

---

## Alle Module

**Rechnen:** Taschenrechner · Wissenschaftlich · Algebra (quadratisch, biquadratisch, LGS 2×2/3×3, Vereinfachen, Umstellen) · Polynome · Komplexe Zahlen · Analysis · Folgen & Reihen · Geometrie

**Darstellen:** Funktionenplotter (10 Objekttypen: Funktion, vertikale Linie, implizit, Ungleichung, parametrisch, Polar, Fläche, Punkt, Kreis) mit Integral, Ableitung, Wertetabelle, Parameterschiebern, SVG- und PNG-Export

**Daten:** Statistik (alle Kennwerte, Normalverteilung, Verteilungsdiagramm) · Matrizen (Rechenoperationen, Determinante, Inverse, Rang, Raster bis 8×8) · Regression & Korrelation

**Umwandeln:** Einheiten (7 Kategorien) · Erweiterte Umrechnung (9 Kategorien) · Programmierer (BASIS 2/8/10/16, Bit-Operationen)

**Finanzen:** Zinseszins, Tilgungsplan, Break-even, Investitionsrechnung

**Werkzeuge:** Datum & Zeit · Formelbibliothek · Konstanten · Übungsmodus · Notizen · Bruchrechnung

**Verwalten:** Verlauf (Suche, Merken, CSV) · Benutzerkonten (Gast/Normal/Admin) · Admin-Panel · Einstellungen

## Funktionen im Parser

```
Trigonometrie   sin cos tan cot sec csc asin acos atan atan2
Hyperbolisch    sinh cosh tanh coth asinh acosh atanh
Logarithmen     ln log(x,b) log2 log10 exp
Wurzeln/Potenzen sqrt cbrt ^ **
Rundung         abs floor ceil round sign trunc
Kombinatorik    factorial nCr nPr
Zahlentheorie   gcd lcm
Statistik       min max sum mean
Konstanten      pi e tau phi
Besonderheiten   ans (letztes Ergebnis), Variablen, implizite Multiplikation
```

Winkelmodus umschaltbar zwischen **DEG**, **RAD** und **GON**.

## Bedienung

| Kürzel | Aktion |
|---|---|
| <kbd>Strg</kbd>+<kbd>K</kbd> oder <kbd>/</kbd> | Befehlspalette öffnen |
| <kbd>↑</kbd> / <kbd>↓</kbd> | In der Palette navigieren |
| <kbd>Enter</kbd> | Befehl ausführen |
| <kbd>Esc</kbd> | Palette schließen |
| <kbd>Enter</kbd> | Im Rechner berechnen |

## Erster Start

1. Datei `ELIAN_Ultimate_Calculator_v7.0.html` im Browser öffnen
2. Mit **admin / 123456** anmelden
3. **Sofort die Admin-PIN ändern** (Benutzer → Admin bearbeiten)

Im Admin-Panel lassen sich Module einzeln deaktivieren, Benutzer anlegen, Designs zuweisen und die Sitzung exportieren oder importieren.

## Designs

fünf Themes: **Liquid 2** · **Pride** · **Premium** · **Rainbow** · **Diamond** — inklusive `prefers-reduced-motion`, Fokus-Ringen und Druck-Styles.

## Technik

- Eine Datei, ~188 KB, keine Build-Schritte, keine externen Anfragen
- Canvas-2D für den Plotter, SVG-Export als separater Codepfad
- WebCrypto (SHA-256) für PINs, mit FNV-1a-Fallback wenn nicht verfügbar
- localStorage mit Versionsmigration und Integritätsprüfung
- Alle Ausgaben HTML-escaped
- Getestet unter Node.js mit jsdom

## Testabdeckung

| Suite | Tests | Ergebnis |
|---|---|---|
| Mathe-Kern (Regression) | 72 | bestanden |
| v7.0-Funktionen | 109 | bestanden |
| **Summe** | **181** | **0 Fehlschläge, 0 Laufzeitfehler** |

Geprüft werden Operatorreihenfolge, alle Mathematikfunktionen, Winkelmodi, Fehlerfälle (Division durch Null, Fakultät außerhalb des Bereichs, ungültige Zahlen, fehlende Klammern), jedes neue Modul mit bekannten Kontrollwerten, die Migration von Altversionen sowie die Unversehrtheit des Kerns.

## Sicherheit

- PINs werden als SHA-256-Hash gespeichert, nie im Klartext
- Alle dynamisch erzeugten Inhalte werden HTML-escaped
- Keine Netzwerkzugriffe, keine Telemetrie, keine externen Ressourcen
- Die Datenbank enthält einen Integritätscheck; ein widersprüchlicher Stand wird erkannt und neu aufgebaut

## Lizenz

**Proprietär — alle Rechte vorbehalten.**

Diese Software ist **keine** Open-Source-Software. Erlaubt ist ausschließlich
die **private, nicht-kommerzielle Nutzung** auf dem eigenen Gerät.

**Nicht erlaubt** ohne ausdrückliche schriftliche Genehmigung des Urhebers:

- Veränderung, Ergänzung, Übersetzung oder Ableitung des Codes (auch Forks)
- Vervielfältigung, Verbreitung, Weitergabe, Verkauf oder Vermietung
- Kommerzielle oder geschäftliche Nutzung, auch im Unternehmen oder in Bildungseinrichtungen
- Entfernen oder Verdecken von Urheberrechtsvermerken
- Reverse Engineering, Dekompilierung oder Disassemblierung
- Integration in andere Produkte oder Dienste

Die öffentliche Zugänglichkeit des Codes auf einer Hosting-Plattform ist keine
Einwilligung in eine darüberhinausgehende Nutzung. Vollständiger Text in
[`LICENSE`](LICENSE).
