import React, { useState } from 'react';
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import { Modal,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Pay = () => {

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
    <div>
    <Header/><Navigation/>
    <div className='main'>
      <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">RF Number</label>
                <input type="text" className="form-control" placeholder="Enter your application name" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" placeholder="Enter the date" />
              </div>
            </div>
            <div className="row mb-3">
              
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
              <div className="col-md-6">
                <label className="form-label">Invoice</label>
                <input type="text" className="form-control" placeholder="Enter the Invoice" />
              </div>
            </div>
            <button><Link to="/customePayment">Cancel</Link></button>
            <button>Submit</button>
          </form>
          </div>
          </div>

     
  );
}
export default Pay;
