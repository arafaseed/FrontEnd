
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Login from './component/Login';
import Header from './component/Header';
import Dashbord from './component/Admin/Dashbord';
import AccountSetting from './component/Admin/AccountSetting';
import CustomerDashbord from './component/Customer/CustomerDashbord';
import StaffDashbord from './component/Staff/StaffDashbord';
import CustApplicationList from './component/Customer/CustApplicationList';
import License from './component/Admin/License';
import PopFormCust from './component/Customer/PopFormCust';
import PopStaffForm from './component/Staff/PopStaffForm';
import StaffList from './component/Staff/StaffList';
import CustomerAppList from './component/Admin/CustomerAppList';
import CustomerList from './component/Customer/CustomerList';
import UserAccount from './component/Admin/UserAccount';
import CustomerPayment from './component/Customer/CustomerPayment';



function App() {
  return (
   
   <BrowserRouter>
        <Routes>
        
        <Route path='/' element={<Login/>}/>
        
          //Admin
          
          <Route path='/dashbord' element={<Dashbord/>}/> 
          <Route path='/staffList' element={<StaffList/>}/>    
          <Route path='/customerList' element={<CustomerList/>}/>   
          <Route path='/cusApplication' element={<CustomerAppList/>}/> 
          <Route path='/license' element={<License/>}/>
          <Route path='/accountSetting' element={<UserAccount/>}/>
          
          //Form
                
          <Route path='/setting' element={<AccountSetting/>}/>
          <Route path='/addStaff' element={<PopStaffForm/>}/>
          <Route path='/addCustomer' element={<PopFormCust/>}/> 

        

          //Staff
          <Route path='/staffdash' element={<StaffDashbord/>}/>          
          
          
          

          //Customer   
          
          <Route path='/CustApplicationList' element={<CustApplicationList/>}/> 
          <Route path='/customeDashbord' element={<CustomerDashbord/>}/>
          <Route path='/customePayment' element={<CustomerPayment/>}/>
                
        </Routes>
   </BrowserRouter>
  );
}

export default App;
