import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import Navigation from './Navigation.';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../Customer/Table.css'

export default function Payment() {
  return (
    <div>
      
     <Header/><Navigation/>
     <div className="card">
            <h5><i className="fa fa-money-bill"></i> Customer Payment</h5>       
                </div>
<div className="main">
              
        
<div className='content'>
  <table className='table'>
    <tr>
      <th>Date</th>
      <th>Amount</th>
      <th>RF Number</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
    <tr>
      <td>Peter</td>
      <td>Griffin</td>
      <td>$100</td>
      <td>dsfdgfgf</td>
      <td>
     
      <button className='delbtn' ><i class="fa fa-trash"></i></button>
      <button className='edtbtn'><i class="fa fa-pencil"></i></button>
      </td>     
    </tr>
    
  </table>
                        </div>
              </div>
    </div>
  )
}
