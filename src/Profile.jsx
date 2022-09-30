import React from 'react';
import "./Css/Profile.css";
import google from "./Photos/gg.jpg"
import {Link} from "react-router-dom"

function Profile() {
  return (
    <div>
        <div className='profile'>
            <div className='profile-top'>
            <img src={google} width="220px" height="250px"/>
            <Link to="/kj" className='msg'><i class="fa-regular fa-comment-dots"></i></Link>
            </div>
            <div className='profile-mid'>
                <div className='profile-mid-info'>
                    <label>Name :</label>
                    <h3>Abhisek Kumar Singh</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>AIT Merit NO. :</label>
                    <h3>20090</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>Passing Year :</label>
                    <h3>June 2024</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>Father's Name :</label>
                    <h3>Shyam Sabu singh</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>Mother's Name :</label>
                    <h3>Pratima Singh</h3>
                </div>
                
                <div className='profile-mid-info'>
                    <label>Favorite Domain :</label>
                    <h3>Front-end development</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>No. of Internships :</label>
                    <h3>01</h3>
                </div>
                <div className='profile-mid-info'>
                    <label>Placed At :</label>
                    <h3> - </h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile