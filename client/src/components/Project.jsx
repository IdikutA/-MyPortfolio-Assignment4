import mediademo from '../assets/mediademo.png';
import dashboard from '../assets/dashboard.png';
import messagingApp from '../assets/messaging_app.png';
import sql from '../assets/sql.png';
import uyghurKebab from '../assets/uyghurkebabhouse.png';
import { useEffect, useState } from 'react';
import apiRequest from '../api/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest('/api/projects');
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ marginBottom: '30px' }}>Projects</h1>
      <br />
      {}

      <h2>Projects from MongoDB</h2>

      {loading && <p>Loading projects...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p>No projects found in the database.</p>
      )}

      {!loading && !error && projects.map((project) => (
        <div key={project._id} style={{ marginBottom: '20px' }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>
            Created by: {project.firstName} {project.lastName}
          </p>
        </div>
      ))}

      
      <h2>JavaFX Media Demo</h2>
      <p>
        I have developed a JavaFX application using Java, as shown below. This application uses the
        Media, MediaPlayer, and MediaView classes, along with event handling, to offer an interactive
        audio and video experience.
      </p>
      <br />
      <img
        src={mediademo}
        width="320"
        height="180"
        alt="JavaFX Media Demo"
        style={{ borderRadius: '8px', marginBottom: '40px' }}
      />

      {}
      <h2>Full-Stack Assessment Showcase: Cross-Platform Messaging Ecosystem</h2>
      <p>
        Engineered a dual-platform communication system featuring a native Flutter mobile messaging
        application integrated with an Angular and Tailwind CSS internal tools dashboard. The web
        dashboard is embedded dynamically within the mobile client via an optimized WebView layer and
        served over a local HTTP engine. This project demonstrates high proficiency in hybrid
        application architectures, cross-framework message parsing, state management, and responsive
        dashboard design.
      </p>
      <br />
      <div
      style={{
            display: 'flex',
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          <img
            src={dashboard}
            width="320"
            height="180"
            alt="Dashboard"
            style={{ borderRadius: '8px', display: 'block' }}
          />
          <img
            src={messagingApp}
            width="320"
            height="180"
            alt="Flutter Messaging App"
            style={{ borderRadius: '8px', display: 'block' }}
          />
     </div>

      <p>
        For details,{' '}
        <a
          href="https://github.com/IdikutA/flutter-messaging-dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>.
      </p>
      <br />
      {}
      <h2>College Database</h2>
      <p>
        As an introduction to data modelling, I created a database intended for the administration of
        student and residence information within an educational institution, such as a college or
        university.
      </p>
      <p>Using this design, I built the database through Microsoft SQL Server.</p>
      <br />
      <img
        src={sql}
        width="320"
        height="180"
        alt="SQL Diagram"
        style={{ borderRadius: '8px', marginBottom: '40px' }}
      />
      {}
      <h2>Uyghur Kebab House</h2>
      <p>
        I have developed, using HTML, CSS, and JavaScript, a website designed to serve a specific
        purpose and provide a user-friendly experience. Through the combination of HTML for
        structuring content, CSS for styling, and JavaScript for interactive enhancements, I aimed to
        create a seamless, dynamic, and visually appealing web presence using Visual Studio.
      </p>
      <br />
      <img
        src={uyghurKebab}
        width="320"
        height="180"
        alt="Uyghur Kebab House"
        style={{ borderRadius: '8px', marginBottom: '10px' }}
      />
      <p>
        To visit the website,{' '}
        <a
          href="http://studentweb.cencol.ca/sabulizi/Assignment6S/home.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>.
      </p>
    </div>
  );
}
