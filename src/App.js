
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
          <Route path='/license/:payment_id' element={<License/>}/>
          <Route path='/accountSetting' element={<UserAccount/>}/>
          <Route path='/payment' element={<Payment/>}/> 
          
          //Form
                
          <Route path='/setting' element={<AccountSetting/>}/>
          <Route path='/addStaff' element={<PopStaffForm/>}/>
          <Route path='/addCustomer' element={<PopFormCust/>}/>           
          <Route path='/paymentForm/:lecenceId' element={<Pay/>}/> 
    



          //update Form
          <Route path='/updateApplication/:lecenceId' element={<UpdateApplication/>}/>
          <Route path='/updateCustomer/:userId' element={<UpdateCustomer/>}/>
          <Route path='/updateStaff/:userId' element={<UpdateStaff/>}/>

      {/* <Route path='/renew/:lecenceId' element={<RenewPayment/>}/>  */}
          <Route path='/renew/:licence_id' element={<RenewLicense/>}/> 


          //Map
          {/* <Route path='/map' element={<MarkerClusterMap/>}/> */}
          

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
