
import { useState } from 'react';
import apiRequest from '../api/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      setSuccess('Account created successfully!');
      setFormData({
        name: '',
        email: '',
        password: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Sign Up</h1>
      <br/>
   
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
       
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <label htmlFor="name" style={{ width: '100px', textAlign: 'left' }}>
                Name:
            </label>
            <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px' }}
            />
            </div>

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
                minLength="6"
                value={formData.password}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px' }}
            />
        </div>


        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
