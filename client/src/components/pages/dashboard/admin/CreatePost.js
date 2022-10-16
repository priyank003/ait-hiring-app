import React, { useEffect, useContext } from "react";
import classes from "./CreatePost.module.css";
import close from "../../../../assets/logos/close_black_24dp.svg";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import useInput from "../../../../hooks/use-input";
import axios from "axios";
import { AuthContext } from "../../../../context/auth-context";
import { useSelector } from "react-redux";

// import "firebase/storage";
// import { storage, firebase } from "../../../../firebase";
const CreatePost = ({ hideCreatePost }) => {
  const auth = useContext(AuthContext);
  const userInfo = useSelector((state) => state.userInfo);
  // const [editorText, setEditorText] = useState("");
  const [editorText, setEditorText] = useState("");
  const [shareImg, setShareImg] = useState("");
  const [videolink, setVideoLink] = useState("");
  // eslint-disable-next-line
  const [assetArea, setAssetArea] = useState("");
  // eslint-disable-next-line
  const switchAssetArea = (area) => {
    setShareImg("");
    setVideoLink("");
    setAssetArea(area);
  };

  const handelChange = (e) => {
    const image = e.target.files[0];

    setShareImg(image);
  };

  // eslint-disable-next-line
  const rest = (e) => {
    setEditorText("");
    setShareImg("");
    setVideoLink("");
    setAssetArea("");
  };

  //createpost form
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasEror: titleInputHasEror,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resettitleInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredCompany,
    isValid: enteredCompanyIsValid,
    hasEror: companyInputHasEror,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompanyInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredEditor,
    isValid: enteredEditorIsValid,
    hasEror: editorInputHasEror,
    valueChangeHandler: editorChangeHandler,
    inputBlurHandler: editorBlurHandler,
    reset: resetEditorInput,
  } = useInput((value) => value.trim() !== "");

  const submitHandler = (e) => {
    e.preventDefault();
    const notice = {
      title: enteredTitle,
      description: enteredEditor,
      author: userInfo.userId,
    };
    addPostHandler(notice);
  };
  const userCookie = useSelector((state) => state.userInfo.cookie);

  
  async function addPostHandler(notice) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/create`, {
      method: "POST",
      body: JSON.stringify(notice),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    });
    const noticeData = await response.json();
    if (noticeData.status === "ok") {
      hideCreatePost();
    }
  }

  //image uploadfirebase

  const storage = {};

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };


  let formIsValid = false;

  if (enteredTitleIsValid && enteredEditorIsValid) {
    formIsValid = true;
  }

  return (
    <div className={classes["create-post"]}>
      <div className={classes["create-content"]}>
        <div className={classes["content-header"]}>
          <h2>Create a Post</h2>
          <button>
            {" "}
            <img src={close} alt="close" onClick={hideCreatePost} />
          </button>
        </div>
        <div className={classes["post-form"]}>
          <form onSubmit={submitHandler}>
            <div className={classes["form-input"]}>
              {" "}
              <input
                type="text"
                placeholder=" Enter the Title of the post"
                onChange={titleChangeHandler}
                value={enteredTitle}
              />
              {/* <input
                type="text"
                placeholder="concerned corporate"
                onChange={companyChangeHandler}
                value={enteredCompany}
              /> */}
            </div>

            <div className={classes["content-area"]}>
              <textarea
                value={enteredEditor}
                onChange={editorChangeHandler}
                placeholder="Create Announemcement"
              />
              {/* 
              <div className={classes["upload-image"]}>
                <input
                  type="file"
                  accept="asset/gif,asset/jpeg, asset/png, asset/pdf"
                  name="assest"
                  id="file"
                  style={{ display: "block" }}
                  onChange={handleImageAsFile}
                />
                <p>
                  <label htmlFor="file">Select an file to share</label>
                </p>
                {imageAsFile && (
                  // <img src={URL.createObjectURL(shareImg)} alt=""></img>
                  <img src={imageAsUrl} alt="img" />
                )}

                <input
                  type="text"
                  placeholder="please upload video link"
                  value={videolink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />

                {videolink && <ReactPlayer width="100%" url={videolink} />}
              </div> */}
            </div>

            <button
              type="submit"
              className={classes["post-btn"]}
              // disabled={!formIsValid}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
