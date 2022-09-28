import React from 'react';
import Card from './Card';
// import {Info} from './Info';
import google from "./Photos/pay.jpg";

function Infos() {
  // {Info.map((infos , id)=>{
    return(
      <div style={{marginTop: "15rem"}}>
        <h1 className='h1'> Some of Our Top Alumini's</h1>
      
          <div className='cards-info'>
            <Card
            name="Shubham Jeena"
            title="Programmer"
            body="At AIMA , Mumbai"
            image={google}
            />
            <Card
            name="Sohardh Bhandari"
            title="Coder"
            body="At Paytm , Banglore"
            image={google}
            />
            <Card
            name="Ankush Roy"
            title="Web Developer"
            body="At Turtle Mint , Pune"
            image={google}
            />
            <Card
            name="Dipesh Verma"
            title="Coder"
            body="At Tally Solution  , Pune "
            image={google}
            />
            <Card
            name="Aayush Kuhite"
            title="Programmer"
            body="At UBS , Hyderabad"
            image={google}
            />
          </div>
        </div>
    )
    // })}
}

export default Infos