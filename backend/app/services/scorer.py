from urllib.parse import urlparse
import re

SUSPICIOUS_TLDS = {
    "tk",
    "ml",
    "ga",
    "cf",
    "gq",
    "xyz",
    "top",
    "zip",
    "click",
    "work",
}

SHORTENERS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "ow.ly",
    "buff.ly",
    "cutt.ly",
    "is.gd",
}

KEYWORDS = {
    "login",
    "signin",
    "verify",
    "verification",
    "secure",
    "account",
    "password",
    "bank",
    "paypal",
    "wallet",
    "update",
    "payment",
    "confirm",
    "recover",
    "crypto",
}

