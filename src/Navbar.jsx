import { Stack , Button } from '@mui/material';
import React from 'react';
import Ait from "./Photos/AIT_Pune_logo.gif";
import {Link} from "react-router-dom";
import "./Css/App.css";

function Navbar() {
  return (
    <Stack direction="row" className='navbar'>
        <Link to="/" style={{textDecoration:"none" , color:"black"}}><div className='navbar-logo'>
            <img src={Ait} alt="logo_here" />
            <h1 style={{fontWeight:"bolder"}}>AIT Hiring Cell</h1>
        </div></Link>

        <div className='buttons'>
            <Link to="/login" style={{textDecoration:"none"}}><button className='body-btn' style={{fontWeight:"bold"}}>Login</button></Link>
            {/* <Button variant="contained">Register</Button> */}
            <Link to="/posts" style={{textDecoration:"none"}}><button className='body-btn' style={{fontWeight:"bold"}}>Posts</button></Link>
        </div>
        
    </Stack>
  )
}

export default Navbar;