# Changelog

## [9.1.0] — 2026-11-07

Bedienintelligenz: tiefe Spracheingabe, Favoriten und Undo/Redo im Rechner.

### Neu
- **Tiefe Spracheingabe**: „nullstellen von x² minus 1", „kurvendiskussion von x³−3x", „stammfunktion von x²", „ableitung von sin(x)", „gradient von x·y", „eigenwerte von 4 1 2 3", „determinante von 1 2 3 4" — der Befehl öffnet das passende Modul mit vorausgefülltem Feld. Hochzeichen (x²) und Wort-Operatoren („minus", „plus", „mal", „durch", „hoch") werden normalisiert
- **Favoriten**: Ausdruck mit ⭐ speichern, als Chips unter dem Display, Tap lädt ihn, „alle löschen" leert die Liste (in `db.favorites` gespeichert)
- **Undo/Redo** im Rechner: ↶ / ↷ oder ⌘Z / ⌘Y (Strg+Y) — jede Eingabeänderung ist umkehrbar, 60 Schritte tief

### Qualität
- `mathe-tests.js` auf 41 Tests erweitert: Intent-Erkennung (7 Muster + Negativfall), Matrix-Text-Umwandlung, Favoriten-Verwaltung

## [9.0.0] — 2026-11-07

Vom Rechner zum Computer-Algebra-System — exakte Mathematik in allen Modulen.

### Neu
- **Exakte rationale Arithmetik** (Baustein 1): 1/3 + 1/6 = 1/2 als Bruch statt 0,5; `evalExprExact` arbeitet intern mit Brüchen, Darstellungs- und Rechenfehler durch Float entfallen
- **Symbolische Polynome** (Baustein 2): zusammenfassen, ausmultiplizieren, Potenzen — exakt über Koeffizienten-Maps mit Bruchkoeffizienten, schöne Ausgabe mit echten Hochzeichen (x²)
- **Stammfunktionen** (Baustein 3): ∫x²dx = x³/3 exakt; Grundintegrale sin/cos/exp/ln/1/x mit Konstanten; Hauptsatz-Probe numerisch verifiziert
- **Nullstellen exakt** (Baustein 5): lineare und quadratische Gleichungen analytisch (pq-/Mitternachtsformel), Diskriminante mit Quadratzahl-/Doppel-/Komplexfall, rationale Probeteiler mit Horner-Deflation für höhere Polynome
- **Partielle Ableitungen** (Baustein 4): Gradient und Tangentialebene für z = f(x, y), halbtransparent im 3D-Plotter einblendbar
- **Automatische Kurvendiskussion** (Baustein 9): Ableitungen, Nullstellen, Extrema, Wendepunkte, Polstellen, Symmetrie und Monotonieintervalle in einem Schritt, Marker direkt in den Plot
- **Vektoren 2D/3D** (Baustein 6): Addition, Skalar- und Kreuzprodukt, Winkel, Abstände, Einheitsvektoren, Parameterdarstellungen
- **Eigenwerte & Potenzen** (Baustein 7): charakteristisches Polynom, exakt für 2×2, QR-Iteration für größere Matrizen, binäre Potenzierung
- **Grenzwerte exakt** (Baustein 8): 0/0 durch Kürzen von Linearfaktoren, ∞ durch Gradvergleich, exakte Bruchdarstellung; ∞/−∞/π als Grenzpunkt
- **Differentialgleichungen** (Baustein 10): y′ = f(x), y′ = a + b·y und Trennung der Variablen exakt, sonst Runge-Kutta 2. Ordnung
- **Verteilungen** (Baustein 11): Binomial, Poisson, Normalverteilung (Φ, Dichte, Quantile) und Konfidenzintervalle für Anteile

