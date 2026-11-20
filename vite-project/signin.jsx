import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const[error,seterror]   =  useState('');
const {formData,setformData} = useState({ email: '', password: ''})

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
 try {
      const res = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token)
  if (res.data.role === 'customer') {
    navigate('/');

 }
 else{
    navigate('/admin')
 }}
 catch(err){
 setError(err.response?.data?.message || 'Login failed');
 }



  }

  return (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f4f6f9' }}>
      <div className="card shadow-lg border-0" style={{ width: '400px', borderRadius: '16px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-1 fw-bold" style={{ color: '#1F4E5F' }}>Welcome Back</h3>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>
            Login to your account
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-semibold"
              style={{ backgroundColor: '#1F4E5F', borderRadius: '8px', padding: '10px' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
