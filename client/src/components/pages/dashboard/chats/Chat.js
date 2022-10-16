import React, { useEffect, useRef, useState } from "react";
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
export default function Chat() {
  const [currentChat, setCurrentChat] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);

  const socket = useRef();

  const scrollRef = useRef();

  const userInfo = useSelector((state) => state.userInfo);
  const [user, setUser] = useState({
    userId: userInfo.userId,
    userName: userInfo.name,
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("adduser", user.userId);
    socket.current.on("getUsers", (users) => {});
  }, []);

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
        `${process.env.REACT_APP_BACKEND_URL}/conversation/${user.userId}`
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

  const chatSubmitHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.userId,
      text: enteredEditor,
      conversationId: currentChat._id,
    };

    socket.current.on("sendMessage", {
      senderId: user.userId,
      receiverId: receiver.userId,
      text: enteredEditor,
    });

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/message`, {
        method: "post",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllConversations();
  }, [user]);

  const getConvTwoIds = async (receiverId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/conversation//find/${user.userId}/${receiverId}`
    );
    const responseData = await response.json();

    setCurrentChat(responseData);
  };

  const chatBoxLoader = (userid) => {
    getConvTwoIds(userid);
  };

  useEffect(() => {
    const getMessages = async (chatId) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/message/${chatId}`
      );
      const responseData = await response.json();

      setMessages(responseData);
    };
    getMessages(currentChat._id);
  }, [currentChat]);

  const getAdminUsers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/all-users`
    );
    const responseData = await response.json();

    setAdminUsers(responseData);
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  return (
    <div className="chat__container">
      <div className="chat__online">
        {" "}
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <h3 style={{ textAlign: "center" }}>Alumni's available</h3>
          {users.length > 0
            ? users.map((user) => {
                return (
                  <OnlineUser
                    onlineUsers={onlineUsers}
                    currentId={user.userId}
                    user={user}
                    onClick={chatBoxLoader}
                  />
                );
              })
            : adminUsers.map((user) => {
                return (
                  <AdminUsers
                    adminUsers={adminUsers}
                    currentId={user.userId}
                    user={user}
                    onClick={chatBoxLoader}
                  />
                );
              })}

          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText primary=" Sandra Adams" />
          </ListItem> */}
        </List>
      </div>
      <div className="chat__section">
        {currentChat ? (
          <>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              className="chat__section-content"
            >
              {messages.map((msg) => {
                return (
                  <div ref={scrollRef}>
                    <ChatUser
                      msg={msg}
                      user={msg.sender === user.userId ? user : receiver}
                    />
                  </div>
                );
              })}
            </List>

            <div className="chat__input-container">
              <form onSubmit={chatSubmitHandler}>
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
          </>
        ) : (
          <div className="fallback__chat">
            <h1>Open a Conversation to start a chat</h1>
          </div>
        )}
      </div>
    </div>
  );
}
