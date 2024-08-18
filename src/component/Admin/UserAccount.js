import React, { useState, useEffect } from 'react';
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import { NavLink, useNavigate,useParams } from 'react-router-dom';

export default function UserAccount() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/getallUser');
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
      // After deletion, fetch the updated data
      fetchData();
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="card">
        <h5><i className="fa fa-list"></i>User Account</h5>
      </div>
      <div className="main">
        <div className='content'>
          <div className="form-group">
            {/* <Link to="/setting"><button type="button" className="btn btn-primary">Account Setting</button></Link> */}
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Password</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.userID}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>{item.role}</td>
                  <td>
                  <button 
                      className='btn btn-outline-danger ms-1'
                      onClick={() => handleDelete(item.userID)}>
                      Delete
                    </button>
                    <NavLink to={`/setting/${item.userID}`}
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
      </div>
    </div>
  );
}
