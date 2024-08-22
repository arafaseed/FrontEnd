import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Navigation from './Navigation.';


export const AccountSetting = () => {
  const [userId, setuserId] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { userID } = useParams();

  useEffect(() => {
    if (userID) {
      setuserId(parseInt(userID));

      axios.get(`http://localhost:8080/api/user/byIdUser/${userID}`)
        .then(response => {
          const data = response.data;
          setUsername(data.username);
          setPassword(data.password);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userID]);

  const handleSubmits = (event) => {
    event.preventDefault();
    const customerData = {
      username: username,
      password: password,
    };

    console.log('Updating User:', customerData, 'with ID:', userID);

    axios.put(`http://localhost:8080/api/user/updateUser/${userID}`, customerData)
      .then(response => {
        console.log('Response:', response);
        alert("Customer updated successfully");
        navigate('/userAccount')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Header />
      <Navigation/>
      <div className="card">
        <h5><i className="fa fa-plus"></i>Update Account</h5>
      </div>
      <div className="main">
        <div className='content'>
          <h1>Form For Account Setting</h1>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Enter new username" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter new password" />
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-primary ms-4" onClick={(e) => { handleSubmits(e) }}>
              Save
            </button>
            <button type="button" className="btn btn-outline-danger ms-4" >cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSetting;