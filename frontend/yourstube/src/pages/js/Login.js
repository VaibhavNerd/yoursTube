// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/css/Reg.css';

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
      withCredentials: true,
      credentials: 'include'
});
      // //  // Extract cookies from response headers
      //  const setCookieHeaders = response.headers['set-cookie'];
      // // console.log("ok",response.headers)
      //  if (setCookieHeaders) {
      //    // Parse each set-cookie header to extract cookie values
      //    setCookieHeaders.forEach(cookieHeader => {
      //      // Split each set-cookie header into individual cookie strings
      //      const cookies = cookieHeader.split(';');
      //      cookies.forEach(cookie => {
      //        // Trim any leading/trailing spaces
      //        const trimmedCookie = cookie.trim();
      //        // Extract the cookie name and value
      //        const [name, value] = trimmedCookie.split('=');
      //        console.log(name,value)
      //        // Save the cookie in the browser's cookie store
      //        document.cookie = `${name}=${value}; path=/;`;
      //      });
      //    });
      //  }
 console.log(response);
    // const responseJSON = JSON.parse(body);
    //const resData = await response.json();
    // const accessToken = response.data.accessToken;
    // const refreshToken = response.data.refreshToken;
    // document.cookie = `${accessToken}=${accessToken}; path=/;`;
    // document.cookie = `${refreshToken}=${refreshToken}; path=/;`;
    //  const { accessToken, refreshToken } = resData;
     // const claims = Buffer.from(authToken.split(".")[1], "base64").toString();
      // const responseHeaders = {
      //   "Content-Type": "application/json",
      //   "set-cookie": [
      //     `accessToken=${accessToken}; Path=/; `,
      //     `refreshToken=${refreshToken}; Path=/; `,
      //   ],
      // };
     // response.writeHead(200, responseHeaders);
      // res.end(claims);
      
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
