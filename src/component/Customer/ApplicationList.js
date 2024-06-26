import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import { Link } from 'react-router-dom';


export default function ApplicationList() {
  return (
    <div>
      
      <Header/><Navigation/>
   
   <div className="card">
            <h5><i className="fa fa-list"></i>Application  List</h5>       
                </div>
                <div className="main">

<div className='content'>
  <div class="form-group">
  <Link to="/application"><button type="button" className="btn btn-primary">Customer Application</button></Link>
     
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
      <td>dfgh</td>
      <td>Griffin</td>
      <td>$100</td>
      
      <td>
     
      <button><i class="fa fa-trash"></i></button>
      <button class="edit-button"> <button><i class="fa fa-pencil"></i></button></button>
      </td>     
    </tr>
    
  </table>
</div>
</div>
      
    </div>
  )
}
