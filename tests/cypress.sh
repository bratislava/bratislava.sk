#!/bin/bash

mode="$1"
browser="$2"
device="$3"

if [[ -z "$mode" || -z "$browser" || -z "$device" ]]; then
  echo ""
  echo "Modes:          Open, Run"
  echo "Browsers:       Chrome, Edge, Electron, Firefox"
  echo "Devices:        all, desktop, mobile"
  echo "Usage:          ./cypress.sh <mode> <browser> <device>"
  echo "Example:        ./cypress.sh open chrome desktop"
  echo ""
  exit 1
fi

npx cypress "$mode" --e2e --browser "$browser" --env DEVICE="$device"