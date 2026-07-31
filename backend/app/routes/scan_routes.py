from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.models.scan import Scan
from app.services.detector import detect_url

router = APIRouter(
    prefix="/scan",
    tags=["Scan"]
)


class ScanRequest(BaseModel):
    url: str


@router.post("/")
def scan_url(request: ScanRequest, db: Session = Depends(get_db)):
    result = detect_url(request.url)

    scan = Scan(
        url=request.url,
        prediction=result["prediction"]
    )

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "id": scan.id,
        "url": scan.url,
        "prediction": scan.prediction,
        "status": result["status"],
        "reason": result["reason"]
    }


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(Scan).order_by(Scan.id.desc()).all()


@router.delete("/history")
def clear_history(db: Session = Depends(get_db)):
    db.query(Scan).delete()
    db.commit()

    return {
        "message": "History cleared successfully."
    }