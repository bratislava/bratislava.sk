#!/bin/bash

mode="$1"
browser="$2"
device="$3"
baseUrl="$4"

if [[ -z "$mode" || -z "$browser" || -z "$device" ]]; then
  echo ""
  echo "Modes:          Open, Run"
  echo "Browsers:       Chrome, Edge, Electron, Firefox"
  echo "Devices:        all, desktop, mobile"
  echo "BaseUrl:        Optional"
  echo "                Empty (default value): http://localhost:300/"
  echo "Usage:          ./cypress.sh <mode> <browser> <device> <baseUrl>"
  echo "Example:        ./cypress.sh open chrome desktop"
  echo ""
  exit 1
fi

if [[ -z "$baseUrl" ]]; then
  baseUrl="http://localhost:3000"
fi

npx cypress "$mode" --e2e --browser "$browser" --env DEVICE="$device",BASEURL="$baseUrl"