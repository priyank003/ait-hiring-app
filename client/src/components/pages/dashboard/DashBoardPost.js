import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "./DashBoardPost.module.css";
import postIcon from "../../../assets/logos/noticeIcon.svg";
import close from "../../../assets/logos/close_black_24dp.svg";
import { Divider } from "@mui/material";
import useInput from "../../../hooks/use-input";
import { Button } from "@mui/material";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import PostModal from "./PostModal";

const options = ["delete", "update"];

const ITEM_HEIGHT = 48;

const DashBoardPost = ({ postData }) => {
  const listRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = useContext(AuthContext);

  const userInfo = useSelector((state) => state.userInfo);
  const [expand, setExpand] = useState(false);
  const [postTime, setpostTime] = useState({});
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const openHandler = (e) => {
    e.preventDefault();
    setExpand(true);
  };

  const hideModal = () => {
    setExpand(false);
  };
  // postData.ActivityDateTime
  // const date =moment(postData.ActivityDateTime).format("DD-MM-YYYY h:mm:ss");

  const getTime = (time, month, day) => {
    let hour = Number(String(time).substring(0, 2));
    let amPm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;

    setpostTime({
      hour,
      min: String(time).substring(3, 5),
      amPm,
      month: month,
      day: day,
    });
  };

  useEffect(() => {
    const [weekday, month, day, year, time] = String(
      postData.activityDateTime
    ).split(" ");
    getTime(time, month, day);
  }, [postData]);

  const deletePostHandler = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/delete/${postData.postId}/${postData.author.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ).then((res) => {
        setAnchorEl(null);
      });
    } catch (err) {
      console.log(`Could not delete post ${err}`);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/allcomments/${postData.postId}`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      if (response.ok) {
        const resData = await response.json();
        setComments(resData.results);
      }
    } catch (err) {
      console.log(`Could not get comments`);
    }
  };

  useEffect(() => {
    getComments();
  }, [refresh]);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div className={classes.dashboardPost}>
      <ListItem sx={{ cursor: "pointer" }} onClick={openHandler}>
        <ListItemAvatar>
          <div className={classes["post-icon"]}>
            <img src={postIcon} alt="" />
          </div>
        </ListItemAvatar>
        <ListItemText
          primary={postData.title}
          secondary={`posted by ${postData.author.username}`}
        />
      </ListItem>

      {userInfo.role === "admin" && userInfo.userId === postData.author.userId && (
        <div className={classes["post-end"]}>
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
            <MenuItem onClick={deletePostHandler}>
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
        </div>
      )}
      {expand && (
        <PostModal openState={expand} onClose={hideModal} postData={postData} />
      )}
    </div>
  );
};

export default DashBoardPost;
