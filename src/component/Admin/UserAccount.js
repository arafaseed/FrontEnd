import {React,useState,useEffect} from 'react'
import Navigation from '../Admin/Navigation.';
import Header from '../Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserAccount() {
    //kuvuta data
    const [data, setData] = useState([]);
    useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllUser'); 
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  return (
    <div>
      
      <Header/><Navigation/>
   
   <div className="card">
            <h5><i className="fa fa-list"></i>User Account</h5>       
                </div>
                <div className="main">

<div className='content'>
  <div class="form-group">
  {/* <Link to="/setting"><button type="button" className="btn btn-primary">Account Setting</button></Link> */}
     
  </div>

  <table className='table'>
  <thead>
  <tr>
      <th>ID</th>
      <th>User Name</th>
      <th>Passwords</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  </thead>
   
    <tbody> 
   {data.map((item, index) => (
                  <tr key={item.userID}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.role}</td>
                    
      <td>
      <button className='delbtn' ><i class="fa fa-trash"></i></button>
      <button className='edtbtn' ><i class="fa fa-pencil"></i></button>
      </td> 
      </tr> 
   ))}</tbody>
    
  </table>
</div>
</div>
      
    </div>
  )
}
