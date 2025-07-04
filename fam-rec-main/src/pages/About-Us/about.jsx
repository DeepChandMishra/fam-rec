import React, { useState } from 'react';
 
import './about.scss';
 
import familyTree from '../../assets/familyTree.jpg';
import HeaderComponent from '../../components/header-component/HeaderComponent';
 
 
const AboutUsContact = () => {
 
  const [showContact, setShowContact] = useState(false);
 
 
  const handleContactUs = ()=>{
 
   setShowContact(prev => !prev);
 
  }
 
  return (
 <>
   <div className="about-container">
 
     <div className="about-section">
 
       <div className="about-left">
 
         <h1>ABOUT US</h1>
 
         <img src={familyTree} alt="Family Tree" />
 
       </div>
 
       <div className="about-right">
 
         <h2>FAMREC</h2>
 
         <h3>Preserving Family Memories, One Story at a Time</h3>
 
         <p>
 
         At FAMREC, we believe that memories are more than just images and videos—they are stories, emotions, and connections that define who we are. Yet, in today's fast-paced digital world, these precious moments often get lost, scattered across devices, or forgotten over time.
 
         </p>
 
         <p>
 
         We created FAMREC to solve this problem: a secure, intuitive, and enduring digital legacy platform where families can store, organize, and pass down their most cherished memories across generations.
 
         </p>
 
       </div>
 
     </div>
 
     <div className="mission-container">
 
     <div className="mission-left">
 
       <h2>Our Mission</h2>
 
       <p>
 
         Our mission is simple yet powerful: to help families preserve their histories and memories for generations to come. We believe every family story deserves to be remembered, shared, and cherished.
 
       </p>
 
     </div>
 
     <div className="mission-right">
 
       <div className="storage-offer">
 
         <p>With 15 GB of free storage for every user, we make family memory preservation accessible to everyone.</p>
 
       </div>
 
      </div>
 
     </div>
 
     <button className="contact-toggle-btn" onClick={handleContactUs}>
 
       Contact Us
 
     </button>
 
 
     {showContact && (
 
       <div className="contact-form-overlay contact-form-overlap">
 
         <div className="contact-form-container">
 
         <div className="contact-form-header" onClick={handleContactUs}>
 
       Contact Us
 
     </div>
 
           <div className="contact-box">
 
             <div className="contact-left">
 
               <label>Please tell us your Name</label>
 
               <input type="text" placeholder="Your Name" />
 
               <label>How can we contact You?</label>
 
               <input type="text" placeholder="Phone / Social Media / etc." />
 
               <label>Please drop your email ID</label>
 
               <input type="email" placeholder="Email Address" />
 
             </div>
 
             <div className="contact-right">
 
               <label>Kindly write your Queries / Feedback</label>
 
               <textarea placeholder="Your Message..."></textarea>
 
             </div>
 
             <button onClick={() => setShowContact(false)}>Submit</button>
 
           </div>
 
         </div>
 
       </div>
 
     )}
 
   </div>
 </>
  );
 
};
 
 
export default AboutUsContact;