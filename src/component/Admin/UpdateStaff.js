
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState, useEffect,Link} from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Admin/Navigation.';

const UpdateStaff = () => {
  const [userId, setuserId] = useState(0);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const { userID} = useParams();

  useEffect(() => {
    if (userID) {
      setuserId(parseInt(userID));


      axios.get(`http://localhost:8080/api/staff/byId/${userID}`)
      .then(response => {
        const data = response.data;
        setName(data.name);
        setUsername(data.username);
        setGender(data.gender);
        setPhone(data.phone);
        setStatus(data.status);
       })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}, [userId]);

  const handleSubmits = (event) => {
    event.preventDefault();
    const StaffData= {
        name: name,
        username: username,
        gender: gender,
        phone: phone,
        status: status,
        role: "Staff"     
       };
   
    axios.put(`http://localhost:8080/api/staff/update/${userID}`, StaffData)
      .then(response => {
        console.log('Response:', response);
        console.log('Response data:', response.data);
        alert("Updated Created Successfull")
        navigate('/staffList')
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }


  const handleCancel = () => {
    navigate(-1);
  }
  return (
    <div>
      <Header />
      <Navigation/>
      <div className="card">
        <h5>
          <i className="fa fa-list"></i>Staff List
        </h5>
      </div>
      <div className="main">
        <div className="content">
          <div className="form-group">
           
          </div>
      <form onSubmit={handleSubmits}>
    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter your username" />
        </div>
        <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter your Full Name" />
        </div>
    </div>
    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Gender: </label><br />
            <label for="male">Male</label>
            <input type="radio" value="Male" onChange={(e) => setGender(e.target.value)} />
            <label for="female">Female</label>
            <input type="radio" value="Female" onChange={(e) => setGender(e.target.value)} />
        </div>
        <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter your phone number" />
        </div>
    </div>
    <div className="row mb-3">
        <div className="col-md-6">
        <label className="form-label">Select Status</label>
              <select className="form-control" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              placeholder="Select Status" >
                <option value="">Select Status</option>
                <option value="Director">Director</option>
                <option value="Manager">Manager</option>
                
              </select></div>
              
    </div>
    <div className="d-flex justify-content-between">
          <button   type="button"
                      className="btn btn-outline-primary ms-4"  onClick={(e) => {handleSubmits(e)}}>
          Save</button>

          <button type="button"
                className="btn btn-outline-secondary ms-4"
                onClick={handleCancel}>
                Cancel
              </button>
            
        </div>
</form>
</div>
</div>
</div>
     
  );
};

 

export default UpdateStaff


