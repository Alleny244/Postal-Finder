#!/bin/bash
cd proxy-server
pip install -r requirements.txt
uvicorn apps:app --host 0.0.0.0 --port $PORT
