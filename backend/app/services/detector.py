from app.utils.validators import valid_url
from app.services.trusted import is_trusted
from app.services.blacklist import is_blacklisted


SUSPICIOUS_KEYWORDS = {
    "login",
    "verify",
    "secure",
    "update",
    "account",
    "bank",
    "paypal",
    "wallet",
    "signin",
    "confirm",
}


def detect_url(url: str):

    if not valid_url(url):
        return {
            "prediction": "Invalid",
            "status": "Rejected",
            "reason": "Invalid URL format."
        }

    if is_trusted(url):
        return {
            "prediction": "Safe",
            "status": "Allowed",
            "reason": "Trusted website."
        }

    if is_blacklisted(url):
        return {
            "prediction": "Phishing",
            "status": "Blocked",
            "reason": "Known phishing domain."
        }

    lower_url = url.lower()

    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in lower_url:
            return {
                "prediction": "Phishing",
                "status": "Blocked",
                "reason": f"Suspicious keyword detected ({keyword})."
            }

    return {
        "prediction": "Safe",
        "status": "Allowed",
        "reason": "No security threats detected."
    }