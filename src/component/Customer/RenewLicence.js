import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RenewLicence = () => {
  const [licenceId, setLicenceId] = useState(0);
  const [selectedNumberYear, setSelectedNumberYear] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const { licence_id } = useParams();

  useEffect(() => {
    if (licence_id) {
      setLicenceId(parseInt(licence_id));
      
      axios.get(`http://localhost:8080/api/licence/${licence_id}`)
        .then(response => {
          const data = response.data;
          setStartDate(data.created_date);
          setEndDate(data.endDate);
          setSelectedNumberYear(data.number_ofYear);
          setAmount(data.amount);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [licence_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const requestData = {
      created_date: startDate,
      endDate: endDate,
      number_ofYear: selectedNumberYear,
      amount: amount,
    };

    axios.patch(`http://localhost:8080/api/licence/updateDatesAndAmount/${licenceId}`, requestData)
      .then(response => {
        console.log('Response:', response);
        alert("Licence updated successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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


  const generateControlNumber = (licenseId) => {
    const generatedControlNumber = `CN-${licenseId}-${Date.now()}`;
    setControlNumber(generatedControlNumber);
    setIsButtonDisabled(true);
  };

  const handleNumberYearChange = (e) => {
    const selectedNumberYear = parseInt(e.target.value);
    setSelectedNumberYear(selectedNumberYear);
    const calculatedAmount = selectedNumberYear * 50000; 
    setAmount(calculatedAmount);

    const currentDate = new Date();
    const endDate = new Date(
      currentDate.getFullYear() + selectedNumberYear,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    setEndDate(endDate.toISOString().split('T')[0]);
  };
    
  return (
    <div>
      <h4>Renew {licence_id}</h4>

      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Number of Years</label>
          <select className="form-control"
            value={selectedNumberYear}
            onChange={handleNumberYearChange}
            placeholder="Number of year" required>
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
          <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>Update</button>
      </form>
    </div>
  )
}

export default RenewLicence;