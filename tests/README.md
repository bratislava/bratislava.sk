## Run app locally in e2e setup

Currently tests are running against http://localhost:3000 (If you need to change the baseURL you need to do it in the ./cypress.sh), so the app needs to be running. Either follow the e2e setup in [next app readme](../next/README.md), or rebuild & restart via the following npm script from this directory:

```
yarn start:e2e
```

## Run Cypress locally

```
yarn cypress:open //for open mode (Running tests in chrome browser)
```

```
yarn cypress:run // for terminal mode
```

or

```
./cypress.sh <mode> <browser> <device> <baseUrl>

Modes: Open, Run
Browsers: Chrome, Edge, Electron, Firefox
Devices: all, desktop, mobile
BaseUrl: Optional (default value http://localhost:3000)

Example: ./cypress.sh open chrome all https://bratislava.sk/
```

## Running Cypress against production
```
yarn cypress // for open mode
```

## Running Cypress in CI against production
```
yarn cypress:ci // for terminal mode
```
