# Changelog

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
