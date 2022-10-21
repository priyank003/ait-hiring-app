import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AdminUsers({ user, onClick }) {
  const clickHandler = () => {
    onClick(user.userId);
  };
  return (
    <ListItem
      onClick={clickHandler}
      style={{
        cursor: "pointer",
        borderBottom: "1px solid rgb(207, 199, 199)",
      }}
    >
      <ListItemAvatar>
        <Avatar alt={user.username}>{user.username[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${user.username} ${user.lastname}`} />
    </ListItem>
  );
}
