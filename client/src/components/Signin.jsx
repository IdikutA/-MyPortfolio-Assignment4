import { useState } from 'react';
import apiRequest from '../api/api';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState(sessionStorage.getItem('role') || '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await apiRequest('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      // Store authentication details for this browser tab
      sessionStorage.setItem('jwt', data.token);

    const userRole = data.role || data.user?.role;

    if (!userRole) {
    sessionStorage.removeItem('jwt');
    throw new Error('Sign-in response does not include a user role.');
    }

    sessionStorage.setItem('role', userRole);
    setRole(userRole);
    window.dispatchEvent(new Event('authChange'));

      setSuccess('Signed in successfully!');
      setFormData({ email: '', password: '' });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('role');
    window.dispatchEvent(new Event('authChange'));

    setRole('');
    setSuccess('');
    setError('');
    setFormData({ email: '', password: '' });
  };


  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>{role ? 'My Account' : 'Sign In'}</h1>
      <br/>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {!role ? (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor="email" style={{ width: '100px', textAlign: 'left' }}>
                Email:
            </label>
            <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px' }}
            />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor="password" style={{ width: '100px', textAlign: 'left' }}>
                Password:
            </label>
            <input
                id="password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px' }}
            />
            </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    

      ) : (
        <div>
          <p>
            You are signed in as: <strong>{role}</strong>
          </p>

          <button type="button" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
     

