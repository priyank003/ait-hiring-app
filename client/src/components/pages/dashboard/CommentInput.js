import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function CommentInput({ onSubmit, placeHolder, sendBtnText }) {
  const [input, setInput] = React.useState("");
  const userInfo = useSelector((state) => state.userInfo);
  const inputRef = React.useRef();

  const inputSubmitHandler = () => {
    onSubmit(input);
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <List sx={{ width: "100%", padding: "10px 0" }}>
      <ListItem alignItems="flex-start" sx={{ width: "100%" }}>
        <ListItemAvatar>
          <Avatar> {userInfo.username[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <TextField
                id="input-with-icon-textfield"
                label={placeHolder}
                variant="standard"
                sx={{ width: "100%" }}
                ref={inputRef}
                onChange={changeHandler}
              />
              <Box>
                {" "}
                <Button variant="text">Cancel</Button>
                <Button
                  variant="text"
                  onClick={inputSubmitHandler}
                  disabled={!input}
                >
                  {sendBtnText}
                </Button>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
