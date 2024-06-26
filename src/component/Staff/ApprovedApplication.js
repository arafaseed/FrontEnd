import React from 'react'
import Navigation from '../Admin/Navigation.';

import Header from '../Header'

export default function ApprovedApplication() {
  return (
    <div>
      
      <Header/><Navigation/>
      <div className="card">
            <h5><i className="fa fa-check"></i>Approved Application</h5>       
                </div>

        <div className="main">
        <div className='content'>
              
        <table className='table'>
  <tr>
  <th>Name</th>
  <th>Date</th>
  <th>License No</th>
  <th>Location</th>
  <th>License</th>
  </tr>
  <tr>
  <td>Peter</td>
  <td>Griffin</td>
  <td>$100</td>
  </tr>
 
</table>
        </div>
        </div>
    </div>
  )
}
