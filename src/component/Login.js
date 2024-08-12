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
  const [data, setData] = useState('');
  const [userId, setUserId] = useState(0); // added userId state
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
      const response = await axios.get(`http://localhost:8080/api/user/username/${username}`)
      console.log(response.data.password);

      if(username === response.data.username && password === response.data.password ){
        // alert("Hi BABY")
        localStorage.setItem('role',response.data.role);
        localStorage.setItem('username',response.data.username);

        if(response.data.role === "Admin"){
          localStorage.setItem('userId', response.data.userID);
          navigate("/dashbord")
          // alert("Its You Admin")
        }

        if(response.data.role === "Staff"){
          localStorage.setItem('userId', response.data.userID);
          navigate("/staffdash")
          // alert("Its You Staff")
        }

        if(response.data.role === "Customer" ){
          localStorage.setItem('userId', response.data.userID);
          navigate("/customeDashbord")
          // alert("Its You Customer")
        }
      }else{
        alert("Incorect username or password")
      }
      




      

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

      Don't have account:<button type="button" className="btn btn-outline-primary ms-2"><a onClick={handleAddButton}>SIGN-UP</a></button>

      <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose} />
    </div>
  );
};

export default Login;