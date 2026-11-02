# ELIAN Ultimate Calculator v8.0 — iOS & iPadOS

Native App (Capacitor 8) für iPhone und iPad. Die komplette Anwendung ist die
Single-File-HTML-Datei aus dem Hauptverzeichnis `ELIAN_Ultimate_Calculator_v8.0.html`;
dieses Verzeichnis bündelt Build, Signing und CI.

## Aufbau

```
ios/
├── capacitor.config.json   App-ID app.elian.ultimate · WebDir www
├── package.json            Capacitor 8 · Share · SplashScreen · StatusBar
├── www/index.html          die App (Kopie der Single-File-Datei)
├── resources/
│   ├── icon.png            1024×1024, deckend (iOS-konform)
│   └── splash.png          2732×2732 Launch-Screen
├── make_assets.py          erzeugt Icon/Splash neu (Pillow: `python make_assets.py`)
└── ios/App/                Xcode-Projekt (SwiftPM, TARGETED_DEVICE_FAMILY 1,2)
```

## Erzeugen der App auf dem Mac

```bash
# 1) Web-Datei ins Projekt kopieren (Quelle der Wahrheit bleibt das Hauptverzeichnis)
cp ../ELIAN_Ultimate_Calculator_v8.0.html www/index.html

# 2) Abhängigkeiten + Sync
npm ci
npx cap sync ios

# 3) Xcode öffnen (Team in „Signing & Capabilities“ wählen)
open ios/App/App.xcworkspace
```

Danach in Xcode: Ziel **Any iOS Device (arm64)** oder einen Simulator wählen,
`Product → Run` bzw. `Product → Archive` für den Store/TestFlight.

## Erzeugung über CI (GitHub Actions)

`.github/workflows/build-ios.yml` läuft auf `macos-15` und erzeugt bei jedem
Push ein **unsigned-Xcode-Archiv** als Artefakt (`ELIAN-xcarchive`). Ohne
Signatur-Geheimnisse ist der Build für die lokale Entwicklung in Xcode
bestimmt; zum Testen auf dem Gerät das Archiv herunterladen und in Xcode mit
eigenem Team signieren.

Für eine signierte IPA zusätzlich als Repository-Geheimnisse setzen:

| Geheimnis | Inhalt |
|---|---|
| `APPLE_P12_BASE64` | Signaturzertifikat (.p12, base64) |
| `APPLE_P12_PASSWORD` | Passwort des .p12 |
| `APPLE_API_KEY_BASE64` | App-Store-Connect-API-Schlüssel (.p8, base64) |
| `APPLE_API_KEY_ID` / `APPLE_API_ISSUER_ID` | API-Schlüssel-Kennung / Aussteller |
| `APPLE_TEAM_ID` | Development-Team |
| `PROVISIONING_PROFILE_NAME` | Profilname für `app.elian.ultimate` |
| `KEYCHAIN_PASSWORD` | Passwort des temporären Schlüsselbunds |

## iPadOS-Details

- **Alle vier Orientierungen**, Split View / Slide Over / Stage Manager werden
  unterstützt (`UIRequiresFullScreen` ist nicht gesetzt).
- **Sichere Bereiche**: Layout respektiert Notch und Dynamic Island über
  `env(safe-area-inset-*)`.
- **Hardware-Keyboard**: ⌘1…⌘9 wechseln Module, ⌘B schaltet die Seitenleiste,
  ⌘K öffnet die Befehlspalette.
- **Apple Pencil**: im Funktionsplotter kann unter „✎ Skizze“ direkt mit dem
  Stift auf den Graphen gezeichnet werden (nur pen-Eingaben).
- Touch-Ziele ≥ 44 px, `100dvh`-Layout, Overscroll-Kontrolle.

## Hinweise zur Wartung

- Die Web-App bewusst **ohne** Framework: ein Bundling-Schritt ist nicht nötig,
  `cap copy` genügt.
- Bundle-ID `app.elian.ultimate` — eindeutig halten bzw. in
  `capacitor.config.json` und Xcode gemeinsam ändern.
- Icon/Splash werden über Assets-Katalogen (`Assets.xcassets`) ausgeliefert;
  Erzeugung s. `make_assets.py`.
- Kein Netzwerkzugriff nötig oder erlaubt — Datenschutzerklärung im
  Hauptverzeichnis bleibt gültig.
