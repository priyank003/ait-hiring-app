import React from 'react';
import {Link} from "react-router-dom";
// import { Typography } from '@mui/material/styles/createTypography';
import {Button} from '@mui/material';
import logo from "./Photos/logo1.jpg"

function Body() {
  return (
    <div className='Body'>
        <div className='body-head'>
            <h1><strong>One Step Closer to Your Dream Job</strong></h1>
            {/* <span>is here for you</span>   */}
            <p style={{fontWeight:"bold"}}>Ait hiring cell is now here to help you to reach to your desired platform in your career.</p>
            <Link to="/login" style={{textDecoration:"none"}}><button className='btn' style={{fontWeight:"bold"}}>Get Started </button></Link>
        </div>
        <div className='body-img'>
            <img src={logo} />
        </div>
    </div>
  )
}

export default Body;