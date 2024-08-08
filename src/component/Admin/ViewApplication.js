import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation.';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';


const  ViewApplication = () => {
  const [data, setData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/licence/getallLicense');
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

  const handleStatus = (licence_id) =>{

    axios.patch(`http://localhost:8080/api/licence/${licence_id}/status`)
    .then((response)=>{
      alert("status changed")
    })
    .catch(error=>{
      console.error(error);
    })
    
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
            <Link to="/map"><button type="button" className="btn btn-outline-primary">View map</button></Link>
            <p><Link to="/map"><i class="fa fa-money-bill"></i>Payment </Link></p>
          </div>
          
            <table className="table">
              <thead>
                <th>ID</th>
                <th>Full Name</th>
                {/* <th>RF Number</th> */}
                <th>Bussiness name</th>
                <th>Bussiness type</th>               
                <th>Amount</th>
                <th>Address</th>
                {/* <th>Location</th> */}
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.licence_id}>
                    <td>{index + 1}</td>
                    <td>{item.customer.name}</td>
                    {/* <td>345{item.licence_id}</td> */}
                    <td>{item.business_name}</td>
                    <td>{item.business_Type}</td>
                    <td>{item.amount}</td>
                    <td>{item.building_address}</td>
                    {/* <td>{item.building_location}</td> */}
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
                      <button 
                        onClick={()=> handleStatus(item.licence_id)}
                        className={item.status === 'Accepted' ? 'btn btn-danger' : 'btn btn-outline-primary: btn btn-danger'}>

                         {item.status === 'Pending' ? 'Accepte' : 'Cancel'}

                        </button>
                      <button className='btn btn-outline-danger ms-1'>Delete</button>
                      <button className='btn btn-outline-primary ms-1'>Update</button>
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

export default  ViewApplication;