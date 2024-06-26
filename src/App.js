
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Login from './component/Login';
import Header from './component/Header';
import AddCustomer from './component/Customer/AddCustomer';
import CustomerApplication from './component/Customer/CustomerApplication';
import CustomerList from './component/Customer/CustomerList';
import AddStaff from './component/Staff/AddStaff';
import StaffList from './component/Staff/StaffList';
import ApprovedApplication from './component/Staff/ApprovedApplication';
import CustomerPayment from './component/Customer/CustomerPayment';



import CustomerNav from './component/Customer/CustomerNav';
import AdminDashbord from './component/Admin/AdminDashbord';

import StaffTable from './component/Staff/StaffTable';
import Dashbord from './component/Customer/Dashbord';
import ApplicationList from './component/Customer/ApplicationList';
import UserAccount from './component/Admin/UserAccount';
import AccountSetting from './component/Admin/AccountSetting';

function App() {
  return (
   
   <BrowserRouter>
        <Routes>
        {/* <Route exact path='/' element={<Dashbord/>}/> */}
        
          //Admin
          
          
          //Staff
          
          //Customer
          
          <Route path='/' element={<Login/>}/>
          <Route path='/dashbord' element={<Dashbord/>}/>
          <Route path='/applicationList' element={<ApplicationList/>}/>
          <Route path='/addCustomer' element={<AddCustomer/>}/>
          <Route path='addStaff' element={<AddStaff/>}/>
          <Route path='/application' element={<CustomerApplication/>}/>
          <Route path='/customerList' element={<CustomerList/>}/> 
          <Route path='/staffList' element={<StaffList/>}/> 
          <Route path='/approved' element={<ApprovedApplication/>}/> 
          <Route path='/payment' element={<CustomerPayment/>}/> 
          <Route path='/password' element={<CustomerList/>}/> 
          <Route path='/accountSetting' element={<UserAccount/>}/>
          <Route path='/setting' element={<AccountSetting/>}/>


        </Routes>
   </BrowserRouter>
  );
}

export default App;
