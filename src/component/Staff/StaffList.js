import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header'
import { Link } from 'react-router-dom';

export default function StaffList() {
  return (
    <div>

      <Header /><Navigation />
      <div className="card">
        <h5><i className="fa fa-list"></i> Staff List</h5>
      </div>

      <div className="main">

      <div className='content'>
        <div class="form-group">
        <Link to="/addStaff"><button type="button" className="btn btn-primary">Add Staff</button></Link>
           
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
      </div>

    </div>
  )
}
