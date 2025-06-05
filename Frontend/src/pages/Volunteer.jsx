import React from 'react';
import AnkitImg from '../images/AnkitImg.png'; 
import AnchalImg from '../images/AnchalImg.jpg'; 
import YogitaImg from '../images/YogitaImg.jpg'; 
import KavitaImg from '../images/KavitaImg.jpg'; 


const founders = [
  {
    name: 'Ankit Kumar',
    role: 'Front-end & AI-ML', 
    image: AnkitImg, 
  },
  {
    name: 'Anchal Sharma',
    role: ['Front-end Team','Team Leader'],
    image: AnchalImg,
  },

  {
    name: 'Yogita Sharma',
    role: 'Front-end Team',
    image: YogitaImg,
  },
  {
    name: 'Kavita Kapkoti',
    role: 'Front-end & Back-end Team',
    image: KavitaImg, // Replace with actual image file
  },
];

const Volunteer = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="founders">
        {founders.map((founder, index) => (
          <div key={index} className="founder">
            <div className="founder-image">
              {/* <img src={founder.image} alt={founder.name} /> */}
              <img src={founder.image} alt={founder.name} style={{ height: '95%', width: '80%', objectFit: 'cover' }} />
            </div>
            <div className="founder-details">
              <h3>{founder.name}</h3>
              {Array.isArray(founder.role) ? (
                founder.role.map((r, i) => (
                  <p key={i}>{r}</p>
                ))
              ) : (
                <p>{founder.role}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteer;

  