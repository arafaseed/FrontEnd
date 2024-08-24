import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navigation from './Navigation.';

export const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    // pending: 0,
    accepted: 0,
    canceled: 0,
    paid: 0,
    renew: 0,
  });

  const printRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8080/api/payment/getallPayment')
      .then((response) => {
        const data = response.data.map(item => ({
          name: item.license.customer.name,
          status: item.status,
          licenseStatus: item.license.status
        }));
        console.log(response.data)
        
        setReportData(data);

        // Counting based on license status and payment status
        const total = data.length;

        // const pending = data.filter(item => item.licenseStatus === 'Pending').length;
        const accepted = data.filter(item => item.licenseStatus === 'Accepted').length;
        const canceled = data.filter(item => item.licenseStatus === 'Cancel').length;
        const paid = data.filter(item => item.status === 'Paid').length;
        const renew = data.filter(item => item.status === 'Renew').length;
        
        setStatusCounts({
          total,
          // pending,
          accepted,
          canceled,
          paid,
          renew,
        });
      })
      .catch((error) => {
        console.error('Error fetching report data:', error);
      });
  }, []);

  const handlePrint = (saveAsPdf = false) => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internalPageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      if (saveAsPdf) {
        pdf.save('report.pdf');
      } else {
        // Print the report (default behavior)
        window.open(pdf.output('bloburl'), '_blank');
      }
    });
  };

  return (
    <div>
      <Header />
      <Navigation/>
      <div className="container mt-4" ref={printRef}>
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title"><i className="fa fa-money-bill"></i>Payment Report</h5>
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
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.licenseStatus}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <h6>Summary:</h6>
              <p>Total Complete Applications: {statusCounts.total}</p>
              {/* <p>Pending Applications: {statusCounts.pending}</p> */}
              <p>Accepted Applications: {statusCounts.accepted}</p>
              <p>Canceled Applications: {statusCounts.canceled}</p>
              <p>Paid Licenses: {statusCounts.paid}</p>
              <p>Renew Licenses: {statusCounts.renew}</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-outline-primary ms-4" onClick={handlePrint}>
        <i className="fa fa-print"></i> Print Report
      </button>
      <button type="button" className="btn btn-outline-success ms-4" onClick={() => handlePrint(true)}>
        <i className="fa fa-file-pdf"></i> Get PDF
      </button>
    </div>
  );
}

export default Report;