# Cypress tests

Currently tests are running against https://bratislava.sk (If you need to change the baseURL you need to do it in the ./cypress.config.ts), so the app needs to be running.

## How to run Cypress

```
npm run cypress:open //for open mode (Running tests in chrome browser)
```

```
npm run cypress:run // for terminal mode
```

or

```
./cypress.sh <mode> <browser> <device>

Modes: Open, Run
Browsers: Chrome, Edge, Electron, Firefox
Devices: all, desktop, mobile

Example: ./cypress.sh open chrome all
```
