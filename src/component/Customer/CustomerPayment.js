import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

 function CustomerPayment() {
  // const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  
  const userID = parseInt(localStorage.getItem('userId'));
  
 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payment/getallPayment');
      // setData(response.data);
      setFilteredData(response.data.filter(item => item.license.customer.userID === userID));
      // if (response.status == 200){
      //   window.location.reload(true);
      // }
     
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  useEffect(() => { 
    fetchData();
  }, []);



  //License
  const handleLicense = (payment_id) => {
    navigate(`/license/${payment_id}`);
  };
 
  return (
    <div>
      
     <Header/><Navigation/>
     <div className="card">
            <h5><i className="fa fa-money-bill"></i> Customer Payment</h5> 
                </div>
<div className="main">
              
        
<div className='content'>
 
<table className='table'>
          <thead>
              <th>ID</th>
              <th>App Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Control Number</th>
              <th>License Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>License</th>
          </thead>
          <tbody>
          {filteredData.map((item, index) => (
                <tr key={item.payment_id}>
                  <td>{index + 1}</td>     
                  <td>{item.license.business_name}</td> 
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.control_number}</td>
                  <td>{item.license_number}</td>                                                        
                  <td>{item.amount}</td>                  
                  <td className={
                    item.status === 'Paid' ? 'text-success' :
                    item.status === 'Renew' ? 'text-danger' :
                    ''}>
                    {item.status}
                    </td>
                    <button type="button" 
                        
                        className="btn btn-outline-primary ms-4" onClick={() => handleLicense(item.payment_id)}
                        >License</button>
                                
                </tr>
              ))}
            </tbody>
          </table> 
                        </div>
              </div>
    </div>
  )
}
export default CustomerPayment;