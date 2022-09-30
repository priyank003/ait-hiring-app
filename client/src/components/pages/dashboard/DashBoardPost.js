import React, { useEffect, useState } from "react";
import classes from "./DashBoardPost.module.css";
import postIcon from "../../../assets/logos/noticeIcon.svg";
import close from "../../../assets/logos/close_black_24dp.svg";
import { Divider } from "@mui/material";
import useInput from "../../../hooks/use-input";
import { Button } from "@mui/material";
import Comments from "./Comments";
import { useSelector } from "react-redux";
const DashBoardPost = ({ postData }) => {
  const BASE_URL = "http://localhost:8000/api";
  const [expand, setExpand] = useState(false);
  const [postTime, setpostTime] = useState({});
  const [comments, setComments] = useState([]);

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

  const deleteHandler = async () => {
    await fetch(`${BASE_URL}/posts/delete/${postData.postId}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
    });
  };
  const {
    value: enteredEditor,
    isValid: enteredEditorIsValid,
    hasEror: editorInputHasEror,
    valueChangeHandler: editorChangeHandler,
    inputBlurHandler: editorBlurHandler,
    reset: resetEditorInput,
  } = useInput((value) => value.trim() !== "");
  const userCookie = useSelector((state) => state.userInfo.cookie);

  const commentSubmitHandler = async (e) => {
    const commentObj = {
      description: enteredEditor,
    };
    e.preventDefault();
    console.log("commenting");
    await fetch(`${BASE_URL}/posts/comment/${postData.postId}`, {
      method: "post",
      body: JSON.stringify(commentObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookie}`,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const getComments = async () => {
    console.log("getting comments");
    const response = await fetch(
      `${BASE_URL}/posts/allcomments/${postData.postId}`
    );
    const resData = await response.json();

    setComments(resData.results);
  };

  useEffect(() => {
    getComments();
  }, []);

  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className={classes.dashboardPost}>
      <div className={classes["post-header"]}>
        <div className={classes["post-icon"]}>
          <img src={postIcon} alt="" />
        </div>
        <h3>{postData.title}</h3>
      </div>
      <div className={classes["post-end"]}>
        <div className={classes["post-expand-link"]}>
          <a href="/dashboard" onClick={openHandler}>
            open
          </a>
        </div>
        {userInfo.role === "admin" && (
          <div className={classes["post-expand-link"]}>
            <span
              onClick={deleteHandler}
              className={classes["post-delete-link"]}
            >
              delete
            </span>
          </div>
        )}

        <div className={classes["post-date"]}>
          <p>
            {postTime.day} {postTime.month}
          </p>{" "}
          <span>
            {postTime.hour}:{postTime.min} {postTime.amPm}
          </span>
        </div>
      </div>

      {expand && (
        <div className={classes["post-expand"]}>
          <div className={classes["post-content"]}>
            <div className={classes["post-header"]}>
              <h2>{postData.title}</h2>

              <button>
                <img src={close} alt="close" onClick={hideModal} />
              </button>
            </div>
            <div className={classes["post-content-area"]}>
              {postData.description}
            </div>
            <Divider>Comments</Divider>
            <div className={classes["post-comment-area"]}>
              <div className={classes["post-comments"]}>
                <Comments data={comments} />
                {/* <div className={classes["post-comment-obj"]}>

                 
                </div> */}
              </div>
              <div className={classes["post-comment-input"]}>
                <form onSubmit={commentSubmitHandler}>
                  <textarea
                    value={enteredEditor}
                    onChange={editorChangeHandler}
                    placeholder="comment"
                  />
                  <Button type="submit" variant="contained">
                    submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardPost;
