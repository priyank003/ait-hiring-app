import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format, render, cancel, register } from "timeago.js";
import { useSelector } from "react-redux";

export default function ChatUser({ msg, user }) {
 

  const userInfo = useSelector((state) => state.userInfo);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        backgroundColor: `${
          user.userId === userInfo.userId ? "#e2ffe8" : "#e2f8ff"
        }`,
        margin: "10px 0",

        borderRadius: "5px",
      }}
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp">{user.username[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.username} secondary={msg.text} />
    </ListItem>
  );
}
