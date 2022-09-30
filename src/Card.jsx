import React  , {useEffect}from 'react';
import "./Css/info.css";
import Aos from 'aos';
import {Link} from "react-router-dom"
import 'aos/dist/aos.css';

function Card(props) {
    useEffect(()=>{
        Aos.init({duration:800});
      } , [])

  return (
    <div className='info'  data-aos="fade-right">
        <div className='info-head' >
            <div className='card-top'>
                <Link to={props.link}><i class="fa-brands fa-square-instagram"></i></Link>
                <h1>{props.name}</h1>
                <Link to={props.link1}><i class="fa-brands fa-linkedin"></i></Link>
            </div>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </div>
        <div className='info-img'>
        <img src={props.image} width="200px" height="250px"/>
        </div>
    </div>
  )
}

export default Card