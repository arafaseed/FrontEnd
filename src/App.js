
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
import ViewApplication from './component/Admin/ViewApplication';
import StaffList from './component/Admin/StaffList';
import PopStaffForm from './component/Admin/PopStaffForm';
// import MarkerClusterMap from './component/Admin/MapComponent';
import MapComponent from './component/MapComponent';
import Payment from './component/Admin/Payment';
import RenewPayment from './component/Customer/RenewPayment';
import RenewLicense from './component/Customer/RenewLicence';
import UpdateApplication from './component/Admin/UpdateApplication';
import UpdateCustomer from './component/Admin/UpdateCustomer';
import UpdateStaff from './component/Admin/UpdateStaff';
import FogetPassword from './component/Admin/FogetPassword';
import ProtectingRoot from './component/ProtectingRoot';
import CustomerReport from './component/Customer/CustomerReport';
import Report from './component/Admin/Report';






function App() {
  return (
   
   <BrowserRouter>
        <Routes>
        
        <Route path='/' element={<Login/>}/>
        

        <Route path='/fogetPassword' element={<FogetPassword/>}/>
        <Route path='/setting/:userID' element={<AccountSetting/>}/>
        <Route path='/addStaff' element={<PopStaffForm/>}/>
        <Route path='/addCustomer' element={<PopFormCust/>}/>           
          
          //update Form
          {/* <Route path='/updateApplication/:lecenceId' element={<UpdateApplication/>}/> */}
          <Route path='/updateCustomer/:userID' element={<UpdateCustomer/>}/>
          <Route path='/updateStaff/:userID' element={<UpdateStaff/>}/> 
          //Admin
        <Route element={<ProtectingRoot role="Admin"/>}>
          <Route path='/dashbord' element={<Dashbord/>}/> 
          <Route path='/staffList' element={<StaffList/>}/>    
          <Route path='/customerList' element={<CustomerList/>}/>   
          <Route path='/view-application' element={<ViewApplication/>}/> 
          <Route path='/license/:payment_id' element={<License/>}/>
          <Route path='/userAccount' element={<UserAccount/>}/>
          <Route path='/payment' element={<Payment/>}/> 
          <Route path='/report' element={<Report/>}/>  
          
          //Form
                
         

        </Route>
          
        <Route element={<ProtectingRoot role="Staff"/>}>
          //Staff
          <Route path='/staffdash' element={<StaffDashbord/>}/>    
          <Route path='/customerLists' element={<CustomerList/>}/>   
          <Route path='/view-applications' element={<ViewApplication/>}/> 
          <Route path='/license/:payment_id' element={<License/>}/>      
          <Route path='/payments' element={<Payment/>}/> 
          <Route path='/reports' element={<Report/>}/>  

          //Form
          <Route path='/addCustomer' element={<PopFormCust/>}/> 
          <Route path='/updateCustomer/:userID' element={<UpdateCustomer/>}/>
          
          </Route>


          //Customer   
        <Route element={<ProtectingRoot role="Customer"/>}>

          <Route path='/CustApplicationList' element={<CustApplicationList/>}/> 
          <Route path='/customeDashbord' element={<CustomerDashbord/>}/>
          <Route path='/customePayment' element={<CustomerPayment/>}/>
          <Route path='/customerReport' element={<CustomerReport/>}/>  
          
          //Form
          <Route path='/license/:payment_id' element={<License/>}/>
          <Route path='/paymentForm/:lecenceId' element={<Pay/>}/> 
          <Route path='/renew/:lecenceIds' element={<RenewLicense/>}/> 
        </Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
