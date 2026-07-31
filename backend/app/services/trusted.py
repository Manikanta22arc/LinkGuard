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
    "aws.amazon.com",
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
        domain = urlparse(url).netloc.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        for trusted in TRUSTED_DOMAINS:
            if domain == trusted or domain.endswith("." + trusted):
                return True

        return False

    except:
        return False