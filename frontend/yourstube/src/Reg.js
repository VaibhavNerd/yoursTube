// Reg.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './Reg.css';

function Reg() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    coverImage: null,
    avatar: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post('http://localhost:8000/api/v1/users/register', formDataToSend);

      console.log('Registration successful');
      // Redirect or display success message
    } catch (error) {
      console.error('Registration error:', error);
      // Display error message
    }
  };

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
        </div>
        <div className="button-container">
          <button type="submit">Register</button>
          <button type="button" onClick={handleLoginClick}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Reg;
