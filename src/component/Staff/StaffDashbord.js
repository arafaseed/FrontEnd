import React from 'react'
import Header from '../Header'
import Navigation from '../Admin/Navigation.'

export default function StaffDashbord() {
  return (
    <div>
       <Header/>
       <Navigation/>
       <div className="card">
            <h5><i className="fa fa-user"></i>Staff Dashbord</h5>       
                </div>
                    
            <div className="card">
            <h5><i className="fa fa-user"></i> Application Service</h5>  
            <div className='profile'>
                <p className='title'>Total Applications</p>
                <p className='number'><h4>number</h4></p>
            </div> 
            <div className='profile'>
                <p className='title'>Pending Applications</p>
                <p className='number'><h4>number</h4></p>
            </div>    
            <div className='profile'>
                <p className='title'>Accepted Applications</p>
                <p className='number'><h4>number</h4></p>
            </div>  
            <div className='profile'>
                <p className='title'>Canceled Applications</p>
                <p className='number'><h4>number</h4></p>
            </div>   
                </div>
           </div>
  )
}
