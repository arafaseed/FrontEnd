import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const RenewPayment = () => {
  const { licenceId: paramLicenceId } = useParams(); // Get licenceId from route params
  const licenceIdRef = useRef(paramLicenceId); // Create a ref for licenceId
  const [licenceId, setLicenceId] = useState(parseInt(paramLicenceId));
  const [businessName, setBusinessName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedNumberYear, setSelectedNumberYear] = useState('');
  const [buildingLocation, setBuildingLocation] = useState('');
  const [buildingAddress, setBuildingAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState("Pending");
  const [amount, setAmount] = useState(0);
  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem('userId')));
  const [controlNumber, setControlNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentId, setPaymentId] = useState(0);
  const navigate = useNavigate();

  const lecence = parseInt(licenceId)// Use ref for licenceId



  console.log(licenceId);
  
  const handleNumberYearChange = (e) => {
    const selectedNumberYear = parseInt(e.target.value);
    setSelectedNumberYear(selectedNumberYear);

    const calculatedAmount = selectedNumberYear * 5000; 
    setAmount(calculatedAmount);

    const currentDate = new Date(); 
    const endDate = new Date(
      currentDate.getFullYear() + selectedNumberYear,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    setEndDate(endDate.toISOString().split('T')[0]); 
  };

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setPaymentAmount(enteredAmount);
  
    if (parseFloat(enteredAmount) === parseFloat(amount)) {
      setIsButtonDisabled(false); 
    } else {
      setIsButtonDisabled(true);  
    }
  };
  
  useEffect(() => {
    licenceIdRef.current = paramLicenceId; // Update ref when params change
    setLicenceId(parseInt(paramLicenceId)); // Update state

    if (paramLicenceId) {
      // Fetch data based on licenceId
      axios.get(`http://localhost:8080/api/licence/${paramLicenceId}`)
        .then(response => {
          const data = response.data;
          console.log(response.data.license);
          
          setBusinessName(data.business_name);
          setStartDate(data.created_date);
          setEndDate(data.endDate);
          setBuildingLocation(data.building_location);
          setBuildingAddress(data.building_address);
          setBusinessType(data.business_Type);
          setRegion(data.region);
          setSelectedNumberYear(data.number_ofYear);
          setAmount(data.amount);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [paramLicenceId]);
 
  const generateControlNumber = (licenseId) => {
    const generatedControlNumber = `CN-${licenseId}-${Date.now()}`;
    setControlNumber(generatedControlNumber);
    setIsButtonDisabled(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customerApplicationData = {
      licence_id: licenceId,
      business_name: businessName,
      created_date: startDate,
      endDate: endDate,
      number_ofYear: selectedNumberYear,
      building_location: buildingLocation,
      building_address: buildingAddress,
      business_Type: businessType,
      amount: amount,
      region: region,
      status: status,
      customer: {
        userID: userID,
      },
    };

    // const paymentData = {
    //   payment_id: paymentId,
    //   control_number: controlNumber,
    //   status: paymentStatus,
    //   amount: paymentAmount,
    //   license: {
    //     licence_id: lecence,
    //   },
    // };

    axios.post(`http://localhost:8080/api/licence/update/${licenceId}`, customerApplicationData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
      
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // axios.post('http://localhost:8080/api/payment/addPayment', paymentData)
    //   .then(response => {
    //     console.log('Response:', response);
    //     console.log('Response data:', response.data);
    //     alert("Successful");
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // navigate("/customePayment");   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Customer Application Form fields */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Number of Year</label>
            <select 
              className="form-control" 
              value={selectedNumberYear} 
              onChange={handleNumberYearChange}
            >
              <option value="">Select Number Of Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Calculated Amount</label>
            <input 
              type="text" 
              className="form-control" 
              value={amount} 
              readOnly 
            />
          </div>
        </div>
        {/* Payment Section */}
        <div className="row mb-3">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn"
              onClick={() => generateControlNumber(licenceId)}
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
            <label className="form-label">Enter Payment Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Amount"
              value={paymentAmount}
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>
          Update
        </button>
      </form>
    </div>
  );
};

export default RenewPayment;
