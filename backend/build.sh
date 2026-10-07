#!/usr/bin/env bash
set -e

echo "Installing system packages…"
apt-get update
apt-get install -y tesseract-ocr tesseract-ocr-swa poppler-utils

echo "Installing Python packages…"
pip install --upgrade pip
pip install -r requirements.txt

echo "Build complete."
