import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import CustomerApplicationfrom from '../Customer/CustomerApplicationfrom';
import Navigation from './Navigation.';

const CustomerAppList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllLicense');
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:8080/deleteLicense/${itemId}`);
        } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div>
      <Header />
      <Navigation/>
      <div className="card">
        <h5><i className="fa fa-list"></i> Application List</h5>
      </div>
      <div className="main">
        <div className="content">
          <div className="form-group"></div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Business name</th>
                <th>Business type</th>
                <th>Address</th>
                <th>Location</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.lic_id}>
                  <td>{index + 1}</td>
                  <td>{item.customer.name}</td>
                  <td>{item.name}</td>
                  <td>{item.b_Type}</td>
                  <td>{item.address}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                  <td>
                    <button className="button delete" onClick={() => handleDelete(item.lic_id)}><i className="fa fa-trash"></i></button>
                    <button className="edtbtn"><i className="fa fa-pencil"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerAppList;
