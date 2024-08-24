import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export const PopFormCust = ({ showModal, handleModalClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [zan_Id, setzan_Id] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmits = async (event) => {
    event.preventDefault();
  
    if (!username || !name || !gender || !phone || !zan_Id || !address || !password) {
      alert("Please fill out all required fields.");
      return;
    }
  
    try {
      const usernameResponse = await axios.get(`http://localhost:8080/api/user/${username}`);
      if (usernameResponse.status === 200 && usernameResponse.data === "Username already exists") {
        alert("Username already exists. Please choose another username.");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If username does not exist (404), proceed to add the customer
        const customerData = {
          name: name,
          username: username,
          zan_Id: zan_Id,
          gender: gender,
          phone: phone,
          address: address,
          password: password,
          role: "Customer"
        };
  
        try {
          const response = await axios.post('http://localhost:8080/api/customer/addCustomer', customerData);
          console.log('Response:', response);
          console.log('Response data:', response.data);
          alert("Customer Created Successfully");
          
          handleModalClose();
        } catch (error) {
          console.error('Error adding customer:', error);
          alert("Something went wrong. Please try again.");
        }
      } else {
        console.error('Error checking username:', error);
        alert("Something went wrong while checking the username. Please try again.");
      }
    }
  };
  

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
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
              <label htmlFor="male">Male</label>
              <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="female">Female</label>
              <input type="radio" value="Female" name="gender" onChange={(e) => setGender(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Zanzibar ID</label>
              <input type="text" value={zan_Id} onChange={(e) => setzan_Id(e.target.value)} className="form-control" placeholder="Enter your Nationality" />
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
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => {
            handleSubmits(e);
          }}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PopFormCust;
