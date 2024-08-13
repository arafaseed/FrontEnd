import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './License.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';

export default function License() {
  const [data, setData] = useState({});
  const [item, setitem] = useState([]);

  const {payment_id} = useParams();
  const printRef = useRef();

  const handlePrint = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('license.pdf');
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payment/byId/${payment_id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data || !data.license || !data.license.customer) {
    return (
      <div className="Center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="Center">
      <button type="button" className="btn btn-outline-primary ms-4" onClick={handlePrint}>
        Print License
      </button>
      <div className="licensebody" ref={printRef}>
        <p>
          <img src="manispalogo.png" style={{ width: '120px', height: '120px' }} alt="logo" />
        </p>
        <p>ZANZIBAR MUNICIPAL COUNCIL</p>
        <p style={{ float: 'right'}}>
          <b>{data.license.region}</b>
        </p>
        <p style={{ float: 'left' }}>Municipal Council</p>
        <p>This is to certify that</p>
        <p>BUSINESS LICENSE</p>
        <p>(under ACT14,2017)</p>
        <p>for <b>{data.license.business_name}</b></p>
        <p>Is issued to:</p>
        <p>
          <b>{data.license.customer.name}</b>
        </p>
        <p></p>
        <p>
          (Urban Municipal Council,<b>{data.license.building_address}</b>)
        </p>
        <p>License Fee Amount: <b>{data.license.amount}</b></p>
        <p>BUSINESS</p>
        <p>to update under</p>
        <p>License No: BSL-SP-<b>{data.license_number}</b></p>
        <p style={{ float: 'right' }}>
          To <b>{data.endDate}</b>
        </p>
        <p style={{ float: 'left' }}>
          From <b>{data.startDate}</b>
        </p>
        <p>Given under my hand in Zanzibar</p>
        <p>Date: <b>{data.startDate}</b></p>
        <p>
        
          <img src="sign.png" style={{ width: '70px', height: '20px', alignContent: 'center' }} alt="signature" />
        </p>
        <p>
          Director
          <p>ARAFA SAID ALI</p>
        </p>
        <p>Urban Municipal Council</p>
      </div>
    </div>
  );
}
