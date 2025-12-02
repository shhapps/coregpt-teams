#!/bin/bash

set -e

ENV=$1

if [ -z "$ENV" ]; then
  echo "Usage: ./deploy.sh [dev|prod]"
  exit 1
fi

if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
  echo "Invalid environment. Please specify 'dev' or 'prod'"
  exit 1
fi

echo "========================================"
echo "Deploying CoreGPT Teams App - $ENV"
echo "========================================"

# Install dependencies
echo "[1/4] Installing dependencies..."
sudo npm install

# Build frontend
echo "[2/4] Building frontend..."
sudo npm run build:frontend

# Stop existing PM2 process if running
echo "[3/4] Stopping existing PM2 process..."
pm2 stop teams-app || true

# Start PM2 with appropriate config
echo "[4/4] Starting PM2 process..."
pm2 start pm2-confs/pm2.$ENV.json

# Save PM2 config to restart on reboot
pm2 save

echo "========================================"
echo "✓ Deployment completed successfully!"
echo "========================================"
echo "Environment: $ENV"
echo "Process: teams-app"
echo "Port: 5010"
echo "========================================"