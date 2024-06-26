import React from 'react'
import AdminNav from '../Admin/Navigation.' 
import Header from '../Header';
import Navigation from '../Admin/Navigation.';
import { Link } from 'react-router-dom';

export default function AddCustomer() {
  return (
    <div>
      
  {/* <Header/><Navigation/>
  <div className="card">
            <h5><i className="fa fa-plus"></i>Add Customer</h5>       
                </div> */}

        <div className="main">
              
        
        <div className='content'>
        <h1>Customer registration  Form</h1>
        <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" placeholder="Enter your name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" placeholder="Enter your username" />
                    </div>

                    <div className="row mb-3">
                    <div className="col-md-6">
                    <label className="form-label">Gender: </label><br/>
                    <label for="male">Male</label>
                    <input type="radio" id="male" name="gender" value="male"/>
                    <label for="female">Female</label>
                    <input type="radio" id="female" name="gender" value="female"/>
                    </div>
        
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Zanzibar ID</label>
                      <input type="text" className="form-control" placeholder="Enter your Nationality" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" placeholder="Enter your address" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" placeholder="Enter your phone number" />
                    </div>
                    

                    <div className="col-md-6">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link to="/customerList"><button type="submit" className="btn btn-primary">Save Record</button></Link>
                    <Link to="/customerList"><button type="button" className="btn btn-danger">Back</button></Link>
                  </div>
                  </form>
                  </div>
        </div>
    // </div>
  )
}
