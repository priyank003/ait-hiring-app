import React , {useState} from 'react';
import google from "./Photos/pay.jpg";
import "./Css/Page.css";
import PageCard from './PageCard';
import TextEditor from './TextEditor';
import {Box , Modal , Typography , Button} from "@mui/material"



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #e9e6e6',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px'
  };
  
  const config = {
    buttons: ["bold" , "italic" , "underline"],
  }

function Page() {
    const [change , setChange] = useState(" ");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div className='post-page'>
        <div className='page-left'>
            <div className='page-left-1'>
                <img src={google} width="120px" height="120px"/>
                <h4>Abhisek kumar Singh</h4>
                <h5>2020 - 2024</h5>
            </div>
            <div>
                <button onClick={handleOpen}>Add Post</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className='editor'>
                            <TextEditor setChange={setChange} config={config} />
                            <hr style={{ margin: "15px 0" , width:"100%"}} />
                            <span>Photo </span>
                            <input type="file" />
                        </div>
                        <button> <i class="fa-solid fa-arrow-right-from-bracket"></i> Add Post</button>
                    </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
        <div className='page-mid'>
            <PageCard />
            <PageCard />
            <PageCard />
            <PageCard />
            <PageCard />
            <PageCard />
            <PageCard />
            <PageCard />
        </div>
        <div className='page-right'>
            <div className='page-right1'>
                <h4><strong>Latest AIT news :</strong></h4>
            </div>
            <div className='page-right2'>
                <p><strong>a. TE's are on High :)</strong></p>
                <p>1m <i class="fa-solid fa-earth-asia"></i></p>
            </div>
            <div className='page-right2'>
                <p><strong>b. BE's are there :)</strong></p>
                <p>1m <i class="fa-solid fa-earth-asia"></i></p>
            </div>
            <div className='page-right2'>
                <p><strong>c. SE's are on foot :)</strong></p>
                <p>1m <i class="fa-solid fa-earth-asia"></i></p>
            </div>
            <div className='page-right2'>
                <p><strong>d. FE's are in AIT :)</strong></p>
                <p>1m <i class="fa-solid fa-earth-asia"></i></p>
            </div>
        </div>
    </div>
  )
}

export default Page