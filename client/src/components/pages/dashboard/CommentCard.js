import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon } from "@mui/material";
import { AuthContext } from "../../../context/auth-context";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

const ITEM_HEIGHT = 48;

export default function CommentCard({ comment, postId, onRefresh }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useContext(AuthContext);

  const deleteCommentHandler = () => {
    try {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/comment/delete/${postId}/${comment.commentId}/${comment.author.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ).then((res) => {
        onRefresh();
      });
    } catch (err) {
      console.log(`Could not delete comment ${err}`);
    }
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ borderBottom: "1px solid rgb(207, 199, 199)" }}
    >
      <ListItemAvatar>
        <Avatar>{comment.author.username[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.author.username}
        secondary={<React.Fragment>{comment.text}</React.Fragment>}
      />
      {auth.userId === comment.author.userId && (
        // <ListItemIcon onClick={deleteCommentHandler} sx={{ cursor: "pointer" }}>
        //   <DeleteIcon />
        // </ListItemIcon>
        <React.Fragment>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
              },
            }}
          >
            <MenuItem onClick={deleteCommentHandler}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Delete</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Edit</Typography>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </ListItem>
  );
}
