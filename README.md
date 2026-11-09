# LinkGuard

A lightweight phishing URL detection system. It checks a website address and tells you whether it looks safe or suspicious, using rule-based analysis.

## Features

- URL scanning with rule-based phishing detection
- Chrome extension that checks sites as you browse
- Scan history
- FastAPI backend with a PostgreSQL database
- React frontend
- Docker support

## Tech stack

| Part | Technology |
|---|---|
| Backend | Python, FastAPI, SQLAlchemy, PostgreSQL |
| Frontend | React, Vite, Axios |
| Extension | Chrome Extension (Manifest V3) |
| Deployment | Docker, Docker Compose |

## Project structure

```
LinkGuard
├── backend            FastAPI app
├── frontend           React website
├── chrome.extension   Chrome extension
├── docs               Extra documentation
└── docker-compose.yml Runs everything together
```

## Quick start (Docker)

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
git clone https://github.com/Manikanta22arc/LinkGuard.git
cd LinkGuard
docker compose up --build
```

Then open:

- Website: http://localhost:5173
- API: http://localhost:8000
- API docs: http://localhost:8000/docs

To stop everything, press `Ctrl + C`, then run `docker compose down`.

## Install the Chrome extension

1. Make sure the project is running (see above), because the extension talks to the backend at `http://127.0.0.1:8000`.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the `chrome.extension` folder from this project.

## API endpoints

| Method | Endpoint | What it does |
|---|---|---|
| POST | `/scan/` | Scan a URL. Body: `{"url": "https://example.com"}` |
| GET | `/scan/history` | List past scans |
| DELETE | `/scan/history` | Clear scan history |

## Run without Docker (optional)

Backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # on Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env       # on Mac/Linux: cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

You need PostgreSQL running, and `DATABASE_URL` in `.env` must point to it.

Frontend:

```bash
cd frontend
npm install
npm run dev
```


## 📸 Screenshots

### 1. Homepage
![Homepage](docs/screenshots/home.page.png)

### 2. Safe Website Detection
![Safe Website](docs/screenshots/safe.url.png)

### 3. Phishing Warning
![Phishing Warning](docs/screenshots/phishing.warning.png)

### 4.Safe Website
![Blocked Website](docs/screenshots/safe.png)

### 5. Browser Extension
![Extension Popup](docs/screenshots/extension.png)

## Author

Adula Manikanta