import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerPayment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const userID = parseInt(localStorage.getItem('userId'));

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/payment/getallPayment');
      const updatedData = response.data.map((item) => {
        console.log(response.data);
        
        const endDate = new Date(item.license.endDate);
        const currentDate = new Date();
        item.status = endDate < currentDate ? 'Renew' : 'Paid';
        if (endDate > currentDate) {
          item.status = 'Paid';
          axios.put(`http://localhost:8080/api/payment/updateStatus/${item.payment_id}`, item);
        }
        return item;
      });
      await Promise.all(updatedData.map((item) => axios.put(`http://localhost:8080/api/payment/updateStatus/${item.payment_id}`, item)));
      setData(updatedData);
      
      setFilteredData(updatedData); // Set filteredData to updatedData
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const handleLicense = (payment_id) => {
    navigate(`/license/${payment_id}`);
  };



  const handleRenew = (licence_id) => {
    navigate(`/renew/${licence_id}`);
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="card">
        <h5><i className="fa fa-money-bill"></i> Customer Payment</h5>
      </div>
      <div className="main">
        <div className='content'>
          <table className='table'>
            <thead>
              
                <th>ID</th>
                <th>App Name</th>
                <th>Year</th>
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
                  <td>{item.license.number_ofYear}</td> 
                  <td>{item.license.created_date}</td>
                  <td>{item.license.endDate}</td>
                  <td>{item.control_number}</td>
                  <td>{item.license_number}</td>
                  <td>{item.amount}</td>
                  <td className={
                    item.status === 'Paid' ? 'text-success' :
                    item.status === 'Renew' ? 'text-danger' :
                    ''}>
                    {item.status}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-4"
                      onClick={() => handleLicense(item.payment_id)}
                    >
                      License
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger ms-4"
                      onClick={() => handleRenew(item.license.licence_id)}
                      disabled={item.status === 'Paid'}
                    >
                    Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerPayment;
