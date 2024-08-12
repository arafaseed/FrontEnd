import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../Admin/Navigation.';
import links from '../List';


const Pay = () => {
  const [location, setLocation] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState("Paid");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [invoice, setInvoice] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [endDate, setEndDate] = useState('');
  const {lecenceId } = useParams();
  const navigate = useNavigate();
  // const [licence_id, setLicenceId] = useState(6);

  const lecence = parseInt(lecenceId)

  useEffect(() => {
    if (lecenceId) {
      generateControlNumber(lecenceId);
    }
  }, [lecenceId]);

  const generateControlNumber = (licenseId) => {
    const generatedControlNumber = `CN-${licenseId}-${Date.now()}`;
    setControlNumber(generatedControlNumber);
    setIsButtonDisabled(true);
  };

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);
    if (amount === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      payment_id: paymentId,
      control_number: controlNumber,
      status:status,
      license_number: 120,
      amount:amount,
      endDate:endDate,
      paidDate : new Date().toISOString().slice(0, 10), // Setting the current date and time
      license: {
        licence_id:lecence
      }
     };
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/api/payment/addPayment', requestData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
        // setIsButtonDisabled(true);
        alert("Successful");
         navigate("/customePayment");  // Navigate to the desired route after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Header />
      <Navigation/>
      <div className="card">
      <h5><i className="fa fa-money-bill"></i> Customer Payment Form</h5>       
      </div>
      <div className='main'>
      <div className='content'>
        <form onSubmit={handleSubmit}
        disabled={controlNumber === ''}>
        
          <h1>Payment Page for License</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn"
                onClick={() => generateControlNumber(lecenceId)}
                disabled={controlNumber !== ''}
                placeholder="Enter your address"
                required
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
              <label className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Invoice"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <button type="button"                  
          className="btn btn-outline-primary ms-4"><Link to="/CustApplicationList">Cancel</Link></button>
          <button type="submit"
          className="btn btn-outline-success ms-4"
          disabled={isButtonDisabled}>Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Pay;