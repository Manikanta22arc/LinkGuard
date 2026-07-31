@echo off

taskkill /F /IM python.exe

cd /d C:\Users\adula\OneDrive\Desktop\IGA\backend

py -m uvicorn app.main:app --reload --port 8000