import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import amazon from "./Photos/amazon.png";
import ubs from "./Photos/Ubs.png";
import tally from "./Photos/tally.jpg";
import accolite from "./Photos/Accolite.png";
import cred from "./Photos/cred.png";
import goo from "./Photos/google.jpg"
function Company() {
    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img src={goo} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
        <img src={amazon} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
        <img src={ubs} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
        <img src={tally} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
        <img src={accolite} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
        <img src={cred} onDragStart={handleDragStart} role="presentation" width="200px" height="200px"/>,
    ];
  return (
    <div className='comp'>
        <div>
            <h1 style={{fontWeight:"bold"}}>Top Companies</h1>
        </div>
        <div className='Company'>
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