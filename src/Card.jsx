import React  , {useEffect}from 'react';
import "./Css/info.css";
import Aos from 'aos';
import 'aos/dist/aos.css';

function Card(props) {
    useEffect(()=>{
        Aos.init({duration:800});
      } , [])

  return (
    <div className='info'  data-aos="fade-right">
        <div className='info-head' >
            <div className='card-top'>
                <i class="fa-brands fa-square-instagram"></i>
                <h1>{props.name}</h1>
                <i class="fa-brands fa-linkedin"></i>
            </div>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </div>
        <div className='info-img'>
            <img src={props.image} />
        </div>
    </div>
  )
}

export default Card