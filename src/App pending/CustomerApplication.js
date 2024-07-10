import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export const PopFormLic = ({ showModal, handleModalClose }) => {
  const [licId, setLicId] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [bType, setBType] = useState('');
  const [owner, setOwner] = useState('');
  const [controlNumber, setControlNumber] = useState(null);
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

  const handleGenerateControlNumber = () => {
    if (controlNumber === null) {
      setControlNumber(2408769878);
    } else {
      setControlNumber(controlNumber + 1);
    }
    setIsButtonDisabled(true);
  };

  const handleSubmits = (event) => {
    event.preventDefault();
    const requestData = {
      lic_id: licId,
      amount: amount,
      name: name,
      date: date,
      location: location,
      lddress: address,
      b_Type: bType,
      owner: owner,
      controlNumber: controlNumber
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
        <Modal.Title>Apply for License</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmits}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">License ID</label>
              <input type="text" 
               value={licId} onChange={(e) => setLicId(e.target.value)}
               className="form-control" 
               placeholder="Enter License ID" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount</label>
              <input type="text" 
              value={amount} onChange={(e) => setAmount(e.target.value)} 
              className="form-control" 
              placeholder="Enter Amount" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" 
              value={name} onChange={(e) => setName(e.target.value)} 
              className="form-control" placeholder="Enter Name" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input type="date" value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <button type="button"
               className="fa fa-location" 
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
              onChange={(e) => setAddress(e.target.value)} className="form-control" 
              placeholder="Enter Address" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <input type="text" 
              value={bType} 
              onChange={(e) => setBType(e.target.value)} 
              className="form-control" 
              placeholder="Enter Business Type" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Owner</label>
              <input type="text" 
              value={owner} 
              onChange={(e) => setOwner(e.target.value)} 
              className="form-control" 
              placeholder="Enter Owner's Name" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGenerateControlNumber}
                disabled={isButtonDisabled}>
                Generate Control Number
              </button>
              {controlNumber && (
                <div>
                  <p>Control Number: {controlNumber}</p>
                </div>
              )}
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

export default PopFormLic;
