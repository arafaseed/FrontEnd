import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import Navigation from '../component/Admin/Navigation.';
import Header from '../component/Header';
import { Link } from 'react-router-dom';
import CustomerApplication from './CustomerApplication';
import CustomerApplicationfrom from '../component/Customer/CustomerApplicationfrom';


const ApplicationList = () => {

  const [showModal, setShowModal] = useState(false);
 const handleAddButton =() =>{
  setShowModal(true);
 } 
 const handleAddModalClose =() =>{
  setShowModal(false);
 }
//create fuction to get all application that can ce accessed by admin and staff

  return (
    <div>
    <Header/><Navigation/>
    
    <div className="card">
             <h5><i className="fa fa-list"></i>  ApplicationList</h5>       
                 </div>
     <div className="main">
 
        <div className='content'>
          <div class="form-group">
          <button type="button" className="btn btn-primary"  onClick={handleAddButton}>Add Customer</button>
              
          </div>
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>Peter</td>
              <td>arafa</td>
              <td>dfgh</td>
              <td>Griffin</td>
              <td>arafagsjhdk</td>
              <td>$100</td>
              <td>
            
              <button className='delbtn' ><i class="fa fa-trash"></i></button>
              <button className='edtbtn' ><i class="fa fa-pencil"></i></button>
              </td>      
            </tr>
            
          </table>
        </div>
        <CustomerApplicationfrom showModal={showModal} handleModalClose={handleAddModalClose}/>
        </div>
  
    </div>

      

  )
}

export default  ApplicationList;