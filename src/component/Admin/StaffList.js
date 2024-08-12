
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect, React } from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header'
import axios from 'axios';
import PopStaffForm from './PopStaffForm';

export default function StaffList() {
  //kuvuta data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/staff/getallSatff');
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  //Kuita form
  const [showModal, setShowModal] = useState(false);
  const handleAddButton = () => {
    setShowModal(true);
  }
  const handleAddModalClose = () => {
    setShowModal(false);
    fetchData(); // fetch data again after adding new staff
  }

  return (
    <div>
         <Header /><Navigation />
      <div className="card">
        <h5><i className="fa fa-list"></i> Staff List</h5>
      </div>

      <div className="main">

      <div className='content'>
        <div class="form-group">
                <button type="button" className="btn btn-primary"  onClick={handleAddButton}>Add Staff</button>
           
        </div>
      <table className='table'>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Phone</th>          
          <th>Actions</th>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.S_id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.status}</td>
              <td>{item.phone}</td>
              <td>
              <button className='btn btn-outline-danger ms-1'>Delete</button>
              <button className='btn btn-outline-primary ms-1'>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
 <PopStaffForm showModal={showModal} handleModalClose={handleAddModalClose}/>
</div>
    </div>
  )
}
