import React  , {useEffect}from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import amazon from "./Photos/amazon.jpg";
import ubs from "./Photos/Ubs.png";
import tally from "./Photos/tally.png";
import accolite from "./Photos/Accolite.png";
import cred from "./Photos/cred.png";
import goo from "./Photos/google.jpg"
import Aos from 'aos';
import 'aos/dist/aos.css';

function Company() {
    useEffect(()=>{
        Aos.init({duration:900});
      } , [])

    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img src={goo} onDragStart={handleDragStart} role="presentation" width="120px" height="120px"/>,
        <img src={amazon} onDragStart={handleDragStart} role="presentation" width="150px" height="150px"/>,
        <img src={ubs} onDragStart={handleDragStart} role="presentation" width="150px" height="150px"/>,
        <img src={tally} onDragStart={handleDragStart} role="presentation" width="100px" height="100px"/>,
        <img src={accolite} onDragStart={handleDragStart} role="presentation" width="150px" height="150px"/>,
        <img src={cred} onDragStart={handleDragStart} role="presentation" width="150px" height="150px"/>,
    ];
  return (
    <div className='comp'>
        <div>
            <h1 style={{fontWeight:"bold"}}>Top Companies</h1>
        </div>
        <div className='Company'  data-aos="zoom-in">
            {/* <AliceCarousel
            autoPlay='true'
            infinite="true"
            autoPlayInterval="1000"
            responsive={responsive}
            mouseTracking items={items} /> */}

            {items.map((item)=>(
                <div>{item}</div>
            ))}
        </div>
    </div>
  )
}

export default Company