import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
  Slide,
  Toolbar,
  AppBar,
  Badge
} from "@material-ui/core";
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import CommentIcon from "@material-ui/icons/Comment";
import "emoji-mart/css/emoji-mart.css";
import CloseIcon from "@material-ui/icons/Close";
import ConversationList from "./ConversationList";
import SendThreadForm from "./SendThreadForm";
import { UserContext } from "../ContextApi/UserContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  ty: {
    flexGrow: 8
  },
  card: {
    height: "10vh",
    marginBottom: theme.spacing(3)
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center"
  },
  em: {
    marginTop: "-40px",
    marginRight: "30px"
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Message = ({
  message,
  delMessage,
  index,
  editMessage,
  userMessage,
  conversations,
  addConversation,
  addMessage,
  getConversation,
  conversation_id,
  deleteConversation,
  editConversation,
  mess,
  messAlert
}) => {
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [text, setText] = useState("");
  const [user] = useContext(UserContext);
  let history = useHistory();
  let val = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(val + 1);

  const handleChange = event => {
    const { value } = event.target;
    setText(value);
    // console.log(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    editMessage(index, text);
    setText("");
    handleClose();
    // console.log(text);
  };
  const handleClickOpenD = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const conversationLength =
    conversation_id === null ? <div>0</div> : conversations.length;
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.root}>
          <Typography className={classes.ty}> {message}</Typography>
          <div className={classes.icons}>
            {conversation_id === null ? (
              <Tooltip title="Click to start Conversation" arrow>
                <IconButton
                  onClick={() => {
                    addConversation(index);
                  }}
                >
                  <Badge color="primary">
                    <PostAdd />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <div></div>
            )}

            {conversation_id !== null ? (
              <Tooltip title="View Conversation" arrow>
                <IconButton
                  onClick={() => {
                    getConversation(conversation_id);
                    handleClickOpenD();
                  }}
                >
                  <Badge color="primary" badgeContent={conversationLength}>
                    <CommentIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <div></div>
            )}

            <Dialog
              fullScreen
              open={openD}
              onClose={handleCloseD}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseD}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Start a conversation
                  </Typography>
                </Toolbar>
              </AppBar>
              <ConversationList
                deleteConversation={deleteConversation}
                conversations={conversations}
                conversation_id={conversation_id}
                message={message}
                editConversation={editConversation}
                mess={mess}
                messAlert={messAlert}
              />
              <SendThreadForm
                conversation_id={conversation_id}
                addMessage={addMessage}
              />
            </Dialog>
            {user._id === userMessage ? (
              <Tooltip title="Edit Message" arrow>
                <IconButton onClick={handleClickOpen}>
                  <Edit />
                </IconButton>
              </Tooltip>
            ) : (
              <div></div>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="edit-form"
            >
              <DialogTitle id="edit-form">Edit Message</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    label="Message"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    fullWidth
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  variant="outlined"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            {user._id === userMessage ? (
              <Tooltip title="Delete Message" arrow>
                <IconButton
                  onClick={() => {
                    if (window.confirm("Are you sure?")) delMessage(index);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Message;
