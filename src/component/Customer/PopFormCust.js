import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button } from 'react-bootstrap';

export const PopFormCust = ({ showModal, handleModalClose }) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
{/* 
                  <div className="d-flex justify-content-between">
                    <Link to="/customerList"><button type="submit" className="btn btn-primary">Save Record</button></Link>
                    <Link to="/customerList"><button type="button" className="btn btn-danger">Back</button></Link>
                  </div> */}
                  </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleModalClose}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopFormCust;
