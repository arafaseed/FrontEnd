import React, { useState } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import { Link } from 'react-router-dom';
import PopFormCust from './PopFormCust';

const CustomerList = () => {

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
    <tr>
      <th>Name</th>
      <th>Gender</th>
      <th>Address</th>
      <th>ZanzibarID</th>
      <th>Phone</th>
      <th>Action</th>
    </tr>
    <tr>
      <td>Peter</td>
      <td>Griffin</td>
      <td>$100</td>
      <td>Griffin</td>
      <td>$100</td>
      <td>
      <i class="fas fa-trash"></i>
      <i class="fas fa-edit"></i>
      
      </td>
      </tr>     
   
  </table>
 
</div>
 <PopFormCust showModal={showModal} handleModalClose={handleAddModalClose}/>
</div>
  
    </div>
  )
}
export default CustomerList;                                                                                                                                                       vvcncnbncbnbcnncbcbnnbccnbncn