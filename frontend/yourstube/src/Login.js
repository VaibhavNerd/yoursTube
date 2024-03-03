// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Reg.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, username, password } = formData;
      // Check which field has been provided and send that information in the request body
      const requestBody = { password }; // Password is always required
      if (email) {
        requestBody.email = email;
      } else if (username) {
        requestBody.username = username;
      }

    const response =   await axios.post('http://localhost:8000/api/v1/users/login', requestBody,{
      withCredntials: true,
      credentials: 'include'
});
        // Extract cookies from response headers
    // const cookies = response.headers['set-cookie'];

    // // Save cookies in the browser's cookie store
    // cookies.forEach(cookie => {
    //   document.cookie = cookie;
    // });
      console.log('Login successful');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <button type="button" onClick={handleRegisterClick}>Register</button>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
