import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div>

          <h2>LinkGuard </h2>

          <p>

            Professional browser protection against phishing,
            fake login pages and malicious websites.

          </p>

        </div>

        <div className="footer-links">

          <a href="#features">Features</a>

          <a href="#how">How it Works</a>

          <a href="#download">Download</a>

        </div>

      </div>

      <hr />

      <div className="copyright">

        © 2026 LinkGuard . All Rights Reserved.

      </div>

    </footer>
  );
}