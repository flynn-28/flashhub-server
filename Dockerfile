version: '3.8'

services:
  flashhub-server:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - FLASK_ENV=development
    command: python3 -m server
