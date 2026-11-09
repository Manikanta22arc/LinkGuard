
from urllib.parse import urlparse

TRUSTED_DOMAINS = {
    "google.com",
    "github.com",
    "microsoft.com",
    "apple.com",
    "amazon.com",
    "amazon.in",
    "youtube.com",
    "linkedin.com",
    "facebook.com",
    "instagram.com",
    "x.com",
    "twitter.com",
    "paypal.com",
    "razorpay.com",
    "phonepe.com",
    "paytm.com",
    "chatgpt.com",
    "openai.com",
    "stackoverflow.com",
    "python.org",
    "mozilla.org",
    "cloudflare.com",
    "oracle.com",
    "ibm.com",
    "amazonaws.com",
    "azure.microsoft.com",
    "mongodb.com",
    "postgresql.org",
    "fastapi.tiangolo.com",
    "vercel.com",
    "render.com",
    "railway.app",
}


def is_trusted(url):
    try:
        parsed = urlparse(url)

        host = parsed.hostname

        if not host:
            return False

        host = host.lower().rstrip(".")

        # Normalize international domain names
        host = host.encode("idna").decode("ascii")

        for trusted in TRUSTED_DOMAINS:
            if host == trusted or host.endswith("." + trusted):
                return True

        return False

    except (ValueError, UnicodeError):
        return False
