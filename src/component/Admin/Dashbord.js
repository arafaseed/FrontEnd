import React from 'react';

import Header from '../Header';
import Navigation from './Navigation.';

//import '../../node_modules/bootstrap/dist/css/'


const Dashbord  = () => {
    return(
        
        <div>
            <Header/>
            <Navigation/>   
            
            <div className="container mt-4">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-user"></i> Admin Dashboard</h5>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-cogs"></i> Application Service</h5>
                        <div className="row">
                            <div className="col-md-3 profile">
                                <p className="title">Total Applications</p>
                                <p className="number"><h4>23</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Pending Applications</p>
                                <p className="number"><h4>45</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Accepted Applications</p>
                                <p className="number"><h4>78</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Canceled Applications</p>
                                <p className="number"><h4>10</h4></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
    );
};

export default Dashbord;