### Verbessert
- **Winkeltreue**: DEG/GON skalieren Ableitung und Integration konsistent mit π/180 bzw. π/200 — symbolisch und numerisch stimmen in beiden Modi überein
- **Lesbare Mathematik**: Pretty-Print für Ableitungen (Hochzeichen, Konstantenfaltung, normierte Vorzeichen), geklammerte Bruchkoeffizienten, Verfahrensangabe bei jedem Ergebnis
- **Nullstellen-Werkzeug** im Algebra-Modul zeigt Verfahren, Diskriminante und „Nullstellen im Plot markieren"
- **Grenzwert-Werkzeug** zeigt das Verfahren an (Kürzen/numerisch)

### Qualität
- **mathe-tests.js**: 31 mathematische Eigenschaftstests (Brüche, Polynome, Hauptsatz, pq-Formel, Φ, Quantile, KI) laufen in der CI mit
- CI prüft jetzt Baustein-spezifische Engines und führt die Mathematik-Tests aus

## [8.1.0] — 2026-11-02

Design-Reboot „Liquid Glass", Intelligenz-Features und ein GitHub-Update-System mit SHA-256-Verifikation.

### Neu
- **Komplett neues Design-System (Liquid Glass)**: schwebende Glasflächen mit Tiefenunschärfe, runde Rechnertasten, iOS-Systemfarben, Feder-Animationen (cubic-bezier-Springs), einheitliche Radien/Abstände, Fokus-States
- **Floating-Tab-Bar** (Handy): Rechner, Wissenschaft, Funktionen, 3D, Statistik + „Mehr" — feste Tableiste unten mit Daumen-Haltung
- **Large-Title-Navigation**: großer Modultitel, kollabiert beim Scrollen; kompakte Kopfzeile erscheint
- **Bottom-Sheets**: Dialoge erscheinen auf dem Handy als Sheet mit Greif-Lasche
- **Update-System über GitHub** (opt-in): erkennt neue Releases, installiert sie vor dem Laden, verifiziert per SHA-256 gegen die im Release hinterlegte Prüfsumme, kein Downgrade
- **Live-Vorschau beim Tippen** im Rechner
- **Natürliche Sprache**: „wurzel aus 144", „sinus von 30 Grad", „50 % von 200", „2 hoch 10", „5 plus 3 mal 2", „logarithmus von 100"
- **Absichts-Erkennung**: Gleichung → „Gleichung lösen →" (Algebra-Modul), Einheiten, Datumsangaben
- **Auto-Klammern**: fehlende schließende Klammern werden ergänzt und die Korrektur angezeigt
- **Befehlspalette** um Update-, Design- und Intelligenz-Befehle erweitert

### Verbessert
- Light-Mode vollständig überarbeitet (Karten, Tabellen, Tastatur, Plotter, Sheets)
- Sichere Bereiche (Notch/Dynamic Island), Overscroll-Kontrolle, `100dvh`
- Touch-Ziele ≥ 44 px, runde Tasten mit Spring-Einrasten
- Diagnose im Admin-Panel um Update-Informationen erweitert

### Behoben
- smartParse: die Ersetzungsfunktionen von `String.replace` empfingen den Match-Text statt der Fangruppen — alle natürlichsprachlichen Umwandlungen lieferten falsche Zeichenkettten
- detectIntent: Gleichungen wie `2x+5=17` wurden nicht erkannt (Regex verlangte ein Buchstabe direkt vor dem `=`)
- Entfernt: unnötige `$('#top')||0`-Anweisung und ungültige scrollTo-Verhalten-Option in show()

### Migriert
- Bestehende Datenbanken aus v6.2 bis v8.0 werden übernommen; `themeMode` wechselt auf „auto", `updateCheck` startet aus (Opt-in)

### Verifiziert
- Im Browser geprüft: Live-Vorschau (inkl. Klammer-Ergänzung), alle smartParse-Regeln mit Kontrollwerten, Absichtserkennung für alle vier Typen, Rechnerkern (Operatorreihenfolge, DEG/RAD), 3D-Gitter, Tab-Bar-Aufbau, Light-Mode, Reload-Persistenz

