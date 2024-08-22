import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Navigation from './Navigation.';

export const UpdateCustomer = () => {
  const [userId, setuserId] = useState(0);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [zan_Id, setzan_Id] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();

  const { userID} = useParams();

  useEffect(() => {
    if (userID) {
      setuserId(parseInt(userID));
      
      axios.get(`http://localhost:8080/api/customer/byId/${userID}`)
        .then(response => {
          const data = response.data;
          setName(data.name);
          setUsername(data.username);
          setzan_Id(data.zan_Id);
          setGender(data.gender);
          setPhone(data.phone);
          setAddress(data.address);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userId]);

  
  const handleSubmits = (event) => {
    event.preventDefault();
    const customerData = {
      name: name,
      username: username,
      zan_Id: zan_Id,
      gender: gender,
      phone: phone,
      address: address,
      };
      axios.put(`http://localhost:8080/api/customer/update/${userID}`, customerData)
      .then(response => {
        console.log('Response:', response);
        alert("Customer updated successfully");
        navigate('/customerList')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    
  console.log('customerData');
  return (
 <div>
        <Header/>
        <Navigation/>

        <div className="card">
        <h5>
          <i className="fa fa-edit"></i>Update Customer</h5>
      </div>
      <div className="main">
        <div className="content">
        <form onSubmit={handleSubmits}>
          <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter your Full Name" />
        </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter your username" />
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
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Zanzibar ID</label>
              <input type="text" value={zan_Id} onChange={(e) => setzan_Id(e.target.value)} className="form-control" placeholder="Enter your Nationality" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter your address" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter your phone number" />
            </div>
            
          </div>
          <div className="d-flex justify-content-between">
          <button  type="button"
                      className="btn btn-outline-success ms-4"  onClick={(e) => {handleSubmits(e)}}>
          Save</button>
         <button type="button"
                      className="btn btn-outline-danger ms-4" >cancel</button>
          
        </div>
        </form>
        </div>
        </div>
        
      </div>
    
  );
};

export default UpdateCustomer;
