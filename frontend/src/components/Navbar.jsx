  import "./Navbar.css";

  export default function Navbar() {
    return (
      <nav className="navbar">

        <div className="logo">

          <div className="logo-box">
            LG
          </div>

          <div>

            <h2>LinkGuard </h2>

            <span>Browser Protection</span>

          </div>

        </div>

        <div className="nav-links">

          <a href="#features">Features</a>

          <a href="#how">How it Works</a>

          <a href="#download">Download</a>

        </div>

      </nav>
    );
  }