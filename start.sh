#!/bin/bash
cd proxy-serer
pip install -r requirements.txt
uvicorn proxy_server.apps:app --host 0.0.0.0 --port $PORT
