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

echo "========================================"
echo "✓ Build completed successfully!"
echo "========================================"
echo "Environment: $ENV"
echo "Frontend built to: dist/"
echo "Next: Run PM2 restart command"
echo "========================================"