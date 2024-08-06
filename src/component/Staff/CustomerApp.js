import React, { useState } from 'react';
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';

export const CustomerApp = ({ showModal, handleModalClose }) => {

  const [location, setLocation] = useState('');
  const [controlNumber, setControlNumber] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>CustomerApplication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
      <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Enter your application name" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input type="text" className="form-control" placeholder="Enter the date" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <button type="button" className="fa fa-location" onClick={handleGetLocation}></button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add location"
                  value={location}
                  readOnly
                />              
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">                
                <button
                  type="button"
                  className="btn btn"
                  onClick={handleGenerateControlNumber}
                  disabled={isButtonDisabled}>
                  Generate control number
                </button>
                {controlNumber && (
                  <div>
                    <p>Control Number: {controlNumber}</p>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="d-flex justify-content-between">
              <Link to="/applicationList">
                <button type="submit" className="btn btn-primary">Save Record</button>
              </Link>
              <Link to="/applicationList">
                <button type="button" className="btn btn-danger">Back</button>
              </Link>
            </div> */}
          </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleModalClose}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CustomerApp;