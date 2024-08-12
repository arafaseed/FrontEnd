import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

import React from 'react'


export default function Header() {
  return (
    <div className="headers">
           <div className='myImage'>
             <img  src='pi3.jpg' style={{ width: '80px', height: '80px', }}></img>
                
            </div>   
            <div className='calender'>
            
                      <p><Link to="/">Logout<i class="fa fa-sign-out"></i></Link></p>       
                </div>  

                <div className='calender'>
                      Date:Time<br/>
                      Fri,7 June <br/>
                      3:00          
                </div>  
               
                
               
                <div className='tittle'>
                <h1>BUSSINESS LICENCE MANAGEMENT SYSTEM</h1>
                   
                </div>              
        </div>
  )
}
