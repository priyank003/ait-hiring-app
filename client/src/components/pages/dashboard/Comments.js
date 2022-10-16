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
import CommentCard from "./CommentCard";

export default function Comments({ data, postId, onRefresh }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.commentId}
            postId={postId}
            onRefresh={onRefresh}
          />
       
        );
      })}
    </List>
  );
}
