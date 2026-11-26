import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to My Professional Portfolio</h1>
      <br />
      <br />
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        I'm a website, application, and software developer who enjoys building
        clean, functional, and user-focused digital experiences.
      </p>

      <p style={{ marginTop: "10px" }}>
        My mission is simple: create modern, reliable, and efficient solutions
        that help people and businesses achieve more.
      </p>
      <p style={{ marginTop: "10px" }}>
        Explore my projects in full-stack web development, software
        engineering, and artificial intelligence.
      </p>
      <br />
      <br />
      <Link
        to="/about"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 18px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Learn More About Me
      </Link>
    </div>
  );
}

