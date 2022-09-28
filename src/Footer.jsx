import React from 'react';
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className='Footer'>
        <div>
            <h4>Ait Hiring Platform</h4>
            <p style={{width:"50%" , marginLeft: "20px" , lineHeight: "25px"}}>We take the work out of connecting with others so you can accomplish more.</p>
            <Link to="/login" style={{textDecoration:"none"}}><button className='btn' style={{fontWeight:"bold" , width:"31%" , height:"15%"}}>Get Started </button></Link>
        </div>
        <div className='army'>
            <h4>Army Institue of Technology</h4>
            <hr />
            <h5><i class="fa-solid fa-location-dot"></i>Contact Us</h5>
            <h5><i class="fa-solid fa-location-dot"></i>Dighi Hills,Pune-411015</h5>
            <h5><i class="fa-solid fa-envelope"></i>ait@aitpune.edu.in</h5>
            <h5><i class="fa-solid fa-phone"></i>7249250184/ 7249250185</h5>
        </div>
        <div className='footer'>
            <a href='https://www.facebook.com/aitpune' style={{color:"black"}}><i class="fa-brands fa-facebook"></i></a>
            <a href='https://www.instagram.com/aitpune_official/?hl=en' style={{color:"black"}}><i class="fa-brands fa-square-instagram"></i></a>
            <a href='https://twitter.com/ait_pune' style={{color:"black"}}><i class="fa-brands fa-twitter"></i></a>
            <a href='https://www.youtube.com/channel/UCACMNGR9zp7oxcYCe-Ys_yw' style={{color:"black"}}><i class="fa-brands fa-youtube"></i></a>
            <a href='https://www.linkedin.com/school/army-institute-of-technology-ait-pune/' style={{color:"black"}}><i class="fa-brands fa-linkedin"></i></a>

            <div className='links'>
                <a className='link' href="https://www.aitpune.com/"><i class="fa-solid fa-house"></i><strong>Visit</strong></a>
                <hr />
                <a href='https://erp.aitpune.edu.in:8006/'><i class="fa-solid fa-droplet"></i> <strong>ERP</strong></a>
                <hr />
            </div>
        </div>
    </div>
  )
}

export default Footer