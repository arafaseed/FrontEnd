import React, { useState,useEffect } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import PopFormCust from './PopFormCust';

const CustomerList = () => {
  const [data, setData] = useState([]);
    useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllCustomer'); 
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:8080/deleteCustomer/11`);
        } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
 

  const [showModal, setShowModal] = useState(false);
  const handleAddButton =() =>{
  setShowModal(true);
 } 
 const handleAddModalClose =() =>{
  setShowModal(false);
 }
  return (
    <div>
   <Header/><Navigation/>
   
   <div className="card">
            <h5><i className="fa fa-list"></i> Customer List</h5>       
                </div>
    <div className="main">

<div className='content'>
  <div class="form-group">
 <button type="button" className="btn btn-primary"  onClick={handleAddButton}>Add Customer</button>
     
  </div>

  <table className='table'>
  <thead>
              
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>ZanzibarID</th>
                  <th>Phone</th>
                  <th>Actions</th>
               
              </thead>
   <tbody> 
   {data.map((item, index) => (
                  <tr key={item.Cust_id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.zan_id}</td>
                    <td>{item.phone}</td>
                    <td>
                    <button className="button delete" onClick={() => handleDelete(item.Cust_id)}><i className="fa fa-trash"></i></button>
                    <button className="edtbtn"><i className="fa fa-pencil"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
 
</div>
 <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose}/>
</div>
  
    </div>
  )
}
export default CustomerList;                                                     