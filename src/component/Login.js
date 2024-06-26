import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      // Store the role name and username in the local storage
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);

      // Redirect to the desired page after successful login
      navigate('/dashbord');
    } catch (error) {
      setError('Invalid username or password');
      console.error('login error', error);
    }
  };

  return (
    <div className="containe">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" />
        </div>
        {error && <p>{error}</p>}
      </form>
     
      <div>Don't have account:<Link to="/addCustomer">Sign-up</Link></div>
      
    </div>
  );
};

export default Login;
