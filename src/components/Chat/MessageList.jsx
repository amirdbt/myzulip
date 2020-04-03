import React, { useEffect, createRef, useContext } from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  Divider,
  Slide,
  ListItemText,
  AppBar,
  Toolbar
} from "@material-ui/core";
import Message from "./Message";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { UsersContext } from "../ContextApi/UsersContext";
import { UserContext } from "../ContextApi/UserContext";
import { MessagesContext } from "../ContextApi/MessagesContext";
import { ChannelsContext } from "../ContextApi/ChannelsContext";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    height: "83vh",
    flexGrow: 1,
    overflow: "auto"
  },
  btn: {
    float: "right",
    marginRight: "13px"
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessageList = () => {
  const [users, setUsers] = useContext(UsersContext);
  const [user] = useContext(UserContext);
  const [
    messages,
    addMessage,
    delMessage,
    editMessage,
    conversations,
    addConversation,
    getConversation,
    isLoading,
    deleteConversation,
    editConversation,
    mess,
    messAlert
  ] = useContext(MessagesContext);
  const [
    channels,
    setChannels,
    addChannel,
    delChannel,
    editChannel,
    getChannel,
    channel,
    addUser,
    error,
    err
  ] = useContext(ChannelsContext);

  const classes = useStyles();
  let history = useHistory();
  let index = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(index + 1);
  console.log(path);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let messagesEnd = createRef();
  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div>
      <Card className={classes.root}>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={handleClickOpen}
        >
          Add User
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Click on a user to add to channel
              </Typography>
            </Toolbar>
          </AppBar>
          {err ? <Alert severity="error">{error}</Alert> : <div></div>}
          {users.map((user, index) => (
            <List key={index}>
              <ListItem
                button
                onClick={() => {
                  if (window.confirm("Are you sure?")) addUser(path, user._id);
                }}
              >
                <ListItemText
                  primary={user.firstname}
                  secondary={user.lastname}
                />
              </ListItem>
              <Divider />
            </List>
          ))}
        </Dialog>
        <CardContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            messages.map((message, index) => {
              return (
                <div key={index}>
                  {message.channel_id === path ? (
                    <>
                      {users.map((user, index) => {
                        if (user._id === message.user) {
                          return (
                            <Typography variant="subtitle2">
                              {user.firstname} {user.lastname}
                            </Typography>
                          );
                        }
                      })}
                      <Message
                        delMessage={delMessage}
                        editMessage={editMessage}
                        message={message.msg}
                        conversation_id={message.conversation_id}
                        userMessage={message.user}
                        index={message._id}
                        path={path}
                        conversations={conversations}
                        addConversation={addConversation}
                        addMessage={addMessage}
                        getConversation={getConversation}
                        deleteConversation={deleteConversation}
                        editConversation={editConversation}
                        mess={mess}
                        messAlert={messAlert}
                      />{" "}
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })
          )}
          <div
            style={{
              float: "left",
              clear: "both",
              height: "30px",
              width: "100%"
            }}
            ref={el => {
              messagesEnd = el;
            }}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageList;
