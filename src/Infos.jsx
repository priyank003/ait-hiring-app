import React from 'react';
import Card from './Card';
// import {Info} from './Info';
import bhandu from "./Photos/bhandu.png";
import jena from "./Photos/jena.png";
import ankush from "./Photos/ankush.png";
import dipu from "./Photos/dipu.png";
import kuhite from "./Photos/kuhite.png";

function Infos() {
  // {Info.map((infos , id)=>{
    return(
      <div style={{marginTop: "15rem"}}>
        <h1 className='h1'> Some of Our Top Alumini's</h1>
      
          <div className='cards-info'>
            <Card
            name="Subham Jena"
            title="Programmer"
            body="At Paytm , Banglore"
            image={jena}
            link="https://www.instagram.com/jena.jena_/"
            link1="https://www.linkedin.com/in/subham-j-259330108/"
            />
            <Card
            name="Sohardh Bhandari"
            title="Coder"
            body="At Goldman Sachs , karnataka"
            image={bhandu}
            link="https://www.instagram.com/sohardhbhandari/"
            link1="https://www.linkedin.com/in/sohardh-bhandari-92534a175/"
            />
            <Card
            name="Ankush Roy"
            title="Web Developer"
            body="At Turtle Mint , Pune"
            image={ankush}
            link="https://www.instagram.com/_ankush_roy._/"
            link1="https://www.linkedin.com/in/ankush-roy-00o00/"
            />
            <Card
            name="Dipesh Verma"
            title="Coder"
            body="At Tally Solution  , Pune "
            image={dipu}
            link="https://www.instagram.com/still_dipesh/"
            link1="https://www.linkedin.com/in/dipesh-verma-8b29841b4/"
            />
            <Card
            name="Hardik pandya"
            title="Coder"
            body="At Acollite  , Pune "
            image={dipu}
            link="https://www.instagram.com/hardik_pandya_777/"
            link1="https://www.linkedin.com/in/hardik-pandya-61a459191/"
            />
            <Card
            name="Aayush Kuhite"
            title="Programmer"
            body="At UBS , Hyderabad"
            image={kuhite}
            link="https://www.instagram.com/aayushkuhite/"
            link1="https://www.linkedin.com/in/aayush-kuhite/"
            />
          </div>
        </div>
    )
    // })}
}

export default Infos