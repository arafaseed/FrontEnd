import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopFormCust from './Customer/PopFormCust';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddButton = () => {
    setShowModal(true); 
  }
  const handleAddModalClose = () => {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/user/username/${username}`, {
        params: {
          password: password 
        }
      })
      
        const user = response.data;

        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.userID);

        if(user.role === "Admin"){
          navigate("/dashbord")
        }

        if(user.role === "Staff"){
          navigate("/staffdash")
        }

        if(user.role === "Customer" ){
          navigate("/customeDashbord")
        }
      }catch (error) {
      setError('Invalid username or password');
      console.error('login error', error);
    }

  };

    
  const handlePassword = (licence_id) => {
    navigate(`/fogetPassword`);
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

      Don't have account:<button type="button" className="btn btn-outline-primary ms-2"><a onClick={handleAddButton}>SIGN-UP</a></button><br/><br/>
      Foget Password:<button type="button" className="btn btn-outline-primary ms-2"><a onClick={handlePassword}>Reset</a></button>

      <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose} />
    </div>
  );
};

export default Login;