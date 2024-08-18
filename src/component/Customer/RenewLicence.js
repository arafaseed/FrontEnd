import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateLicense = () => {
  const [licenceId, setLicenceId] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [amount, setAmount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { lecenceIds } = useParams();

  useEffect(() => {
    setLicenceId(lecenceIds);
  }, [lecenceIds]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const startDate = new Date().toISOString().slice(0, 10);
    const endDateCalc = new Date(startDate);
    endDateCalc.setFullYear(endDateCalc.getFullYear() + parseInt(numberOfYears));

    const licensedata = {
      created_date: startDate,
      endDate: endDateCalc.toISOString().slice(0, 10),
      number_ofYear: numberOfYears,
      amount: amount,
    };

    const paymentData = {
      payment_id: 0,
      amount: amount,
      status: 'Paid',
      control_number: controlNumber,
      license_number: licenceId,
      license: {
        licence_id: parseInt(licenceId)
      }
    };

    axios.patch(`http://localhost:8080/api/licence/updateDatesAndAmount/${licenceId}`, licensedata)
      .then(response => {
        console.log('Response:', response);
        axios.put(`http://localhost:8080/api/payment/${licenceId}`, paymentData)
          .then(response => {
            console.log('Payment response:', response);
            alert("License updated and payment created successfully");
          })
          .catch(error => {
            console.error('Error:', error);
            alert("Error creating payment: " + error.message);
          });
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Error updating license: " + error.message);
      });
  };

  const handleNumberOfYearsChange = (e) => {
    const selectedNumberYear = parseInt(e.target.value);
    setNumberOfYears(selectedNumberYear);

    const startDate = new Date().toISOString().slice(0, 10);
    const endDateCalc = new Date(startDate);
    endDateCalc.setFullYear(endDateCalc.getFullYear() + selectedNumberYear);
    setEndDate(endDateCalc.toISOString().slice(0, 10));

    const calculatedAmount = selectedNumberYear * 50000; 
    setAmount(calculatedAmount);
  };

  const handleAmountChange = (e) => {
    setPaymentAmount(e.target.value);
    setIsButtonDisabled(e.target.value !== amount.toString());
  };

  const generateControlNumber = () => {
    const generatedControlNumber = `CN-${licenceId}-${Date.now()}`;
    setControlNumber(generatedControlNumber);
  };

  return (
    <div>
      <h2>Update License {lecenceIds}</h2>
      <form onSubmit={handleSubmit}>
        <label>Licence ID:</label>
        <input type="text" hidden value={licenceId} disabled />
        <br />

        <label>Number of Years:</label>
        <select value={numberOfYears} onChange={handleNumberOfYearsChange}>
          <option value="">Select</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
          <option value="5">5 Years</option>
        </select>
        <br />

        <label>End Date:</label>
        <input type="text" value={endDate} disabled />
        <br />

        <button type="button" onClick={generateControlNumber}>Generate Control Number</button>
        {controlNumber && (
          <div>
            <p>Control Number: {controlNumber}</p>
          </div>
        )}

        <label>Amount:</label>
        <input type="text" value={amount} disabled />
        
        <label>Enter Payment Amount:</label>
        <input type="text" value={paymentAmount} onChange={handleAmountChange} />
        <br />

        <button type="submit" disabled={isButtonDisabled || !controlNumber}>Update License</button>
      </form>
    </div>
  );
};

export default UpdateLicense;