import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          Enterprise Browser Security
        </span>

        <h1>
          Browse the Web with
          <br />
          Confidence.
        </h1>

        <p>
          LinkGuard  protects you from phishing, fake login pages,
          malicious domains and suspicious websites before they load.
        </p>

        <div className="hero-buttons">

          <a
            href="#download"
            className="primary-btn"
          >
            Download Extension
          </a>

          <a
            href="#features"
            className="secondary-btn"
          >
            Learn More
          </a>

        </div>

        <div className="hero-info">

          <div>
            <h3>Real-Time</h3>
            <span>URL Protection</span>
          </div>

          <div>
            <h3>Fast</h3>
            <span>Instant Detection</span>
          </div>

          <div>
            <h3>Privacy</h3>
            <span>No Data Selling</span>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <div className="security-card">

          <div className="status safe">

            ✓ Protected

          </div>

          <h3>
            Current Website
          </h3>

          <p>
            github.com
          </p>

          <hr />

          <div className="details">

            <div>

              Status

              <strong>Safe</strong>

            </div>

            <div>

              Protection

              <strong>Active</strong>

            </div>

            <div>

              Threats

              <strong>0 Detected</strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}