### Datenschutz
- Update-Prüfung ist standardmäßig **deaktiviert**; ohne sie kein Netzwerkzugriff
- Datenschutzerklärung um den opt-in GitHub-Zugriff ergänzt


## [8.0.0] — 2026-11-02

### Neu (Archiv)
- **3D-Funktionsplotter**: z = f(x, y) als drehbare, nach Höhe gefärbte Fläche (Painter-Algorithmus), Auflösung bis 80×80, Parameter-Support, PNG-Export und Teilen
- **RPN-Modus** (Umgekehrte Polnische Notation): Stapelanzeige T Z Y X, ENTER, SWAP, ROLL, DROP, LASTx
- **Symbolische Mathematik**: exakte Differentiation auf dem Syntaxbaum mit Kettenregel, konsistent mit dem Winkelmodus
- **Taylor-Reihen**: Grad 1–30, beliebiger Entwicklungspunkt, Plot von Funktion und Polynom
- **Hypothesentests**: Einstichproben-t, Zweistichproben-t (Welch), z-Test, χ²-Anpassungstest mit p-Wert und Konfidenzintervall
- **Numerische Integration** mit Methodenwahl (Simpson/Trapez)
- **Apple-Pencil-Skizze** (iPad) auf dem Graphen, eingebunden in Export und Teilen
- **Natives Teilen** (Web-Share-API)
- **Helles Design** (automatisch nach System), dynamische Schriftgröße 80–150 %
- **iPad-Layout**: Sidebar ab 834 px, sichere Bereiche, ⌘1–⌘9 / ⌘B / ⌘K

### Entfernt gegenüber 8.0.0
- **iOS-/iPadOS-App (Capacitor)**:Entfernt auf Wunsch — das Projekt ist wieder ausschließlich die Single-File-HTML-Datei


## [7.0] — 2026-10-12

### Neu
- **Polynom-Werkzeug**: auswerten, ableiten, integrieren, Nullstellen, Faktorisierung
- **Komplexe Zahlen**: Grundrechenarten, Betrag, Argument, Konjugation, Polarform, √z, e^z, ln(z)
- **Grenzwerte**: numerische Bestimmung ein- und beidseitiger Grenzwerte
- **Tangente & Normale**, **Newton-Iteration** mit Iterationstabelle
- **Folgen & Reihen** mit Mustererkennung
- **Geometrie**, **Datum & Zeit**, **Erweiterte Umrechnung** (9 Kategorien)
- **Formelbibliothek** (28 Formeln), **Konstanten-Tabelle** (25 Werte)
- **Übungsmodus**, **Notizen**, **Bruchrechnung**, **Matrix-Raster**, **Verteilungsdiagramm**
- **Regression & Korrelation**, **Befehlspalette**, **Verlaufssuche**, **Migration**

### Behoben
- Parser rechnete bei Operatorreihenfolge falsch (`2+3*4` ergab 24 statt 14) — Kern vollständig neu geschrieben
- Komma in Funktionsaufrufen wurde als Dezimalpunkt gelesen
- Große Zahlen wurden als Exponentialdarstellung geschrieben
- XSS-Risiko: Attribute in erzeugtem HTML wurden nicht escaped

### Verifiziert
181 automatisierte Tests, null Fehlschlägen, null Laufzeitfehlern.


## Lizenzänderung — 2026-10-12

Lizenz von proprietär auf vollständige Nutzungs- und Lizenzbedingungen
überführt. Gestattet ist ausschließlich die Nutzung der unveränderten
Software für private, nicht-kommerzielle Zwecke.

- Umschreiben und Forken ausdrücklich untersagt
- Kommerzielle Nutzung nur auf schriftliche Anfrage möglich
- Datenschutzerklärung als eigenes Dokument ergänzt
- Bezug auf UrhG, BGB, DSGVO und TDDDG jeweils Fassung 2026
- Geltendes Recht: Bundesrepublik Deutschland
