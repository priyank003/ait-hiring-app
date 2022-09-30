import { Link } from 'react-router-dom';
import React from 'react';
import google from "./Photos/pay.jpg";

function PageCard() {
  return (
    <div className='pagecard'>
        <div className='pagecard-1'>
            <div className='pagecard-img'>
                <img src={google} width="90px" height="90px"/>
            </div>
            <div className='pagecard-text'>
            <Link to="/profile" style={{textDecoration:"none"}}><p><strong>Abhisek Kumar Singh :</strong><span>AIT'24</span></p></Link>
                <p>SDE | Intern at Google | Hired as Microsoft Intern</p>
                <p>1m <i class="fa-solid fa-globe"></i></p>
            </div>
            <div>
                <Link to="/login" style={{textDecoration:"none"}}><button className='body-btns' style={{fontWeight:"bold"}}> <i class="fa-solid fa-plus"></i> Follow</button></Link>
            </div>
        </div>
        <div className='pagecard-mid'>
             <p>whbdh wudaid gaduwdag iawd iawgduai dawguidgaiu wdaid gwiawag duaidw uaod u agadgudga dahduahdau daua dadg</p>   
        </div>
        <div className='pagecard-image'>
            <img src={google} width="400px" height="400px"/>
        </div>
        {/* <hr style={{width:"100%"}} /> */}
        <div className='pagecard-bottom'>
            <button className='body-btns' style={{fontWeight:"bold"}}> <i class="fa-solid fa-thumbs-up"></i>Like</button>
            <button className='body-btns' style={{fontWeight:"bold"}}> <i class="fa-solid fa-comment-dots"></i> Comment</button>
            <button className='body-btns' style={{fontWeight:"bold"}}> <i class="fa-solid fa-share"></i> Share</button>
            <button className='body-btns' style={{fontWeight:"bold"}}> <i class="fa-solid fa-plus"></i> Follow</button>
        </div>
        {/* <hr style={{width:"100%"}} /> */}
    </div>
  )
}

export default PageCard