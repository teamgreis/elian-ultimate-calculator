# ELIAN Ultimate Calculator — Durchplanung v9.0

> Einzelfachdatei, offline, exakte Mathematik. Baustein-Logik: jeder Block ist
> committet, getestet und sofort nutzbar. v8.1 (Liquid Glass) bleibt Basis.

## Mathematik-Kern (CAS-Ausbau)

| # | Block | Inhalt | Status |
|---|-------|--------|--------|
| 1 | Exakte rationale Arithmetik | `rq/rAdd/rMul/rDiv/rPow`, `evalExprExact`, Brüche statt Float, `RAT_NOT_CLOSED`-Fallback | ✅ committet |
| 2 | Symbolische Polynome | Koeffizienten-Maps mit rationalen Werten, zusammenfassen/ausmultiplizieren/Potenzen, `simplifyTerm` mit KPI-Ausgabe | ✅ committet |
| 3 | Stammfunktionen | `polyInt` exakt; Grundintegrale sin/cos/exp/ln/1/x; Winkelmodus-Skalierung 180/π; numerische Hauptsatz-Probe | ✅ committet |
| 4 | Partielle Ableitungen | `partialAt` (exakt/numerisch), Gradient, Tangentialebene, Pretty-Print ableitbarer Terme, 3D-Overlay | ✅ committet |
| 5 | Nullstellen exakt | Linear, Mitternachtsformel (Quadratzahl/D=0/D<0/√-Form), rationaler Nullstellensatz + synthetische Division, Plot-Markierung | ✅ committet |
| 6 | Analytische Geometrie | Vektoren 2D/3D: Betrag, Skalarprodukt, Kreuzprodukt, Winkel, Abstand Punkt–Gerade/Punkt–Ebene; Darstellung + Plot-Weiterleitung | geplant |
| 7 | Lineare Algebra | Matrizen: Multiplikation, Determinante, Inverse, Rang; Eigenwerte 2×2 exakt; neues Modul „Matrix" | geplant |
| 8 | Grenzwerte | symbolisch für Polynome/Quotienten (Ausmultiplizieren, Kürzen), L'Hospital-Kandidaten erkennen, numerische Annäherung | geplant |
| 9 | Automatische Kurvendiskussion | Nullstellen/Extrema/Wendepunkte/Pole automatisch, Plot-Markierungen, Definitionslücken, Symmetrie — „Alles analysieren"-Knopf | geplant |
| 10 | DGL 1. Ordnung | separierbar + linear-gleichförmig symbolisch; Euler numerisch; Richtungsfeld-Plot | geplant |
| 11 | Stochastik | Binomial/Normal/Poisson: PMF/CDF, Quantile, Konfidenzintervalle, Regressionsgerade | geplant |

## Bedienung & Qualität

| # | Block | Inhalt | Status |
|---|-------|--------|--------|
| 12 | Bedienintelligenz | tiefere Spracheingabe („Nullstellen von x² minus 1"), Favoriten-Verlauf, Undo/Redo im Rechner | geplant |
| 13 | Qualität & Release | Mathematik-Eigenschaftstests in `pruefung.yml` (Hauptsatz, pq, Determinante, …), README/CHANGELOG, Release v9.0 mit SHA | geplant |

## Spielregeln (aus allen bisherigen Blöcken)

1. **Kein Bruch lost sich in Float auf.** Jede Rechnung bleibt exakt, solange die
   Operation rational abgeschlossen ist (`RAT_NOT_CLOSED` ist das einzige
   Fallback-Signal).
2. **Der Winkelmodus gilt überall.** DEG/GON skalieren Ableitung UND Integration
   mit 180/π bzw. 200/π — Symbolik und Numerik stimmen dann überein (per
   Hauptsatz-Probe verifiziert).
3. **Pretty-Print ist Teil der Korrektheit.** Ausgaben zeigen Hochzeichen,
   geklammerte Bruchkoeffizienten und normierte Vorzeichen; Test-Exaktheit wird
   gegen String-Ausgaben geprüft, nicht nur gegen Werte.
4. **Zahlen links.** `2·cos(x)` statt `cos(x)·2`, `x³/3` statt `(1/3)x³`.
5. **Jeder Block endet mit:** Browser-Test (Engine + UI + Regression aller
   vorherigen Blöcke) → `node --check` → Commit → Push. Erst dann nächster Block.
