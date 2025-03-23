# Flash Hub Server

## Overview
This project uses ruffle to emulate flash games in html, and flask to serve an html interface and an update route for adding games.

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

### Docker-compose
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
