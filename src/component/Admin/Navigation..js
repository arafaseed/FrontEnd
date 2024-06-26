import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';


import React from 'react';





const Navigation = () => {
    return(
        <div>
       
        <div className="navigations">
                    <div className='name'> <h2>Admin</h2></div>
                    
                    
            
                {/* <h4><img  src='image.png' style={{ width: '120px', height: '120px', }}></img></h4>       */}
                
                
                    <p><Link to="/dashbord"><i class="fa fa-dash"></i> Dashbord </Link></p>
                    <p><Link to="/staffList"><i class="fa fa-list"></i> Staff List </Link></p>
                    <p><Link to="/customerList"><i class="fa fa-list"></i> Customer List </Link></p>
                    <p><Link to="/applicationList"><i class="fa fa-file-alt"></i>Customer Application </Link></p>
                    <p><Link to="/approved"><i class="fa fa-check"></i>Approved Application </Link></p>
                    <p><Link to="/payment"><i class="fa fa-money-bill"></i>Payment </Link></p>
                    <p><Link to="/accountSetting"><i class="fa fa-cog"></i>User Account </Link></p>
                </div> 
                   
        </div>
    );
};

export default Navigation;