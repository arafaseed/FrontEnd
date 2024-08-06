import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerApplicationfrom from './CustomerApplicationfrom';

const CustApplicationList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const userID = JSON.parse(localStorage.getItem('userId'));
  // const userID = 3;

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
            <button type="button" className="btn btn-outline-primary" onClick={handleAddButton}>Make Application</button>
            <Link to="/map"><button type="button" className="btn btn-outline-primary ms-5">View map</button></Link>
            <p><Link to="/map"><i class="fa fa-money-bill"></i>Payment </Link></p>
          </div>
          {filteredData.length > 0 ? (
            <table className="table">
              <thead>
                <th>ID</th>
                <th>Full Name</th>
                {/* <th>RF Number</th> */}
                <th>Bussiness name</th>
                <th>Bussiness type</th>
                <th>Address</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.licence_id}>
                    <td>{index + 1}</td>
                    <td>{item.customer.name}</td>
                    {/* <td>345{item.licence_id}</td> */}
                    <td>{item.business_name}</td>
                    <td>{item.business_Type}</td>
                    <td>{item.building_address}</td>
                    <td>{item.building_location}</td>
                    <td>{item.created_date}</td>
                    <td className={
                        item.status === 'Pending' ? 'bg-warning text-white' :
                        item.status === 'Cancel' ? 'bg-danger text-white' :
                        item.status === 'Accepted' ? 'bg-success text-white' :
                        ''
                      }>
                        {item.status}
                      </td>

                    <td>
                      <button className='btn btn-outline-danger'>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="card">
              <div className="card-body">
                <i className='fa fa-warning'> No applications found </i>
                <h5 className="card-title">Hellow</h5>
                <p className="card-text">You don't have any applications yet.</p>
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