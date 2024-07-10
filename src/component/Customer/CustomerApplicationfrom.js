import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export const CustomerApplicationfrom = ({ showModal, handleModalClose }) => {
  const [licId, setLicId] = useState('');
  const [region, setregion] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [bType, setBType] = useState('');

  const userID = JSON.parse(localStorage.getItem('customerId'));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLocation('Unable to retrieve location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmits = (event) => {
    event.preventDefault();
    const requestData = {
      name: name,
      date: date,
      region: region,
      location: location,
      address: address,
      b_Type: bType,
      customer: {
        cust_id: userID,
      },
    };
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/addLicense', requestData)
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
        <Modal.Title>Apply for License userID {userID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmits}>
         
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Bussiness Name</label>
              <input type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-control" 
              placeholder="Enter Name of you bussiness" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <button type="button" className="fa fa-location" 
              onClick={handleGetLocation}></button>
              <input
                type="text"
                className="form-control"
                placeholder="Add location"
                value={location}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="form-control" 
              placeholder="Enter Address" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
            <label className="form-label">Bussiness Type</label>
                <select className="form-control" 
                value={bType} 
                onChange={(e) => setBType(e.target.value)} 
                 placeholder=" Select Bussiness Type" >
                  <option value="">Select Bussiness Type</option>
                  <option value="Enterprises">Enterprises</option>
                  <option value="Organization">Organization</option>
                  </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Select Region</label>
                <select className="form-control" 
                value={region} 
                onChange={(e) => setregion(e.target.value)} 
                 placeholder="Enter Owner's Name" >
                  <option value="">Select Region</option>
                  <option value="Mjini Magharibi Region">Mjini Magharibi Region</option>
                  <option value="North Unguja Region">North Unguja Region</option>
                  <option value="South Unguja Region">South Unguja Region</option>
                  <option value="North Pemba Region">North Pemba Region</option>
                  <option value="South Pemba Region">South Pemba Region</option>
                </select>
              </div>
           
          </div>
        
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => {
          handleSubmits(e);
          handleModalClose();
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerApplicationfrom;
