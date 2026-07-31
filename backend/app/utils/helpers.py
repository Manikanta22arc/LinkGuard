from urllib.parse import urlparse


def extract_features(url: str):

    parsed = urlparse(url)

    domain = parsed.netloc

    features = [

        len(url),

        url.count("."),

        url.count("-"),

        url.count("@"),

        int("https" in url),

        len(domain),

    ]

    return features