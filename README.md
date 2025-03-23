# Flash Hub Server

## Overview
This project uses ruffle to emulate flash games in html, and flask to serve an html interface and an update route for adding games.

## Quick start
### with docker run
```bash
docker run -d -p 5000:5000 -v /path/to/swf/files flynn28/flashhub
```
### with docker compose
```yaml
version: '3.8'

services:
  flashhub:
    image: flynn28/flashhub 
    ports:
      - "5000:5000"
    volumes:
      - /path/to/swf/files:/app/public/games
    restart: always
```
```bash
docker-compose up -d
```

## Setup

### Without Docker
1. clone repo
```bash
git clone https://github.com/flynn-28/flashhub-server
```
2. open folder
```bash
cd flashhub-server
```
3. install requirements
```bash
pip install -r requirements.txt
```
4. Copy swf files into games directory
```bash
cp /path/to/games/*.swf public/games
```
4. run server
```bash
python3 -m server
```
5. update game list by visiting `http://localhost:5000/update`

### Docker-compose (from source)
1. clone repo
```bash
git clone https://github.com/flynn-28/flashhub-server
```
2. open folder
```bash
cd flashhub-server
```
3. run container
```bash
docker-compose up -d
```
4. copy swf files into games folder
5. update game list by visiting `http://localhost:5000/update`

### Docker-compose (without source)
1. create `docker-compose.yml` file
2. paste the following code into file
```yaml
version: '3.8'

services:
  flashhub:
    image: python:3.9-slim
    container_name: flashhub-server
    environment:
      - FLASK_APP=server.py
    working_dir: /app
    volumes:
      - ./app:/app
    command: >
      bash -c "
        apt-get update && apt-get install -y git && \
        git clone https://github.com/flynn-28/flashhub-server /app && \
        cd /app && \
        pip install -r requirements.txt && \
        python server.py
      "
    ports:
      - "5000:5000"
```
3. build and run
```bash
docker-compose up -d
```
4. copy swf files into games folder
5. update game list by visiting `http://localhost:5000/update`
