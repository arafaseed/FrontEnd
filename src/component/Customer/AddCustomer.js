import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Admin/Navigation.';

export default function AddCustomer() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [zanId, setZanId] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmits = (event) => {
    event.preventDefault();
    const loginRequest = {
      userID: 0,
      username: username,
      password: password,
      role: "Customer",
      status: "ACTIVE"
    };
    const customerRequest = {
      name: name,
      zan_id: zanId,
      gender: gender,
      phone: phone,
      userId: 0,
      address: address
    };
    const requestData = {
      loginRequest,
      customerRequest
    };
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/AddCustomer', requestData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
        // navigate("/")
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  return (
    <div>
      <Header />
      <Navigation />
      <div className="main">
        <div className='content'>
          <h1>Customer registration  Form</h1>
          <form onSubmit={handleSubmits}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter your name" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter your username" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Gender: </label><br />
                <label for="male">Male</label>
                <input type="radio" value="Male" onChange={(e) => setGender(e.target.value)} />
                <label for="female">Female</label>
                <input type="radio" value="Female" onChange={(e) => setGender(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Zanzibar ID</label>
                <input type="text" value={zanId} onChange={(e) => setZanId(e.target.value)} className="form-control" placeholder="Enter your Nationality" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter your address" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter your phone number" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Save Record</button>
              <button type="submit" className="btn btn-danger">Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}