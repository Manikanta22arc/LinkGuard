# LinkGuard

A lightweight phishing URL detection system that helps users identify potentially malicious websites before visiting them.

## Features

- URL scanning
- Phishing detection using rule-based analysis
- Chrome Extension integration
- Scan history
- FastAPI backend
- React frontend
- PostgreSQL database
- Docker support

## Tech Stack

### Frontend
- React
- Vite
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker

### Browser Extension
- Chrome Extension (Manifest V3)

## Project Structure

```
IGA
│
├── backend
├── frontend
├── chrome.extension
├── Dockerfile
├── docs
└── README.md
```

## Running the Project

### Backend

```bash
cd backend
docker compose up --build
```

### Frontend

```bash
cd frontend
docker compose up --build
```

Open:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Author

Adula Manikanta