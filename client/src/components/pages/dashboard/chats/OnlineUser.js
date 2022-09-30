import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function OnlineUser({ user, onClick }) {
  const clickHandler = () => {
    onClick(user.userId);
  };
  return (
    <ListItem
      alignItems="flex-start"
      onClick={clickHandler}
      style={{ cursor: "pointer" }}
    >
      <ListItemAvatar>
        <Avatar alt={user.userName} src={user.userAvatar} />
      </ListItemAvatar>
      <ListItemText primary={user.userName} />
    </ListItem>
  );
}
