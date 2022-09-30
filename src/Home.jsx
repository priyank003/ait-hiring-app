import React from 'react';
import './Css/App.css'
import Body from './Body';
// import Navbar from './Navbar';
import Company from './Company';
import Footer from './Footer';
import Infos from './Infos';
// import {BrowserRouter , Route , Routes , Link} from "react-router-dom"

function BeforeApp() {
  return (
    <div>
      <Body />
      <Company />
      <Infos />
    </div>
  )
}

export default BeforeApp