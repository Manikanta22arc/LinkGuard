import {
  FaShieldAlt,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaBolt,
  FaLock,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaMinus,
  FaRobot,
  FaGlobe,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaChrome,
  FaFirefox,
  FaEdge,
  FaSafari,
  FaChevronDown,
} from "react-icons/fa";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const SCAN_STEPS = [
  "Resolving domain",
  "Checking SSL certificate",
  "Analyzing redirect chain",
  "Matching threat signatures",
  "Running ML classification",
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);


  const handleScan = async () => {
  if (!url.trim() || scanning) return;

  setResult(null);
  setScanStep(0);
  setScanning(true);
try {

  const response = await axios.post(
  "http://127.0.0.1:8000/scan/",
  {
    url: url.trim()
  },
  {
    headers:{
      "Content-Type":"application/json"
    }
  }
);


    const data = response.data;
console.log("BACKEND RESPONSE:", data); 
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setScanStep(i + 1);
    }

   const isSafe = data.prediction.toLowerCase() === "benign";

setResult({
  safe: data.prediction === "Safe",
  score: data.confidence,
  prediction: data.prediction,
  explanation:
    data.prediction === "Safe"
      ? "This URL appears safe based on machine learning analysis."
      : "Warning! This website appears malicious or suspicious."
});
  } catch (err) {
    console.error(err);
    alert("Backend connection failed");
  } finally {
    setScanning(false);
  }
};

  
    const features = [  
  {
    title: "Threat Detection",
    icon: <FaRobot />,
    desc: "Machine learning detects phishing, malware, defacement and suspicious URLs in real time."
  },
  {
    title: "Browser Protection",
    icon: <FaShieldAlt />,
    desc: "Blocks dangerous websites before they load inside your browser."
  },
  {
    title: "Instant Scan",
    icon: <FaBolt />,
    desc: "Analyze any URL in under one second ."
  },
  {
    title: "Privacy First",
    icon: <FaLock />,
    desc: "No browsing history is stored. Every scan remains private."
  },
  {
    title: "Threat Intelligence",
    icon: <FaSearch />,
    desc: "Detect phishing, malware, fake login pages and suspicious redirects."
  },
  {
    title: "Enterprise Ready",
    icon: <FaGlobe />,
    desc: "Designed for students, professionals and enterprise security teams."
  }
];
  

  const steps = [
    { n: "01", title: "Install the extension", desc: "One click, no signup required. Works instantly on Chrome, Edge and Brave." },
    { n: "02", title: "Browse normally", desc: "LinkGuard runs silently in the background with zero impact on page load speed." },
    { n: "03", title: "Get instant alerts", desc: "A clear warning appears before any phishing or malicious page finishes loading." },
  ];

  const comparison = [
    { label: "Real-time scanning", us: true, av: "partial", browser: false },
    { label: "ML-based detection", us: true, av: false, browser: false },
    { label: "Zero data logging", us: true, av: false, browser: "partial" },
    { label: "Blocks before render", us: true, av: "partial", browser: "partial" },
    { label: "Free for individuals", us: true, av: false, browser: true },
  ];

  const roadmap = [
    { phase: "Now", title: "Core protection", desc: "Real-time URL scanning, phishing pattern detection and Chromium browser support." },
    { phase: "Next", title: "Wider coverage", desc: "Firefox and Safari support, on-device model updates and a community threat-reporting feed." },
    { phase: "Later", title: "For teams", desc: "Shared dashboards, API access for developers and policy controls for organizations." },
  ];

  const faqs = [
    { q: "Does LinkGuard  store the sites I visit?", a: "No. URLs are scored using on-device heuristics first; nothing about your browsing history is logged, stored, or shared with third parties." },
    { q: "Which browsers are supported?", a: "Chrome, Edge, Brave and any other Chromium-based browser today, with Firefox and Safari in active development." },
    { q: "Will it slow down my browsing?", a: "Scans complete in well under a second and run asynchronously, so page loads are never blocked or delayed." },
    { q: "Is it really free?", a: "Yes, core protection is free forever for individual users. No credit card or account required to install." },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="home">
        <div className="noise-overlay" />

        {/* NAVBAR */}
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="logo">
            <FaShieldAlt />
            <span>LinkGuard </span>
          </div>

          <div className={`menu ${menuOpen ? "open" : ""}`}>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#compare" onClick={() => setMenuOpen(false)}>Compare</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          </div>

          <div className="nav-actions">
            <button className="nav-cta">Install Free</button>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* HERO */}
