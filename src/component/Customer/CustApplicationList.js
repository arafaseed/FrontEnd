import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import CustomerApplicationfrom from './CustomerApplicationfrom';

const CustApplicationList = () => {
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

  const [showModal, setShowModal] = useState(false);
  const handleAddButton = () => {
    setShowModal(true);
  }
  const handleAddModalClose = () => {
    setShowModal(false);
  }

  return (
    <div>
      <Header /><Navigation />
      <div className="card">
        <h5><i className="fa fa-list"></i>  ApplicationList</h5>
      </div>
      <div className="main">
        <div className='content'>
          <div class="form-group">
            <button type="button" className="btn btn-primary" onClick={handleAddButton}>Customer Application</button>
          </div>
          <table className="table">
            <thead>
              <th>ID</th>
              {/* <th>Name</th> */}
              <th>RF Number</th>
              <th>Bussiness name</th>
              <th>Bussiness type</th>
              <th>Address</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.lic_id}>
                  <td>{index + 1}</td>
                  {/* <td>{item.customer.name}</td> */}
                  <td>345{item.lic_id}</td>
                  <td>{item.name}</td>
                  <td>{item.b_Type}</td>
                  <td>{item.address}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                  <td>
                    Pending
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CustomerApplicationfrom showModal={showModal} handleModalClose={handleAddModalClose} />
      </div>
    </div>
  )
}

export default CustApplicationList;