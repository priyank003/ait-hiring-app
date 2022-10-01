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
    onClick(user.id);
  };
  return (
    <ListItem
      alignItems="flex-start"
      onClick={clickHandler}
      style={{ cursor: "pointer" }}
    >
      <ListItemAvatar>
        <Avatar alt={user.name}>{user.email[0].toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
}
