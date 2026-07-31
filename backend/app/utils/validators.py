from urllib.parse import urlparse


def valid_url(url):

    try:
        parsed = urlparse(url)

        return bool(parsed.scheme) and bool(parsed.netloc)

    except:
        return False    