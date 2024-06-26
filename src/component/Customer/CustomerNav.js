import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';

const CustomerNav  = () => {
    return(
        
        <div>
         
         <div className='nav'>
         <p><Link to="/staffList"><i class="fa fa-list"></i> Staff List </Link></p>
                    <p><Link to="/approved"><i class="fa fa-check"></i>Approved Application </Link></p>
                    <p><Link to="/payment"><i class="fa fa-money-bill"></i>Customer Payment </Link></p>
                    <p><Link to="/password"><i class="fa fa-cog"></i>Change User Password </Link></p>
                
         </div>
       
        </div>
    );
};

export default CustomerNav;