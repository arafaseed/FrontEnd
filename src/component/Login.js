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
      localStorage.setItem('userID', data.userID)

      setUserId(data.userID); // update userId state

      const userID = data.userID;
      // console.log(userID);

      // Make API call to second API with userId
      axios.get(`http://localhost:8080/customer/userId/${userID}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          localStorage.setItem('customerId', response.data.cust_id);
          // console.log(response.data.Cust_id);
        })

      // Redirect to the desired page after successful login
      // navigate('/dashbord');

      if (data.role === 'Admin') {
        navigate('/dashbord')
      }

      if (data.role === 'Staff') {
        navigate('/staffdash')
      }

      if (data.role === 'Customer') {
        navigate('/customeDashbord')
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

      Don't have account:<a className='arafa' onClick={handleAddButton}>SIGN-UP</a>

      <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose} />
    </div>
  );
};

export default Login;