<section className="hero">

<div className="hero-bg-circle one"></div>
<div className="hero-bg-circle two"></div>
<div className="hero-bg-circle three"></div>

<div className="hero-grid">

<motion.div
className="hero-copy"
variants={stagger}
initial="hidden"
animate="show"
>

<motion.div
variants={fadeUp}
className="hero-badge"
>
<FaShieldAlt />
<span> Cybersecurity Protection</span>
</motion.div>

<motion.h1 variants={fadeUp} className="hero-title">
  Advanced
  <br />
  <span className="gradient-text">
    Cybersecurity Protection
  </span>
  <br />
  For Every Click.
</motion.h1>

<motion.p variants={fadeUp} className="hero-description">
  LinkGuard protects you against phishing, malware, fake login
  pages, scam websites and malicious URLs using real-time Machine
  Learning analysis before a website is opened.
</motion.p>

<motion.div variants={fadeUp} className="hero-stats">

  <div className="stat-box">
      <h2>600K+</h2>
      <span>URLs Trained</span>
  </div>

  <div className="stat-box">
      <h2>99%</h2>
      <span>Detection Rate</span>
  </div>

  <div className="stat-box">
      <h2>&lt;1s</h2>
      <span>Scan Time</span>
  </div>

</motion.div>

<motion.div
variants={fadeUp}
className="hero-buttons"
>

<button className="primary">

Install Extension

<FaArrowRight/>

</button>

<button className="secondary">

Live Demo

</button>

</motion.div>

<motion.div
variants={fadeUp}
className="hero-stats"
>

<div>

<h2>98.7%</h2>

<span>Detection Accuracy</span>

</div>

<div>

<h2>0.4s</h2>

<span>Average Scan</span>

</div>

<div>

<h2>24/7</h2>

<span>Protection</span>

</div>

</motion.div>

<div className="browser-row">

<div>

<FaChrome/>

Chrome

</div>

<div>

<FaFirefox/>

Firefox

</div>

<div>

<FaEdge/>

Edge

</div>

<div>

<FaSafari/>

Safari

</div>

</div>

</motion.div>

<motion.div

className="terminal-card"

initial={{opacity:0,x:60}}

animate={{opacity:1,x:0}}

transition={{duration:0.8}}

>

<div className="terminal-header">

<div className="terminal-left">

<span className="dot red"></span>

<span className="dot yellow"></span>

<span className="dot green"></span>

</div>

<div className="terminal-title">

 Threat Scanner

</div>

</div>

<div className="terminal-input-row">

<span>$</span>

<input
type="text"
placeholder="https://example.com"
value={url}
onChange={(e)=>setUrl(e.target.value)}
onKeyDown={(e)=>e.key==="Enter" && handleScan()}
/>

<button
onClick={handleScan}
disabled={scanning}
>

{scanning ? "Scanning..." : "Scan"}

</button>

</div>

<div className="terminal-output">

{!scanning && !result && (

<p className="terminal-idle">

Paste any URL and let it analyze
its safety in real time.

</p>

)}

{scanning && (

<>

{SCAN_STEPS.map((step,index)=>(

<div
key={index}
className={`terminal-line ${index<=scanStep?"done":""}`}
>

{step}

</div>

))}

<div className="scan-progress">

<div
className="scan-progress-fill"
style={{
width:`${((scanStep+1)/SCAN_STEPS.length)*100}%`
}}
></div>

</div>

</>

)}

