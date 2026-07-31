from urllib.parse import urlparse

SUSPICIOUS_TLDS = {
    "tk",
    "ml",
    "ga",
    "cf",
    "gq",
    "xyz",
    "top",
    "click",
    "work",
    "zip",
    "country",
    "rest",
    "fit",
    "buzz",
    "monster",
    "cam",
    "support",
    "live",
    "today"
}
KEYWORDS = [
    "login",
    "signin",
    "verify",
    "secure",
    "update",
    "confirm",
    "account",
    "bank",
    "wallet",
    "paypal",
    "password",
    "invoice",
    "gift",
    "crypto",
    "payment",
    "support"
]
SUSPICIOUS_TLDS = {
    "tk",
    "ml",
    "ga",
    "cf",
    "gq",
    "xyz",
    "top",
    "click",
    "work",
    "zip",
    "live"
}
SHORTENERS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "is.gd",
    "cutt.ly",
    "rb.gy",
    "ow.ly"
}
POPULAR_DOMAINS = [
    "google.com",
    "amazon.com",
    "paypal.com",
    "microsoft.com",
    "github.com",
    "apple.com",
    "facebook.com",
    "linkedin.com",
    "instagram.com"
]

def check_tld(url):
    domain = urlparse(url).netloc.lower()

    if "." not in domain:
        return False

    tld = domain.split(".")[-1]

    return tld in SUSPICIOUS_TLDS
from urllib.parse import urlparse

SHORTENERS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "cutt.ly",
    "is.gd",
    "rb.gy",
    "ow.ly",
    "buff.ly",
    "rebrand.ly",
    "shorturl.at"
}


def check_shortener(url):
    domain = urlparse(url).netloc.lower()

    if domain.startswith("www."):
        domain = domain[4:]

    return domain in SHORTENERS
from urllib.parse import urlparse
import ipaddress


def check_ip(url):
    host = urlparse(url).hostname

    if not host:
        return False

    try:
        ipaddress.ip_address(host)
        return True
    except ValueError:
        return False
    KEYWORDS = [
    "login",
    "signin",
    "verify",
    "secure",
    "update",
    "confirm",
    "wallet",
    "bank",
    "paypal",
    "account",
    "password",
    "invoice",
    "gift",
    "crypto"
]


def keyword_hits(url):
    url = url.lower()

    hits = []

    for word in KEYWORDS:
        if word in url:
            hits.append(word)

    return hits
from urllib.parse import urlparse


def insecure_http(url):
    parsed = urlparse(url)

    if parsed.scheme == "http":
        return True

    return False
    from urllib.parse import urlparse


def unicode_domain(url):
    host = urlparse(url).hostname

    if not host:
        return False

    try:
        host.encode("ascii")
        return False
    except UnicodeEncodeError:
        return True
        from urllib.parse import urlparse
from difflib import SequenceMatcher

POPULAR = [
    "google.com",
    "paypal.com",
    "amazon.com",
    "facebook.com",
    "microsoft.com",
    "apple.com",
    "github.com",
    "linkedin.com",
    "instagram.com",
    "netflix.com"
]


def typo_domain(url):

    host = urlparse(url).hostname

    if not host:
        return False

    host = host.lower()

    if host.startswith("www."):
        host = host[4:]

    for domain in POPULAR:

        ratio = SequenceMatcher(
            None,
            host,
            domain
        ).ratio()

        if ratio > 0.82 and host != domain:
            return True

    return False