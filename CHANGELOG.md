# Changelog

## [8.0.0] — 2026-11-02

Umfangreichstes Release: vollständige Design-Überarbeitung, neuer symbolischer Rechenkern, sechs neue Module und die iOS-/iPadOS-App.

### Neu
- **3D-Funktionsplotter**: `z = f(x, y)` als drehbare, nach Höhe gefärbte Fläche (Painter-Algorithmus), Auflösung 24–80, Zoom/Pinch, automatische Parametererkennung, PNG-Export und Teilen
- **RPN-Modus** (Umgekehrte Polnische Notation): Stapelanzeige T Z Y X, ENTER, SWAP, ROLL, DROP, LASTx, Stack-Leeren; umschaltbar neben dem algebraischen Modus
- **Symbolische Mathematik**: Tokenizer → Parser → AST → exakte Differentiation (Kettenregel) für alle trigonometrischen, hyperbolischen, logarithmischen, Wurzel- und Potenzfunktionen; konsistent mit dem Winkelmodus (DEG/GON/RAD)
- **Taylor-Reihen**: Grad 1–30, beliebiger Entwicklungspunkt, Koeffizientenliste, Plot von Funktion und Polynom
- **Hypothesentests**: Einstichproben-t, Zweistichproben-t (Welch), z-Test (μ₀ + σ), χ²-Anpassungstest — mit Prüfgröße, Freiheitsgraden, p-Wert (Lanczos-Gamma, unvollständige Betafunktion), kritischem Wert und 95-%-Konfidenzintervall
- **Numerische Integration** mit wählbarer Methode (Simpson/Trapez) und Kennzahlen-Karte
- **Apple-Pencil-Skizze** (iPad): Zeichnen direkt auf dem 2D-Graphen, nur Stifteingaben, wird in Export und Teilen eingebunden
- **Natives Teilen**: PNG-Weitergabe über Capacitor-Share-Plugin bzw. Web-Share-API mit Download-Fallback
- **Helles Design**: Light-Mode vollständig umgesetzt, automatisch nach System oder manuell
- **Dynamische Schriftgröße** (80–150 %) in den Einstellungen
- **iPadOS-Layout**: Sidebar persistent ab 834 px, sichere Bereiche, 44-px-Touch-Ziele, ⌘1–⌘9 / ⌘B / ⌘K Hardware-Shortcuts
- **iOS/iPadOS-App**: Capacitor-8-Projekt, eigene App-Icons und Splash-Screens (`ios/`), GitHub-Actions-Build (unsigned-Archiv, optional signierte IPA)

### Verbessert
- Tangenten, Normalen und Newton-Iteration nutzen jetzt die exakte symbolische Ableitung (numerischer Fallback bleibt erhalten)
- Alle bestehenden Module auf einheitliche Design-Tokens, Fokus-States und Touch-Ziele umgestellt
- Diagnose im Admin-Panel zeigt Winkelmodus, Design-Modus und Schriftgröße
- Hilfe- und Info-Dialoge um RPN, 3D-Plotter, Taylor und Hypothesentests erweitert
- Befehlspalette um 3D-Plotter, RPN, Teilen, Skizze, Taylor, Hypothesentest, Hell/Dunkel und Integralmethode erweitert
- SVG-Export des Graphen eingebettet jetzt auch die Skizze

### Behoben
- Inkonsistenz zwischen symbolischem und numerischem Ableiten bei DEG/GON-Winkelmodus (Ableitungsskalierung π/180 bzw. π/200)
- Resize-Handler zeichnet jetzt 3D-Ansicht und Skizze-Layer mit

### Migriert
- Bestehende Datenbanken aus v6.2, v6.3, v6.4 und v7.0 werden übernommen; neue Felder (themeMode, fontScale, intMethod, calcMode, rpnStack, graph3dInput) erhalten Standardwerte

