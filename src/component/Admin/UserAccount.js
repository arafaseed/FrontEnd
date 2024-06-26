import React from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import { Link } from 'react-router-dom';

export default function UserAccount() {
  return (
    <div>
      
      <Header/><Navigation/>
   
   <div className="card">
            <h5><i className="fa fa-list"></i>User Account</h5>       
                </div>
                <div className="main">

<div className='content'>
  <div class="form-group">
  {/* <Link to="/setting"><button type="button" className="btn btn-primary">Account Setting</button></Link> */}
     
  </div>

  <table className='table'>
    <tr>
      <th>User Name</th>
      <th>Passwords</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
    <tr>
      <td>Peter</td>
      <td>Griffin</td>
      <td>fghj</td>
      <td>
      <i class="fas fa-trash"></i>
      <Link to="/setting"><i class="fas fa-edit"></i></Link>
      
      </td>
     
    </tr>
    
  </table>
</div>
</div>
      
    </div>
  )
}
