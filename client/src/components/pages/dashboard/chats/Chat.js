import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Button } from "@mui/material";
import useInput from "../../../../hooks/use-input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import OnlineUser from "./OnlineUser";
import { format, render, cancel, register } from "timeago.js";
import ChatUser from "./ChatUser";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import AdminUsers from "./AdminUsers";
import { useSearchParams } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import CommentInput from "../CommentInput";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import useWindowDimensions from "../../../../hooks/use-windowSize";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { AuthContext } from "../../../../context/auth-context";

export default function Chat() {
  const auth = useContext(AuthContext);
  const { width } = useWindowDimensions();

  const [currentChat, setCurrentChat] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [mobileChat, setMobileChat] = useState(true);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  // const socket = useRef();

  const scrollRef = useRef();

  const userInfo = useSelector((state) => state.userInfo);
  const [currentUser, setUser] = useState(userInfo);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8000");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("adduser", currentUser.userId);
  //   socket.current.on("getUsers", (users) => {});
  // }, []);

  const {
    value: enteredEditor,
    isValid: enteredEditorIsValid,
    hasEror: editorInputHasEror,
    valueChangeHandler: editorChangeHandler,
    inputBlurHandler: editorBlurHandler,
    reset: resetEditorInput,
  } = useInput((value) => value.trim() !== "");

  const getAllConversations = async (e) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/${currentUser.userId}`
      );

      const responseData = await response.json();

      const receiverId = responseData[0].members[1];

      const userDatares = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/userdata/${receiverId}`
      );
      const userData = await userDatares.json();

      setReceiver((prev) => {
        return { ...userData };

        // (prev.userId = userData.userId), (prev.userAvatar = userData.userAvatar),(prev.userName= userData.userName);
      });

      const recResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/userdata/${receiverId}`
      );

      const recResData = await recResponse.json();

      if (recResData !== null) {
        setUsers((prev) => [recResData]);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const chatSubmitHandler = async (inputText) => {
    const message = {
      sender: currentUser.userId,
      text: inputText,
      conversationId: currentChat._id,
    };

    // socket.current.on("sendMessage", {
    //   senderId: currentUser.userId,
    //   receiverId: receiver.userId,
    //   text: inputText,
    // });

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/post`, {
        method: "post",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      }).then((res) => {
        refreshHandler();
      });
    } catch (err) {
      console.log(`Could not post chat message ${err}`);
    }
  };

  // useEffect(() => {
  //   getAllConversations();
  // }, [currentUser]);

  const getConvTwoIds = async (receiverId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/find/${currentUser.userId}/${receiverId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      const userDatares = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/userdata/${receiverId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userData = await userDatares.json();

      setReceiver(userData);

      setCurrentChat(responseData);
    } catch (err) {
      console.log(`Could not get conversation between two ids ${err} `);
    }
  };

  const chatBoxLoader = (userid) => {
    setMobileChat((prev) => !prev);
    getConvTwoIds(userid);
  };

  useEffect(() => {
    const getMessages = async (chatId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/message/${chatId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        setMessages(responseData);
      } catch (err) {
        console.log(`Could not get messages ${err}`);
      }
    };
    getMessages(currentChat._id);
  }, [currentChat, refresh]);

  const getAdminUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/all-users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      const result = responseData.filter(
        (user) => user.userId !== userInfo.userId
      );

      setAdminUsers(result);
    } catch (err) {
      console.log(`Could not get users ${err}`);
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  console.log("cuuur", currentChat);

  return (
    <div className="chat__page">
      <Grid container className="chat__container">
        {width > 600 ? (
          <>
            {" "}
            <Grid sm={4} sx={{ height: "100%" }}>
              {" "}
              <div className="chat__online">
                <h3 style={{ borderBottom: "1px solid" }}>Users available</h3>
                <List
                  sx={{
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    paddingTop: "0",

                    overflowY: "auto",
                  }}
                >
                  {/* {users.length > 0
            ? users.map((user) => {
                return (
                  <OnlineUser
                    onlineUsers={onlineUsers}
                    currentId={user.userId}
                    user={user}
                    onClick={chatBoxLoader}
                  />
                );
              }) */}
                  {adminUsers.map((user) => {
                    return (
                      <AdminUsers
                        key={user.userId}
                        adminUsers={adminUsers}
                        currentId={user.userId}
                        user={user}
                        onClick={chatBoxLoader}
                      />
                    );
                  })}
                </List>
              </div>
            </Grid>
            <Grid sm={8} sx={{ height: "100%" }}>
              <div className="chat__section">
                {currentChat._id ? (
                  <>
                    <h3 style={{ borderBottom: "1px solid " }}>
                      {receiver.username ? receiver.username : "Chat Section"}
                    </h3>

                    <Box
                      sx={{
                        height: "80%",
                        overflow: "hidden",
                      }}
                    >
                      <List
                        sx={{
                          height: "100%",
                          overflowY: "auto",
                          width: "100%",
                          bgcolor: "##f9f9f9",
                          paddingTop: "0",
                          padding: "0 10px",
                        }}
                        className="chat__section-content"
                      >
                        {messages.map((msg) => {
                          return (
                            <div ref={scrollRef}>
                              <ChatUser
                                key={msg.conversationId}
                                msg={msg}
                                user={
                                  msg.sender === currentUser.userId
                                    ? currentUser
                                    : receiver
                                }
                              />
                            </div>
                          );
                        })}
                      </List>
                    </Box>

                    <div className="chat__input-container">
                      <CommentInput
                        placeHolder={"Send a message"}
                        sendBtnText={"Send"}
                        onSubmit={chatSubmitHandler}
                      />
                    </div>
                  </>
                ) : (
                  <div className="fallback__chat">
                    <h1>Open a Conversation to start a chat</h1>
                  </div>
                )}
              </div>
            </Grid>
          </>
        ) : (
          <>
            {mobileChat ? (
              <Grid sm={4} xs={12} sx={{ height: "100%" }}>
                {" "}
                <div className="chat__online">
                  {" "}
                  <h3 style={{ borderBottom: "1px solid " }}>
                    Users available
                  </h3>
                  <List
                    sx={{
                      width: "100%",
                      maxHeight: "100%",

                      overflowY: "auto",
                      bgcolor: "background.paper",
                      paddingTop: "0",
                    }}
                  >
                    {/* {users.length > 0
            ? users.map((user) => {
                return (
                  <OnlineUser
                    onlineUsers={onlineUsers}
                    currentId={user.userId}
                    user={user}
                    onClick={chatBoxLoader}
                  />
                );
              }) */}
                    {adminUsers.map((user) => {
                      return (
                        <AdminUsers
                          key={user.userId}
                          adminUsers={adminUsers}
                          currentId={user.userId}
                          user={user}
                          onClick={chatBoxLoader}
                        />
                      );
                    })}
                  </List>
                </div>
              </Grid>
            ) : (
              <Grid sm={8} xs={12} sx={{ height: "100%" }}>
                <div className="chat__section">
                  {currentChat ? (
                    <>
                      <Grid container sx={{ borderBottom: "1px solid" }}>
                        <Grid xs={11}>
                          {" "}
                          <h3>
                            {receiver.username
                              ? receiver.username
                              : "Chat Section"}
                          </h3>
                        </Grid>
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          xs={1}
                        >
                          <CloseFullscreenIcon
                            onClick={() => setMobileChat((prev) => !prev)}
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ height: "80%", overflow: "hidden" }}>
                        <List
                          sx={{
                            width: "100%",
                            bgcolor: "##f9f9f9",
                            paddingTop: "0",
                            overflowY: "auto",
                            padding: "0 10px",
                          }}
                          className="chat__section-content"
                        >
                          {messages.map((msg) => {
                            return (
                              <div ref={scrollRef}>
                                <ChatUser
                                  key={msg.conversationId}
                                  msg={msg}
                                  user={
                                    msg.sender === currentUser.userId
                                      ? currentUser
                                      : receiver
                                  }
                                />
                              </div>
                            );
                          })}
                        </List>
                      </Box>

                      <div className="chat__input-container">
                        <CommentInput
                          placeHolder={"Send a message"}
                          sendBtnText={"Send"}
                          onSubmit={chatSubmitHandler}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="fallback__chat">
                      <h1>Open a Conversation to start a chat</h1>
                    </div>
                  )}
                </div>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}
