import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, NavLink } from 'react-router-dom';
import links from '../List';

import React from 'react';

// const username = localStorage.getItem('username')

const Navigation = ({userRole = localStorage.getItem('role') }) => {
    return(
        <div>
       
        <div className="navigations">
                    <div className='name'> <h5>Main Navigation</h5></div>
                    
                    
                    <ul>
                    {links[userRole].map((link , index)=>(
                        <li key={index}>
                        <NavLink to={link.path}>
                            <i className={`fa fa-${link.icon}`}></i>
                            {link.label}
                        </NavLink>
                          
                        </li>
                    ))}
                    </ul>
            
                    <h3>Login as {localStorage.getItem('username')}</h3>
                
{/*                 
                    <p><Link to="/dashbord"><i class="fa fa-dashboard"></i> Dashbord </Link></p>
                    <p><Link to="/staffList"><i class="fa fa-list"></i> Staff List </Link></p>
                    <p><Link to="/customerList"><i class="fa fa-list"></i> Customer List </Link></p>
                    <p><Link to="/customeAapplication"><i class="fa fa-file-alt"></i>Customer Application </Link></p>
                    <p><Link to="/approved"><i class="fa fa-check"></i>Approved Application </Link></p>
                    <p><Link to="/payment"><i class="fa fa-money-bill"></i>Payment </Link></p>
                    <p><Link to="/accountSetting"><i class="fa fa-cog"></i>User Account </Link></p> */}


                </div> 
                
                   
        </div>
    );
};

export default Navigation;