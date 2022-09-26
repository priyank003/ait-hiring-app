import React from 'react';
import Card from './Card';
// import {Info} from './Info';
import google from "./Photos/pay.jpg";

function Infos() {
  // {Info.map((infos , id)=>{
    return(
      <div>
        <h1 className='h1'>Our Some of Top Alumini's</h1>
      
          <div className='cards-info'>
            <Card
            name="Abhisek"
            title="Programmer"
            body="lorem 23jjasn aj nfajnf janfs senfwesfnse esf ffsn fse ne fefhsjfsnfk esfhsejk sfajefsn"
            image={google}
            />
            <Card
            name="Abhisek"
            title="Coder"
            body="lorem 23jjasn aj nfajnf janfs senfwesfnse esf ffsn fse ne fefhsjfsnfk esfhsejk sfajefsn"
            image={google}
            />
            <Card
            name="Abhisek"
            title="helper"
            body="lorem 23jjasn aj nfajnf janfs senfwesfnse esf ffsn fse ne fefhsjfsnfk esfhsejk sfajefsn"
            image={google}
            />
            <Card
            name="Abhisek"
            title="Coder"
            body="lorem 23jjasn aj nfajnf janfs senfwesfnse esf ffsn fse ne fefhsjfsnfk esfhsejk sfajefsn"
            image={google}
            />
            <Card
            name="Abhisek"
            title="Coder"
            body="lorem 23jjasn aj nfajnf janfs senfwesfnse esf ffsn fse ne fefhsjfsnfk esfhsejk sfajefsn"
            image={google}
            />
          </div>
        </div>
    )
    // })}
}

export default Infos