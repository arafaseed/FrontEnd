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
            
                   {/* <h3>Login as {localStorage.getItem('username')}</h3> */}
                

                </div> 
                
                   
        </div>
    );
};

export default Navigation;