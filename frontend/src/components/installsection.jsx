import "./Download.css";

export default function Download() {
  return (
    <section className="download" id="download">

      <div className="download-card">

        <span>DOWNLOAD</span>

        <h2>Protect Your Browser Today</h2>

        <p>
          Install LinkGuard  and automatically block phishing websites,
          malicious domains and fake login pages before they load.
        </p>

        <div className="download-buttons">
<a
  href="/downloads/LinkGuard-extension.zip"
  download
  className="install-btn"
>
  Install Extension
</a>
          <button
            className="github-btn"
            onClick={() =>
              window.open("https://github.com/")
            }
          >
            GitHub
          </button>

        </div>

      </div>

    </section>
  );
}