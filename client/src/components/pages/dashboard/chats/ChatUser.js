import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format, render, cancel, register } from "timeago.js";

export default function ChatUser({ msg, user }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={user.userAvatar} />
      </ListItemAvatar>
      <ListItemText
        primary={user.userName}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {msg.text}
            </Typography>

            {` -- ${format(msg.createdAt)}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
