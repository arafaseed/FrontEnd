import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Admin/Navigation.';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button } from 'react-bootstrap';

export const PopStaffForm = ({ showModal, handleModalClose }) => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
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
      role: "Staff",
      status: "ACTIVE"
    };
    const staffRequest = {
      name: name,
      gender: gender,
      phone: phone,
      userId: 0,
      address: address
    };
    const requestData = {
      loginRequest,
      staffRequest
    };
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/addStaff', requestData)
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
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          
          </form>
      </Modal.Body>
      <Modal.Footer>
      <div className="d-flex justify-content-between">
        <Button  variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      
    <Button variant="primary" onClick={(e) => {
      handleSubmits(e);
      handleModalClose();
    }}>
      Save
    </Button>
        </div> 
      </Modal.Footer>
    </Modal>
  );
};

export default PopStaffForm;
