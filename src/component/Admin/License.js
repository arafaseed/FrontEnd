import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './License.css'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function License() {
  const [data, setData] = useState([]);
  const [item, setitem] = useState([]);
  const License = License(null);
  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
    const input = License.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save("report.pdf");
    });
  };
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/payment/byId/${payment_id}`);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  return (
    <div><button style={{"margin-left":"40px","margin-bottom":"40px"}} onClick={generatePDF}>License</button>
    <div className='licensebody' ref={License}>
    <p><img  src='image.png' style={{ width: '120px', height: '120px', }}></img> </p>_
      <p style={{float:'right' }}>Mjini Magharibi Region</p>
      <p style={{float:'left' }}>Urban manicipal council</p>  
      <p>This is to certisfied that</p>
      <p>BUSSINESS LICENSE<td></td> </p>
      <p>(under)</p>
      <p>for</p>
      <p>Is issued to:</p>
      <p></p>
      <p>(Urban Manicipal Council,)</p>
      <p>License Free Amount:</p>
      <p>BUSSINESS</p>
      <p>to update under</p>
      <p>License No:BSL-SP</p>
      <p style={{float:'right' }}>To</p>
      <p style={{float:'left' }}>From</p>  
      <p>Given under my handin Zanzibar</p>
      <p>Date:</p>
      <p><img  src='sign.png' style={{ width: '50px', height: '50px',alignContent:'center' }}></img> </p>
      <p>
       Director 
       <img  src='image.png' style={{ width: '100px', height: '100px',float:'left',marginBottom:'5px' }}></img> 
       <img  src='image.png' style={{ width: '100px', height: '100px',float:'right' }}></img>
        </p> 
      <p>Urban Manicipal Council</p>
    </div>
    </div>
  )
}