### Verifiziert
- Im Browser gegen die Live-Datei geprüft: Parser-Korrektheit (Operatorreihenfolge, Rechtsassoziation, implizite Multiplikation), RPN-Kette, symbolische vs. numerische Ableitung (DEG und RAD), Taylor-Koeffizienten gegen bekannte Reihen, Hypothesentest gegen Referenzwerte, 3D-Gitteraufbau, Integralmethoden, Persistenz und Migration über Reload


## [7.0] — 2026-10-12

### Neu
- **Polynom-Werkzeug**: auswerten, ableiten, integrieren, Nullstellen, Faktorisierung über rationale Nullstellen
- **Komplexe Zahlen**: Grundrechenarten, Betrag, Argument, Konjugation, Kehrwert, Polarform, √z, e^z, ln(z)
- **Grenzwerte**: numerische Bestimmung ein- und beidseitiger Grenzwerte mit Erkennung von Pol- und Sprungstellen
- **Tangente & Normale** an beliebiger Stelle, direkt plotbar
- **Newton-Iteration** mit Iterationstabelle
- **Folgen & Reihen**: automatische Mustererkennung (arithmetisch, geometrisch, quadratisch), Summe, Monotonie
- **Geometrie**: Kreis, Rechteck, Dreieck, Kugel, Zylinder, Kegel
- **Datum & Zeit**: Differenz mit Arbeitstagen, Datumsrechnung, Wochentag, Kalenderwoche, Schaltjahr, Stoppuhr
- **Erweiterte Umrechnung**: 9 Kategorien (Temperatur, Winkel, Datenrate, Frequenz, Leistung, Drehmoment, Brennstoff, Kochmaße, Schuhgrößen)
- **Formelbibliothek**: 28 Formeln, durchsuchbar, übernehmbar
- **Konstanten-Tabelle**: 25 Werte, durchsuchbar, kopierbar
- **Übungsmodus** mit drei Schwierigkeitsstufen und Punktezähler
- **Notizen** mit Formelauswertung beim Export
- **Bruchrechnung** mit automatischem Kürzen
- **Matrix-Raster** von 1×1 bis 8×8
- **Verteilungsdiagramm** in der Statistik
- **Regression & Korrelation**: linear und quadratisch, r und r², direkter Plot
- **Befehlspalette** (Strg+K oder /)
- **Verlaufssuche**, Merkfunktion, CSV-Export
- **Migration** bestehender Daten aus v6.2, v6.3 und v6.4

### Behoben
- Parser rechnete bei Operatorreihenfolge falsch (`2+3*4` ergab 24 statt 14) — Kern vollständig neu geschrieben
- Komma in Funktionsaufrufen wurde als Dezimalpunkt gelesen
- Temperatur- und Winkelumrechnung warf Fehler bei bestimmten Einheitenpaaren
- Determinante einer 1×1-Matrix wurde nicht angezeigt
- Große Zahlen wurden als Exponentialdarstellung geschrieben
- Mehrfache Dezimalpunkte wurden nicht zuverlässig erkannt
- XSS-Risiko: Attribute in erzeugtem HTML wurden nicht escaped
- Grenzwertbestimmung erkannte Polstellen nicht
- Selbstbezogene Integritätsprüfung entfernt (nach jeder Dateiänderung prinzipiell falsch)

### Verifiziert
181 automatisierte Tests, null Fehlschlägen, null Laufzeitfehlern.


## Lizenzänderung — 2026-10-12 (überarbeitet)

Lizenz von proprietär auf vollständige Nutzungs- und Lizenzbedingungen
überführt. Gestattet ist ausschließlich die Nutzung der unveränderten
Software für private, nicht-kommerzielle Zwecke.

- Umschreiben und Forken ausdrücklich untersagt
- Kommerzielle Nutzung nur auf schriftliche Anfrage möglich
- Datenschutzerklärung als eigenes Dokument ergänzt
- Bezug auf UrhG, BGB, DSGVO und TDDDG jeweils Fassung 2026
- Geltendes Recht: Bundesrepublik Deutschland
