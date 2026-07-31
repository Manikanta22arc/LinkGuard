from urllib.parse import urlparse

BLACKLIST = {
    "paypal-login-security-update.tk",
    "google-login-security.cf",
    "facebook-login.ga",
    "microsoft-account.ml",
    "apple-id-confirm.tk",
    "amazon-security.gq",
    "bank-verification.xyz",
    "secure-paypal-login.tk",
}


def is_blacklisted(url):
    try:
        domain = urlparse(url).netloc.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        return domain in BLACKLIST

    except:
        return False