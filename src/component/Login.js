import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopFormCust from './Customer/PopFormCust';
import logo  from '../Asset/smz.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddButton = () => {
    setShowModal(true);
  };

  const handleAddModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/user/username/${username}`, {
        params: {
          password: password,
        },
      });

      const user = response.data;

      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.userID);

      if (user.role === 'Admin') {
        alert("Login successfully");
        navigate('/dashbord');
        
      } else if (user.role === 'Staff') {
        alert("Login successfully");
        navigate('/staffdash');
        
      } else if (user.role === 'Customer') {
        alert("Login successfully");
        navigate('/customeDashbord');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('login error', error);
    }
  };
  const location = useLocation();
  useEffect(()  =>{
    if (location.pathname ==='/'){
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      
    }
  },[location]);

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  return (
    <div className="containe">
      <div className="login-form">
      <p>
          <img src={logo} style={{ width: '200px', height: '150px', marginLeft: 'auto',marginRight: 'auto',display: 'block' }} alt="logo" />
      </p>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className="links">
          <p>
            Don't have an account? <button type="button" className="btn btn-link" onClick={handleAddButton}>Sign Up</button>
          </p>
          <p>
            Forgot password? <button type="button" className="btn btn-link" onClick={handleForgotPassword}>Reset</button>
          </p>
        </div>
      </div>
      {showModal && <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose} />}
    </div>
  );
};

export default Login;