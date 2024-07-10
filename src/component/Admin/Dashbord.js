import React from 'react';

import Header from '../Header';
import Navigation from './Navigation.';

//import '../../node_modules/bootstrap/dist/css/'


const Dashbord  = () => {
    return(
        
        <div>
            <Header/>
            <Navigation/>   
            
            <div className="card">
            <h5><i className="fa fa-user"></i> Customer Dashbord</h5>       
                </div>
                    
            <div className="card">
            <h5><i className="fa fa-user"></i> Application Service</h5>  
            <div className='counter'>
                            <p className='title'>Total Applications</p>
                            <p className='number'>40</p>
                        </div>     
                </div>
                
            {/* <div className='main'>
                <div className="profile">
                    <h2>Profile</h2>
                    <p>CustomerId:</p>
                    <p>Name:</p>
                    <p>Gender:</p>
                    <p>Age:</p>
                    <p>Address:</p>
                    <p>Zan-Id:</p>
                    <p>Phone:</p>
                </div>

                <div className="profile">
                <h2>Application</h2>
                        <div className='counter'>
                            <p className='title'>Total Applications</p>
                            <p className='number'>40</p>
                        </div>

                        <div className='counter'>
                        </div>
                        <div className='counter'>
                        </div>
                       
                </div>
                        

                <div className="profile">
                    <h2>Satus</h2>
                        <div className='counter'>
                        </div>

                        <div className='counter'>
                        </div>
                        <div className='calender'>
                            Map<br/>
                            arafa            
                        </div>     
                        <div className='calender'>
                            Licence<br/>
                            arafa            
                        </div>   
                </div> */}
            {/* </div> */}
        </div>
    );
};

export default Dashbord;