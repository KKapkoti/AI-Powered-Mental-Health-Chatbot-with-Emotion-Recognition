//src/pages/DoctorConsult
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import doctorImage from "../images/telemanas.jpg"; 
import placeholderBox from "../images/Screenshot.jpg"
import "../App.css";

const DoctorConsult = () => {
  return (
    <div className="doctor-consult-container">
      <h1 className="page-title">Consultant</h1>
      <div className="doctor-card">
        <div className="left-section">
          <img src={doctorImage} alt="National Tele Mental Health Programme (Tele MANAS)" className="doctor-image" />
          <h2 className="doctor-name">National Tele Mental Health Programme (Tele MANAS)</h2>
          <p className="specialist">Department - Psychiatry</p>
          <h3 className="about-title">About the Organization</h3>
          <p className="about-text">
            Launch: October 10, 2022. 
Purpose: To improve access to mental healthcare through tele-counselling. 
How it works: Individuals can access the service by calling the toll-free number (14416/1800-89-14416). 
Availability: 24/7, in 20 Indian languages. 
Support: The program includes 53 Tele MANAS Cells across states, 23 Mentoring Institutes, and 5 Regional Coordinating Centers. 
Impact: The helpline has handled over 1.81 million calls since its launch, providing essential mental health support across India.
          </p>
          {/* <button className="call-button">
            <FaPhoneAlt className="icon" /> 1800-89-14416
          </button> */}
          <a href="tel:18008914416" className="call-button">
  <FaPhoneAlt className="icon" /> 1800-89-14416
</a>
        </div>
        <div className="right-section">
  <div className="placeholder-content">
    <img src={placeholderBox} alt="Placeholder" className="placeholder-box" />
    <a href="/pdfs/telemanas.pdf" download className="pdf-download-link">
      Download PDF
    </a>
  </div>
  </div>
      </div>
    </div>
  );
};

export default DoctorConsult;
