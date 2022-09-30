import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function Comments({ data }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((comment) => {
       
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{comment.author.name[5]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.author.name}
              secondary={<React.Fragment>{comment.text}</React.Fragment>}
            />
          </ListItem>
        );
      })}

    
    </List>
  );
}
