import React, { useState,useContext } from "react";
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
import { Delete, Edit } from "@material-ui/icons";
import CommentIcon from "@material-ui/icons/Comment";
import "emoji-mart/css/emoji-mart.css";
import CloseIcon from "@material-ui/icons/Close";
import { Picker } from "emoji-mart";
import ConversationList from "./ConversationList";
import SendThreadForm from "./SendThreadForm";
import {UserContext} from "../ContextApi/UserContext"
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
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Message = ({ message, delMessage, index, editMessage ,email}) => {
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [text, setText] = useState("");
  const [user] = useContext(UserContext)
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  let history = useHistory();
  let val = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(val + 1);
  
  const [conversations, setConversations] = useState([
    {
      firstname: "Amir",
      lastname: "Dambatta",
      email: "ahmedhassan007873@gmail.com",   
      text: "Hey, how is it going?"
    },
    {
      firstname: "Sadiq",
      lastname: "Dambatta",
      email: "sadd@yahoo.com",
      text: "Great! How about you?"
    },
    {
      firstname: "Cristiano",
      lastname: "Ronaldo",
      email: "yuyu@yahoo.com",
      text: "Good to hear! I am great as well"
    }
  ]);
  const editConversation = (index,firstname,lastname,email, text) => {
    const newConversations = [...conversations];
    newConversations.splice(index, 1, {firstname,lastname,email, text });
    setConversations(newConversations);
  };
  const delConversation = index => {
    const newConversations = [...conversations];
    newConversations.splice(index, 1);
    setConversations(newConversations);
  };

  const addConversation = (firstname,lastname,email,text) => {
    const newConversations = [...conversations, { firstname,lastname,email,text }];
    setConversations(newConversations);
  };
  const EmojiOn = () => {
    setShowEmoji(!showEmoji);
  };

  const onEmojiClick = event => {
    setChosenEmoji(event.native);
    setText(text + chosenEmoji);
  };

  const handleChange = event => {
    const { value } = event.target;
    setText(value);
    // console.log(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    editMessage(index,path,user.firstname,user.lastname,user.email, text);
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
  return (
    <Card className={classes.card}>
         
      <CardContent>
        <div className={classes.root}>
          <Typography className={classes.ty}> {message}</Typography>
          <div className={classes.icons}>
            <Tooltip title="Start Conversation" arrow>
              <IconButton onClick={handleClickOpenD}>
                <Badge color="primary" badgeContent={conversations.length}>
                <CommentIcon />
                </Badge>
              </IconButton>
            </Tooltip>
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
                delConversation={delConversation}
                editConversation={editConversation}
                conversations={conversations}
                message={message}
              />
              <SendThreadForm addConversation={addConversation} />
            </Dialog>
            { user.email === email ? (
               <Tooltip title="Edit Message" arrow>
               <IconButton onClick={handleClickOpen}>
                 <Edit />
               </IconButton>
             </Tooltip>
            ) : <div></div>}
           
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
                <span>
                  {showEmoji ? (
                    <Card style={styles.emojiPicker}>
                      {" "}
                      <Picker onSelect={onEmojiClick} title="MyZulip" />
                    </Card>
                  ) : (
                    <div></div>
                  )}
                  <p style={styles.getEmojiButton} onClick={EmojiOn}>
                    {String.fromCodePoint(0x1f60a)}
                  </p>
                </span>
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
            {user.email === email ? (
                 <Tooltip title="Delete Message" arrow>
                 <IconButton
                   onClick={() => {
                     delMessage(index);
                   }}
                 >
                   <Delete />
                 </IconButton>
               </Tooltip>
            ): (
              <div></div>
            )}
           
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Message;
const styles = {
  getEmojiButton: {
    cssFloat: "right",
    border: "solid",
    margin: 0,
    cursor: "pointer",
    bottom: 10
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};
