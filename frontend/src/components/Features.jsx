import "./Features.css";

const features = [
  {
    title: "Real-Time Protection",
    desc: "Scans websites before they load and blocks malicious pages instantly."
  },
  {
    title: "Trusted Domain Verification",
    desc: "Recognizes verified domains and prevents unnecessary warnings."
  },
  {
    title: "Phishing Detection",
    desc: "Detects fake login pages, suspicious URLs and deceptive domains."
  },
  {
    title: "Privacy First",
    desc: "No browsing history is sold or shared. Your privacy remains protected."
  },
  {
    title: "Browser Extension",
    desc: "Works directly inside your browser without interrupting your workflow."
  },
  {
    title: "AI Analysis",
    desc: "Provides concise security insights for suspicious websites."
  }
];

export default function Features() {
  return (
    <section className="features" id="features">

      <div className="section-title">

        <span>FEATURES</span>

        <h2>Enterprise Security Features</h2>

        <p>
          Built for secure everyday browsing with professional-grade protection.
        </p>

      </div>

      <div className="feature-grid">

        {features.map((item, index) => (

          <div className="feature-card" key={index}>

            <div className="icon">

              {index + 1}

            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}