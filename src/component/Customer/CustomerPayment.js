import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import './Table.css'
import { Link } from 'react-router-dom';

 function CustomerPayment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const customerId = JSON.parse(localStorage.getItem('customerId'));
  // const customerId = 3;
 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllLicense');
      setData(response.data);
      // if (response.status == 200){
      //   window.location.reload(true);
      // }
      setFilteredData(response.data.filter(item => item.customer && item.customer.cust_id === customerId));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  useEffect(() => { 
    fetchData();
  }, []);
  return (
    <div>
      
     <Header/><Navigation/>
     <div className="card">
            <h5><i className="fa fa-money-bill"></i> Customer Payment</h5>       
                </div>
<div className="main">
              
        
<div className='content'>
  {/* <table className='table'>
    <tr>
      <th>Application ID</th>
      <th>Date</th>
      <th>Amount</th>
      <th>RF Number</th>
      <th>Status</th>
      <th>Control number</th>
      <th>License</th>
    </tr>
    
    
  </table> */}
  
  <table className='table'>
  <thead>
              <th>ID</th>
              <th>Application ID</th>
              <th>Date</th>
              <th>RF Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>License</th>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.lic_id}>
                  <td>{index + 1}</td>
                  <td>AP{item.lic_id}</td>
                  <td>{item.date}</td>
                  <td>345{item.lic_id}</td>
                  <td></td>
                  <td></td>
                  <td><Link to="/payments"><button type="button" className="btn btn-primary">Payment</button></Link></td>
                  <td><Link to="/payments"><button type="button" className="btn btn-primary">Document</button></Link></td>
                                
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