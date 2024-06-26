import React from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header'
import { Link } from 'react-router-dom';

export default function AddStaff() {
  return (
    <div>
      <Header/><Navigation/>
      <div className="card">
        <h5><i className="fa fa-plus"></i> Add Staff</h5>
      </div>
      <div className="main">
        <div className='content'>
          <h1>Staff Registration Form</h1>
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
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Gender: </label><br/>
                <input type="radio" id="male" name="gender" value="male"/>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female"/>
                <label htmlFor="female">Female</label>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Zanzibar ID</label>
                <input type="text" className="form-control" placeholder="Enter your Zanzibar ID" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <select className="form-control">
                  <option value="">Select Region</option>
                  <option value="Mjini Magharibi Region">Mjini Magharibi Region</option>
                  <option value="North Unguja Region">North Unguja Region</option>
                  <option value="South Unguja Region">South Unguja Region</option>
                  <option value="North Pemba Region">North Pemba Region</option>
                  <option value="South Pemba Region">South Pemba Region</option>
                </select>
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
              <Link to="/customerList">
                <button type="submit" className="btn btn-primary">Save Record</button>
              </Link>
              <Link to="/customerList">
                <button type="button" className="btn btn-danger">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
