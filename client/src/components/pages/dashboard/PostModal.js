import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Comments from "./Comments";
import Grid from "@mui/material/Grid";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90vh",
  bgcolor: "background.paper",
  overflowY: "auto",

  boxShadow: 24,
  p: 4,
};

export default function PostModal({ openState, onClose, postData }) {
  //   const [open, setOpen] = React.useState(openState);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => onClose();

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openState}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openState}>
          <Box sx={style}>
            <Grid container spacing={2} style={{ height: "100%" }}>
              <Grid item lg={7} style={{ height: "100%", overflowY: "auto" }}>
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  {postData.title}
                </Typography>
                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                  {postData.description}
                </Typography>
              </Grid>

              <Grid item lg={5} xs={12}>
                <Divider>Comments</Divider>
                <Comments postId={postData.postId} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
