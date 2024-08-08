
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
import CustomerList from './component/Admin/CustomerList';
import UserAccount from './component/Admin/UserAccount';
import CustomerPayment from './component/Customer/CustomerPayment';
import Pay from './component/Customer/Pay';
import Map from './component/Map';
import ViewApplication from './component/Admin/ViewApplication';
import StaffList from './component/Admin/StaffList';
import PopStaffForm from './component/Admin/PopStaffForm';




function App() {
  return (
   
   <BrowserRouter>
        <Routes>
        
        <Route path='/' element={<Login/>}/>
        
          //Admin
          
          <Route path='/dashbord' element={<Dashbord/>}/> 
          <Route path='/staffList' element={<StaffList/>}/>    
          <Route path='/customerList' element={<CustomerList/>}/>   
          <Route path='/view-application' element={<ViewApplication/>}/> 
          <Route path='/license' element={<License/>}/>
          <Route path='/accountSetting' element={<UserAccount/>}/>
          
          //Form
                
          <Route path='/setting' element={<AccountSetting/>}/>
          <Route path='/addStaff' element={<PopStaffForm/>}/>
          <Route path='/addCustomer' element={<PopFormCust/>}/> 
          <Route path='/payments/:license_id' element={<Pay/>}/> 

          //Map
          <Route path='/map' element={<Map/>}/>
        

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