{result && !scanning && (

<div className="result-card">

<div
className={`terminal-verdict ${
result.safe?"safe":"danger"
}`}
>

{result.safe?

<FaCheckCircle/>

:

<FaTimesCircle/>

}

<h3>

{result.safe?

"Website Safe"

:

"Phishing Detected"

}

</h3>

</div>

<div className="confidence-box">

<div className="confidence-header">

<span>

Confidence

</span>

<span>

{result.score}%

</span>

</div>

<div className="confidence-bar">

<div

className={`confidence-fill ${
result.safe?"safe":"danger"
}`}

style={{
width:`${result.score}%`
}}

></div>

</div>

</div>

<div className="scan-summary">

<p>

<b> Verdict</b>

</p>

<p>

{result.explanation}

</p>

</div>

</div>

)}

</div>

</motion.div>

</div>

</section>

        {/* FEATURES - BENTO */}
        <motion.section
          id="features"
          className="features"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-heading">
            <span className="eyebrow">Capabilities</span>
            <h2>Everything a modern browser is missing.</h2>
          </motion.div>

          <div className="bento">
            {features.map((f) => (
              <motion.div
                className={`bento-card ${f.large ? "bento-large" : ""}`}
                key={f.title}
                variants={fadeUp}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section
          id="how"
          className="how"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-heading">
            <span className="eyebrow">Process</span>
            <h2>Protected in under 60 seconds.</h2>
          </motion.div>

          <div className="steps">
            {steps.map((s) => (
              <motion.div className="step" key={s.n} variants={fadeUp}>
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COMPARISON */}
        <motion.section
          id="compare"
          className="compare"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-heading">
            <span className="eyebrow">Comparison</span>
            <h2>How LinkGuard  compares.</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="compare-table">
            <div className="compare-row compare-head">
              <span>Feature</span>
              <span>LinkGuard </span>
              <span>Traditional Antivirus</span>
              <span>Browser Built-in</span>
            </div>
            {comparison.map((row) => (
              <div className="compare-row" key={row.label}>
                <span className="compare-label">{row.label}</span>
                <CompareCell value={row.us} highlight />
                <CompareCell value={row.av} />
                <CompareCell value={row.browser} />
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ROADMAP */}
        <motion.section
          className="roadmap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-heading">
            <span className="eyebrow">Roadmap</span>
            <h2>Where LinkGuard  is headed.</h2>
          </motion.div>

          <div className="roadmap-list">
            {roadmap.map((r) => (
              <motion.div className="roadmap-item" key={r.phase} variants={fadeUp}>
                <span className="roadmap-phase">{r.phase}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          id="faq"
          className="faq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions.</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <FaChevronDown className="faq-chevron" />
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="cta"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2>
Stay One Step Ahead of Cyber Threats
</h2>

<p>
LinkGuard uses Machine Learning to detect malicious websites before they can steal your credentials or infect your device.
</p>
          <button className="primary large">
            <span>Install Extension</span> <FaArrowRight />
          </button>
        </motion.section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <FaShieldAlt />
                <span>LinkGuard </span>
              </div>
              <p>-Intelligent phishing  protection against phishing, scam links and malicious websites.</p>
              <div className="socials">
                <a href="#" aria-label="GitHub"><FaGithub /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>

            <div className="footer-links">
              <div>
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#how">How It Works</a>
                <a href="#compare">Compare</a>
              </div>
              <div>
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
              </div>
              <div>
                <h4>Legal</h4>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} LinkGuard . Built for a safer web.</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

function CompareCell({ value, highlight }) {
  if (value === true) {
    return (
      <span className={`compare-cell yes ${highlight ? "highlight" : ""}`}>
        <FaCheckCircle />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="compare-cell partial">
        <FaMinus />
      </span>
    );
  }
  return (
    <span className="compare-cell no">
      <FaTimesCircle />
    </span>
  );
}

  export default Home;