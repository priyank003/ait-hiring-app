import React, { useContext, useState, useEffect } from "react";
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
import classes from "./DashBoardPost.module.css";
import useInput from "../../../hooks/use-input";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { FormControl, Input, FormHelperText } from "@mui/material";
import CommentInput from "./CommentInput";
import { Stack } from "@mui/system";

export default function Comments({ data, postId, onRefresh }) {
  const [refresh, setRefresh] = useState(false);
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const userInfo = useSelector((state) => state.userInfo);

  const commentSubmitHandler = async (comment) => {
    const commentObj = {
      description: comment,
      author: userInfo.userId,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/comment/${postId}`,
        {
          method: "post",
          body: JSON.stringify(commentObj),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      ).then((res) => {
        setRefresh((prev) => !prev);
      });
    } catch (err) {
      console.log(`Could not submit comment ${err} `);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/allcomments/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const resData = await response.json();

      setComments(resData.results);
    } catch (err) {
      console.log(`Could not get comments ${err}`);
    }
  };

  useEffect(() => {
    getComments();
  }, [refresh]);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflowY: "auto",
        borderLeft: "1px solid rgb(207, 199, 199)",
        ["@media (max-width:1200px)"]: {
          // eslint-disable-line no-useless-computed-key
          borderLeft: "none",
        },
      }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommentInput
        onSubmit={commentSubmitHandler}
        placeHolder={"Add a comment"}
        sendBtnText={"Comment"}
      />

      <Stack style={{ overflowY: "auto", maxHeight: "65%" }}>
        {comments.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              key={comment.commentId}
              postId={postId}
              onRefresh={refreshHandler}
            />
          );
        })}
      </Stack>
    </List>
  );
}
