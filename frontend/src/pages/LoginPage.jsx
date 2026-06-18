import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(email, password, role);
    if (res.success) {
      if (role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submitHandler}>
          <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="role" 
                value="Customer" 
                checked={role === 'Customer'} 
                onChange={(e) => setRole(e.target.value)} 
              />
              Customer
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="role" 
                value="Admin" 
                checked={role === 'Admin'} 
                onChange={(e) => setRole(e.target.value)} 
              />
              Admin
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem', padding: '0.75rem' }}>
            SIGN IN
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          New User? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
