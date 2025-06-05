import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

     const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'wellness672@gmail.com', 
    };
    
    emailjs
      .sendForm('service_j6fpbne', 'template_8qfw96m', e.target, 'ocD6sjKNO1COawjro')
      .then((result) => {
        alert('Email sent successfully:', result.text);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch((error) => {
        alert('Email sending failed:', error.text);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="address">
          <div className="icon">
            <a href="https://maps.app.goo.gl/xmtiY8FL9nVX4oTW8" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-map-marker"></i>
            </a>
          </div>   
          <p>DR. A P J Abdul Kalam Institute of Technology</p>
        </div>
        {/* <div className="address">
          <div className="icon">
            <i className="fa fa-phone"></i>
          </div>
          <p>+91 xxxxxxxx67</p>
        </div> */}
        <div className="address">
          <div className="icon">
            <i className="fa fa-envelope"></i>
          </div>
          <p>wellness672@gmail.com</p>
        </div>
        <div className="social-icons">

          <a href="#" className="icon">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa fa-twitter"></i>
          </a>
          <a href target="_blank" rel="noopener noreferrer" className="icon">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
