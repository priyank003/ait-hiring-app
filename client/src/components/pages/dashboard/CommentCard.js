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

export default function CommentCard({ comment, postId, onRefresh }) {

  const auth = useContext(AuthContext);

  const deleteCommentHandler = () => {
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
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{comment.author.username[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.author.username}
        secondary={<React.Fragment>{comment.text}</React.Fragment>}
      />
      {auth.userId === comment.author.userId && (
        <ListItemIcon onClick={deleteCommentHandler}>
          <DeleteIcon />
        </ListItemIcon>
      )}
    </ListItem>
  );
}
