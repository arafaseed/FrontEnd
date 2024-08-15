import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export const CustomerApplicationForm = ({ showModal, handleModalClose }) => {
  const [licenceId, setLicenceId] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedNumberYear,setSelectedNumberYear] = useState('');
  const [buildingLocation, setBuildingLocation] = useState('');
  const [buildingAddress, setBuildingAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [region, setRegion] = useState('');  
  const [status, setStatus] = useState("Pending");
  const [amount, setAmount] = useState(0);
  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem('userId')));
  const [errors, setErrors] = useState({});

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();




  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!businessName) {
      isValid = false;
      formErrors['businessName'] = 'Business Name is required';
    }
    if (!selectedNumberYear) {
      isValid = false;
      formErrors['selectedNumberYear'] = 'Number of years is required';
    }
    if (!buildingLocation) {
      isValid = false;
      formErrors['buildingLocation'] = 'Location is required';
    }
    if (!buildingAddress) {
      isValid = false;
      formErrors['buildingAddress'] = 'Address is required';
    }
    if (!businessType) {
      isValid = false;
      formErrors['businessType'] = 'Business Type is required';
    }
    if (!region) {
      isValid = false;
      formErrors['region'] = 'Region is required';
    }

    setErrors(formErrors);
    return isValid;
  };

 const handleGetLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Format the location as "latitude,longitude"
        setBuildingLocation(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("Error fetching location: ", error);
        setBuildingLocation('Unable to retrieve location');
      }
    );
  } else {
    setBuildingLocation('Geolocation is not supported by this browser.');
  }
};


const handleSubmit = (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }
  
    const requestData = {
      licence_id: licenceId,
      business_name: businessName,
      created_date: startDate,
      endDate:endDate,
      number_ofYear:selectedNumberYear,
      building_location: buildingLocation,
      building_address: buildingAddress,
      business_Type:businessType,
      amount:amount,
      region: region,
      status,
      customer: {
        userID: userID,
      },
    };
   
    console.log('Request data:', requestData);
    axios.post('http://localhost:8080/api/licence/addLicense', requestData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
        alert("Successfull")
        // navigate("/")
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  // function YourComponent() {
  //   const [number_year, setNumber_year] = useState('');
    
  const handleNumberYearChange = (e) => {
    const selectedNumberYear = parseInt(e.target.value);
    setSelectedNumberYear(selectedNumberYear)
    const calculatedAmount = selectedNumberYear * 50000; // Adjust the amount calculation to match the requirement
    setAmount(calculatedAmount);
  
    // Calculate the end date
    const currentDate = new Date(); // Get today's date
    const endDate = new Date(
      currentDate.getFullYear() + selectedNumberYear,
      currentDate.getMonth(),
      currentDate.getDate()
    );
  
    setEndDate(endDate.toISOString().split('T')[0]); // Format the date as 'YYYY-MM-DD'
  };
    
      
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for License userID {userID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Name</label>
              <input type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              className="form-control" 
              placeholder="Enter Name of your business" required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount</label>
              <select className="form-control" 
              value={amount} 
              onChange={handleNumberYearChange}
              placeholder="Number of year" required>
              <option value="">Select Number Of Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              </select>
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
                placeholder="Add location" required
                value={buildingLocation}
                readOnly 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text" 
              value={buildingAddress} 
              onChange={(e) => setBuildingAddress(e.target.value)} 
              className="form-control" 
              placeholder="Enter Address"  required/>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <select className="form-control" 
              value={businessType} 
              onChange={(e) => setBusinessType(e.target.value)} 
              placeholder=" Select Business Type"  required>
                <option value="">Select Number Of Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              </select>
            </div>
            <div className="col-md-6">
            <label className="form-label">Select Region</label>
              <select className="form-control" 
              value={region} 
              onChange={(e) => setRegion(e.target.value)} 
              placeholder="Enter Region"  required>
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
          handleSubmit(e);
          handleModalClose();
        }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerApplicationForm;