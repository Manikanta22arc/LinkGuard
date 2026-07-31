from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routes.scan_routes import router as scan_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LinkGuard ",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "LinkGuard ",
        "status": "Running"
    }


@app.get("/version")
def version():
    return {
        "version": "1.0"
    }


app.include_router(scan_router)
