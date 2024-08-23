
import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header';
import axios from 'axios';
import Navigation from '../Admin/Navigation.';

export default function CustomerReport() {
    const userId = parseInt(localStorage.getItem('userId')); // Retrieve userId from localStorage
    const [reportData, setReportData] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        total: 0,
        accepted: 0,
        canceled: 0,
        paid: 0,
        renew: 0,
    });
    const reportRef = useRef(); // Create a reference for the report

    useEffect(() => {
        axios.get('http://localhost:8080/api/payment/getallPayment')
            .then((response) => {
                const filteredData = response.data.filter(item => item.license.customer.userID === userId);
                
                const data = filteredData.map(item => ({
                    name: item.license.customer.name,
                    status: item.status,
                    licenseStatus: item.license.status
                }));
                
                setReportData(data);

                // Counting based on license status and payment status after filtering
                const total = data.length;
                const accepted = data.filter(item => item.licenseStatus === 'Accepted').length;
                const canceled = data.filter(item => item.licenseStatus === 'Cancel').length;
                const paid = data.filter(item => item.status === 'Paid').length;
                const renew = data.filter(item => item.status === 'Renew').length;

                setStatusCounts({
                    total,
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
        const printContents = reportRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload the page to restore the original content
    };

    return (
        <div>
            <Header />
            <Navigation/>
            <div className="container mt-4" ref={reportRef} style={{ paddingLeft: 0 }}> {/* Removing left padding for printing */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fa fa-file-alt"></i> License Report</h5>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>SNo</th>
                                    <th>Customer Name</th>
                                    <th>Application Status</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.licenseStatus}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4">
                            <h6>Summary:</h6>
                            <p>Total Applications: {statusCounts.total}</p>
                            <p>Accepted Applications: {statusCounts.accepted}</p>
                            <p>Canceled Applications: {statusCounts.canceled}</p>
                            <p>Paid Licenses: {statusCounts.paid}</p>
                            <p>Renew Licenses: {statusCounts.renew}</p>
                        </div>
                        <button className="btn btn-primary mt-3 no-print" onClick={handlePrint}>
                            Print Report
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .container.mt-4, .container.mt-4 * {
                            visibility: visible;
                        }
                        .container.mt-4 {
                            position: absolute;
                            left: 0;
                            top: 0;
                            padding-left: 0;
                            margin: 0;
                            width: 100%;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                `}
            </style>
        </div>
    );
}

