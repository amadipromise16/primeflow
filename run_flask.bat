@echo off
title Black Plumbing Heating & Air - Python Flask Server
echo ======================================================================
echo Starting Black Plumbing Heating ^& Air (Python Flask + SQLite Backend)
echo ======================================================================
echo.
echo Installing dependencies if needed...
pip install -r requirements.txt
echo.
echo Starting Flask application...
python app.py
pause

