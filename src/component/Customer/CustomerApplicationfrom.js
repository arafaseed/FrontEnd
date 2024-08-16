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
      endDate: endDate,
      number_ofYear: selectedNumberYear,
      building_location: buildingLocation,
      building_address: buildingAddress,
      business_Type: businessType,
      amount: amount,
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
        alert("Successful");
        handleModalClose(); // Close the modal only on success
        // navigate("/");
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  const handleNumberYearChange = (e) => {
    const selectedNumberYear = parseInt(e.target.value);
    setSelectedNumberYear(selectedNumberYear);
    const calculatedAmount = selectedNumberYear * 50000; // Adjust the amount calculation to match the requirement
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
                placeholder="Enter Name of your business" required />
              {errors.businessName && <span className="text-danger">{errors.businessName}</span>}
            </div>
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
              {errors.selectedNumberYear && <span className="text-danger">{errors.selectedNumberYear}</span>}
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
                value={buildingLocation}
                readOnly
                required />
              {errors.buildingLocation && <span className="text-danger">{errors.buildingLocation}</span>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text"
                value={buildingAddress}
                onChange={(e) => setBuildingAddress(e.target.value)}
                className="form-control"
                placeholder="Enter Address"
                required
              />
              {errors.buildingAddress && <span className="text-danger">{errors.buildingAddress}</span>}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <select className="form-control"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Select Business Type" required>
                <option value="">Select Business Type</option>
                <option value="Retail">Retail</option>
                <option value="Service">Service</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
              {errors.businessType && <span className="text-danger">{errors.businessType}</span>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Select Region</label>
              <select className="form-control"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Enter Region" required>
                <option value="">Select Region</option>
                <option value="Mjini Magharibi Region">Mjini Magharibi Region</option>
                <option value="North Unguja Region">North Unguja Region</option>
                <option value="South Unguja Region">South Unguja Region</option>
                <option value="North Pemba Region">North Pemba Region</option>
                <option value="South Pemba Region">South Pemba Region</option>
              </select>
              {errors.region && <span className="text-danger">{errors.region}</span>}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerApplicationForm;