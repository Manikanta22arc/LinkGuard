import "./HowItWorks.css";

const steps = [
  {
    title: "Visit a Website",
    desc: "Open any website normally through your browser."
  },
  {
    title: "Automatic Scan",
    desc: "LinkGuard analyzes the URL before allowing access."
  },
  {
    title: "Threat Detection",
    desc: "Known phishing and suspicious websites are identified instantly."
  },
  {
    title: "Protection",
    desc: "Dangerous websites are blocked with a security warning page."
  }
];

export default function HowItWorks() {
  return (
    <section className="how" id="how">

      <div className="section-title">

        <span>WORKFLOW</span>

        <h2>How LinkGuard  Works</h2>

      </div>

      <div className="timeline">

        {steps.map((step, index) => (

          <div className="step" key={index}>

            <div className="number">
              {index + 1}
            </div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}