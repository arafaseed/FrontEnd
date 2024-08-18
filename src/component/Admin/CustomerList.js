import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import PopFormCust from '../Customer/PopFormCust';
import Navigation from './Navigation.';
import { NavLink, useNavigate,useParams } from 'react-router-dom';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userID} = useParams();
  // Move fetchData outside of useEffect
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userID) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:8080/api/customer/delete/${userID}`);
        fetchData(); // Refresh the data after deletion
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

  const UpdateCustomer = (licence_id) => {
    navigate(`/updateCustomer/${userID}`);
  };

  return (
    <div>
      <Header />
      <Navigation/>
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
                  <button 
                      className='btn btn-outline-danger ms-1'
                      onClick={() => handleDelete(item.userID)}>
                      Delete
                    </button>
                    <NavLink to={`/updateCustomer/${item.userID}`}
                      type="button"
                      className="btn btn-outline-primary ms-4"                                    
                       >
                    Update
                    </NavLink>
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