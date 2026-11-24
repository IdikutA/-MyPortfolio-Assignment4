import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Layout() {

  const [role, setRole] = useState(
    sessionStorage.getItem('role') || ''
  );

  useEffect(() => {
    const updateAuth = () => {
      setRole(sessionStorage.getItem('role') || '');
    };

    window.addEventListener('authChange', updateAuth);

    return () => {
      window.removeEventListener('authChange', updateAuth);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      {}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: '60px', objectFit: 'contain', marginRight: '20px' }}
        />
      
        <Link to="/" className="nav-link /*to apply CSS styles- Shater Abulizi*/"> 
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/education" className="nav-link">
          Education
        </Link>
        <Link to="/project" className="nav-link">
          Project
        </Link>
        <Link to="/services" className="nav-link">
          Services
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
       {/* {!role && (
          <Link to="/signin" className="nav-link">
            Sign In
          </Link>
        )} */}
        <Link to="/signin" className="nav-link">
          {role ? 'My Account' : 'Sign In'}
        </Link>
        {role === 'admin' && (
          <Link to="/admin" className="nav-link">
            Admin Dashboard
          </Link>
        )}
      </nav>  
         
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>

      {}
     
      <footer  /* Footer section with copyright information- Shater Abulizi */
        style={{
          textAlign: 'center', 
          paddingTop: '15px',
          paddingBottom: '30px',
          borderTop: '1px solid #ccc',
          marginTop: 'auto',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <p>&copy; {new Date().getFullYear()} - Shataer Abulizi</p>
      </footer>
    </div>
  );
}
