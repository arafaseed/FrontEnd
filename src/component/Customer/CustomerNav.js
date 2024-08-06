import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';

const CustomerNav  = () => {
    return(
        
        <div className="navigations">
        <div className='name'> <h2>Customer</h2></div>
            <p><Link to="/customeDashbord"><i class="fa fa-dashboard"></i> Dashbord </Link></p>
            <p><Link to="/CustApplicationList"><i class="fa fa-file-alt"></i>Application </Link></p>
            <p><Link to="/customePayment"><i class="fa fa-money-bill"></i>Payment </Link></p>
    </div> 
       

    );
};

export default CustomerNav;