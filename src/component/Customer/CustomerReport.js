// import React, { useEffect, useState } from 'react';
// import Header from '../Header';
// import axios from 'axios';
// import Navigation from '../Admin/Navigation.';


// export default function CustomerReport() {
//     const userId = parseInt(localStorage.getItem('userId')); // Retrieve userId from localStorage
//     const [reportData, setReportData] = useState([]);
//     const [statusCounts, setStatusCounts] = useState({
//         total: 0,
//         pending: 0,
//         accepted: 0,
//         canceled: 0,
//         paid: 0,
//         renew: 0,
//     });

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/licence/getallLicense')
//             .then((response) => {
//                 const filteredData = response.data.filter(item => item.customer.userID === userId);
                
//                 const data = filteredData.map(item => ({
//                     id: item.id,
//                     name: item.name,
//                     status: item.status,
//                     paymentStatus: item.paymentStatus
//                 }));
//                 setReportData(data);

//                 // Counting based on license status and payment status
//                 const total = data.length;
//                 const pending = data.filter(item => item.status === 'Pending').length;
//                 const accepted = data.filter(item => item.status === 'Accepted').length;
//                 const canceled = data.filter(item => item.status === 'Cancel').length;
//                 const paid = data.filter(item => item.paymentStatus === 'Paid').length;
//                 const renew = data.filter(item => item.paymentStatus === 'Renew').length;

//                 setStatusCounts({
//                     total,
//                     pending,
//                     accepted,
//                     canceled,
//                     paid,
//                     renew,
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error fetching report data:', error);
//             });
//     }, [userId]);

//     return (
//         <div>
//             <Header />
//             <Navigation/>
//             <div className="container mt-4">
//                 <div className="card mb-4 shadow-sm">
//                     <div className="card-body">
//                         <h5 className="card-title"><i className="fa fa-file-alt"></i> License Report</h5>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>License ID</th>
//                                     <th>Customer Name</th>
//                                     <th>Application Status</th>
//                                     <th>Payment Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {reportData.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.id}</td>
//                                         <td>{item.name}</td>
//                                         <td>{item.status}</td>
//                                         <td>{item.paymentStatus}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <div className="mt-4">
//                             <h6>Summary:</h6>
//                             <p>Total Applications: {statusCounts.total}</p>
//                             <p>Pending Applications: {statusCounts.pending}</p>
//                             <p>Accepted Applications: {statusCounts.accepted}</p>
//                             <p>Canceled Applications: {statusCounts.canceled}</p>
//                             <p>Paid Licenses: {statusCounts.paid}</p>
//                             <p>Renew Licenses: {statusCounts.renew}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }





import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import Navigation from '../Admin/Navigation.';

export default function CustomerReport() {
    const userId = parseInt(localStorage.getItem('userId')); // Retrieve userId from localStorage
    const [reportData, setReportData] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        canceled: 0,
        paid: 0,
        renew: 0,
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/licence/getallLicense')
            .then((response) => {
                const filteredData = response.data.filter(item => item.customer.userID === userId);
                
                const data = filteredData.map(item => ({
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    paymentStatus: item.paymentStatus
                }));
                setReportData(data);

                // Counting based on license status and payment status
                const total = data.length;
                const pending = data.filter(item => item.status === 'Pending').length;
                const accepted = data.filter(item => item.status === 'Accepted').length;
                const canceled = data.filter(item => item.status === 'Cancel').length;
                const paid = data.filter(item => item.paymentStatus === 'Paid').length;
                const renew = data.filter(item => item.paymentStatus === 'Renew').length;

                setStatusCounts({
                    total,
                    pending,
                    accepted,
                    canceled,
                    paid,
                    renew,
                });
            })
            .catch((error) => {
                console.error('Error fetching report data:', error);
            });
    }, [userId]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <Header />
            <Navigation/>
            <div className="container mt-4">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-file-alt"></i> License Report</h5>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>License ID</th>
                                    <th>Customer Name</th>
                                    <th>Application Status</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.status}</td>
                                        <td>{item.paymentStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4">
                            <h6>Summary:</h6>
                            <p>Total Applications: {statusCounts.total}</p>
                            <p>Pending Applications: {statusCounts.pending}</p>
                            <p>Accepted Applications: {statusCounts.accepted}</p>
                            <p>Canceled Applications: {statusCounts.canceled}</p>
                            <p>Paid Licenses: {statusCounts.paid}</p>
                            <p>Renew Licenses: {statusCounts.renew}</p>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handlePrint}>
                            Print Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
