import React, { useState, useEffect } from 'react';
import Navigation from './Navigation.';
import Header from '../Header';
import axios from 'axios';
import PopFormCust from '../Customer/PopFormCust';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/customer/getallCustomer');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (UserID) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:8080/api/customer/delete/${UserID}`);
        const newData = data.filter((item) => item.UserID !== UserID);
        setData(newData);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleAddButton = () => {
    setShowModal(true);
  };
  const handleAddModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="card">
        <h5>
          <i className="fa fa-list"></i> Customer List
        </h5>
      </div>
      <div className="main">
        <div className="content">
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={handleAddButton}>
              Add Customer
            </button>
          </div>
          <table className='table'>
            <thead>
                 <th>ID</th>
                 <th>User Name</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Zanzibar ID</th>
                <th>Phone</th>
                <th>Actions</th>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.UserID}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.address}</td>
                  <td>{item.zan_Id}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className='btn btn-outline-danger ms-1' onClick={() => handleDelete(item.UserID)}>Delete</button>
                    <button className='btn btn-outline-primary ms-1'>Update</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose} />
      </div>
    </div>
  );
};

export default CustomerList;