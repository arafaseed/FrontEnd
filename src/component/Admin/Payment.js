import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation.';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Payment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/payment/getallPayment');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
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
    <table className='table'>
          <thead>
              <th>ID</th>
              <th>App ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Control Number</th>
              <th>License Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>License</th>
          </thead>
          <tbody>
          {data.map((item, index) => (
                <tr key={item.payment_id}>
                  <td>{index + 1}</td>     
                  <td>{item.license.licence_id}</td> 
                  <td>{item.paidDate}</td>
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
                  <td><Link to="/license"><button type="button" className="btn btn-primary">Document</button></Link></td>
                                
                </tr>
              ))}
            </tbody>
          </table>                       
          </div>
              </div>
    </div>
  )
}
