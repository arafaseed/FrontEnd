import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerApplicationfrom from './CustomerApplicationfrom';
import Navigation from '../Admin/Navigation.';

const CustApplicationList = () => {
  const [data, setData] = useState([]);
  const [status, setstatus] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const navigate = useNavigate();

  console.log("arafa")

  const userID = JSON.parse(localStorage.getItem('userId'));

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/licence/getallLicense');
      setData(response.data);
      setFilteredData(response.data.filter(item => item.customer && item.customer.userID === userID));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleAddButton = () => {
    setShowModal(true);
  };
  const handleAddModalClose = () => {
    setShowModal(false);
  };

  const handlePaymentClick = (licenseId) => {
    navigate(`/paymentForm/${licenseId}`);
  };

  const handleStatus = (licence_id) =>{
    axios.patch(`http://localhost:8080/api/licence/customer/${licence_id}/status`)
    .then((response)=>{
    })
    .catch(error=>{
      console.error(error);
    })
    
  }

  return (
    <div>
      <Header />
      <Navigation/>
      <div className="card">
        <h5><i className="fa fa-list"></i>  ApplicationList</h5>
      </div>
      <div className="main">
        <div className='content'>
          <div className="form-group">
            <button type="button" className="btn btn-outline-primary" onClick={handleAddButton}>Make Application</button>
                     
          </div>
          {filteredData.length > 0 ? (
            <table className="table">
              <thead>
                <th>ID</th>
                <th>Business name</th>
                <th>Business type</th>                
                <th>Amount</th>
                <th>Address</th>
                {/* <th>Location</th> */}
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.licence_id}>
                    <td>{index + 1}</td>
                    <td>{item.business_name}</td>
                    <td>{item.business_Type}</td>                    
                    <td>{item.amount}</td>
                    <td>{item.building_address}</td>
                    {/* <td>{item.building_location}</td> */}
                  
                    <td className={
                        item.status === 'Pending' ? 'bg-warning text-white' :
                        item.status === 'Cancel' ? 'bg-danger text-white' :
                        item.status === 'Accepted' ? 'bg-success text-white' :
                        ''
                      }>
                        {item.status}
                      </td>
                    <td>
                    <button 
                        onClick={()=> handleStatus(item.licence_id)}
                        className={item.status === 'Pending' ? 'btn btn-danger' : 'btn btn-outline-primary: btn btn-danger'}
                        disabled={item.status === 'Cancel'}
                        >

                        {item.status === 'Pending' ? 'Cancel' : 'Cancel'}
                         
                        </button>
                        <button type="button" 
                        
                        className="btn btn-outline-primary ms-4" onClick={() => handlePaymentClick(item.licence_id)}
                        disabled={item.status === 'Cancel'}
                        >Payment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="cards">
              <div className="card-body">
              <h5 className="card-title">Hello</h5>
              <i className='fa fa-warning'> No applications found </i>
        
              </div>
            </div>
          )}
        </div>
        <CustomerApplicationfrom showModal={showModal} handleModalClose={handleAddModalClose} />
      </div>
    </div>
  );
};

export default CustApplicationList;
