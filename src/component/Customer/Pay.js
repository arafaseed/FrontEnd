import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../Admin/Navigation.';


const Pay = () => {
  const [location, setLocation] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [invoice, setInvoice] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const { license_id } = useParams();
  const navigate = useNavigate();

  const lecence = parseInt(license_id)

  useEffect(() => {
    if (license_id) {
      generateControlNumber(license_id);
    }
  }, [license_id]);

  const generateControlNumber = (licenseId) => {
    const generatedControlNumber = `CN-${licenseId}-${Date.now()}`;
    setControlNumber(generatedControlNumber);
    setIsButtonDisabled(true);
  };

  const handleInvoiceChange = (e) => {
    const enteredInvoice = e.target.value;
    setInvoice(enteredInvoice);
    if (enteredInvoice === controlNumber) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      payment_id: paymentId,
      control_number: controlNumber,
      license_id: 1,
      status: "not paid", // Setting default status
      paidDate: new Date().toISOString() // Setting the current date and time
    };
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/api/payment/addPayment', requestData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
        alert("Successful");
        // navigate("/");  // Navigate to the desired route after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Header />
      <Navigation/>
      <div className='main'>
        <form onSubmit={handleSubmit}>
          <h1>Payment Page for License {license_id}</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn"
                onClick={() => generateControlNumber(license_id)}
                disabled={controlNumber !== ''}
              >
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
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Invoice"
                value={invoice}
                onChange={handleInvoiceChange}
              />
            </div>
          </div>
          <button type="button"><Link to="/customePayment">Cancel</Link></button>
          <button type="submit" disabled={isButtonDisabled}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Pay;