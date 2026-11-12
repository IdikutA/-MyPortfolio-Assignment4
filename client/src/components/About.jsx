import portrait from '../assets/portrait.png';

export default function About() {
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Who I Am</h1>
        <img
          src={portrait}
          alt="Portrait of Shataer Abulizi"
          style={{
            width: '250px',
            height: '200px',
            borderRadius: '50%', // makes the image elliptical
            objectFit: 'cover',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            display: 'block',
            margin: '0 auto 25px', // centers the image and adds spacing below
          }}
        />
      </div>

      <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
        <p>
          I'm a results-driven and intellectually curious professional with a strong foundation in
          software engineering and systems thinking. Skilled at analyzing complex scenarios,
          identifying inconsistencies, and defining clear evaluation standards. Experienced in both
          technical and business contexts, I combine logical problem-solving with attention to detail
          and client-focused delivery. Multilingual and adaptable, I thrive in diverse environments
          and contribute to innovative AI and technology projects.
        </p>

        <p>
          Currently pursuing the <strong>Software Engineering Technology - Artificial Intelligence</strong> program at
          <strong> Centennial College</strong>, I continue to expand my technical expertise and collaborative skills.
          Fluent in Uyghur, Chinese, Arabic, Turkish, Uzbek, and English, I embrace diversity and aim
          to bridge cultural gaps through technology.
        </p>

        <p>
          Welcome to my personal webpage, where I share my passion for web and application
          development, business, and creating seamless digital experiences. Explore my portfolio and
          join me on a journey of innovation.
        </p>

        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          <a
            href="/Resume_Abulizi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'navy',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Download My Résumé (PDF)
          </a>
        </p>
      </div>
    </div>
  );
}
