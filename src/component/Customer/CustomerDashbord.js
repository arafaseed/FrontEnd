import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Navigation from '../Admin/Navigation.'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function CustomerDashbord() {

    const userId = parseInt(localStorage.getItem('userId'));
    
    const [allApp, setAllApp] = useState(0);
    const [pendApp, setPendApp]  = useState(0);
    const [acceptApp,setAcceptApp] = useState(0);
    const [cancelApp, setCancelApp] =  useState(0);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/licence/getallLicense')
    .then((response)=>{
        const filterAll = response.data.filter(item => item.customer.userID === userId);
        const filterPend = response.data.filter(item => item.customer.userID === userId && item.status === 'Pending');
        const filteracceptApp = response.data.filter(item => item.customer.userID === userId && item.status === 'Accepted');
        const filtercancelApp = response.data.filter(item => item.customer.userID === userId && item.status === 'Cancel');
        
        setAllApp(filterAll.length);
        setPendApp(filterPend.length);
        setAcceptApp(filteracceptApp.length);
        setCancelApp(filtercancelApp.length);
    })
}, [])

const data = {
    labels: ['Total Applications', 'Pending Applications', 'Accepted Applications', 'Canceled Applications'],
    datasets: [{
      label: 'Applications',
      data: [allApp, pendApp, acceptApp, cancelApp],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };
  return (
    <div>
       <Header/>
       <Navigation/>
       <div className="container mt-4">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-user"></i>Customer Dashboard</h5>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-cogs"></i> Application Service</h5>
                        <div className="row">
                            <div className="col-md-3 profile">
                                <p className="title">Total Applications</p>
                                <p className="number"><h4>{allApp}</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Pending Applications</p>
                                <p className="number"><h4>{pendApp}</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Accepted Applications</p>
                                <p className="number"><h4>{acceptApp}</h4></p>
                            </div>
                            <div className="col-md-3 profile">
                                <p className="title">Canceled Applications</p>
                                <p className="number"><h4>{cancelApp}</h4></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title"><i className="fa fa-chart-bar"></i> Application Graph</h5>
            <Bar data={data} />
          </div>
        </div>
            </div>
        </div>
  )
}
