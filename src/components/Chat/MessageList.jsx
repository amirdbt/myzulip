import React, { useEffect, createRef,useContext } from "react";
import { Card, CardContent, makeStyles, Typography,Button,Dialog,IconButton, List,ListItem,Divider,Slide,ListItemText,AppBar,Toolbar } from "@material-ui/core";
import Message from "./Message";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close"
import {UsersContext} from "../ContextApi/UsersContext"

const useStyles = makeStyles(theme =>({
  root: {
    height: "83vh",
    flexGrow: 1,
    overflow: "auto"
  },
  btn:{
    float: "right",
   marginRight: "13px"
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
   textAlign: "center"
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessageList = ({ messages, delMessage, editMessage }) => {
  const [users, setUsers, isLoading] = useContext(UsersContext);
  const classes = useStyles();
  let history = useHistory();
  let index = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(index + 1);
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
      <Button variant="outlined" className={classes.btn} onClick={handleClickOpen}>Add User</Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>Click on a user to add to channel</Typography>
          </Toolbar>
        </AppBar>
        {users.map(user => (
          <List>
          <ListItem button>
            <ListItemText primary={user.firstname} secondary={user.lastname} />
          </ListItem>
          <Divider />
          </List>
                ))}
        
      
      </Dialog>
        <CardContent>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <Typography variant="subtitle2">Amir Dambatta</Typography>
                <Message
                  delMessage={delMessage}
                  editMessage={editMessage}
                  message={message.text}
                  index={index}
                />
              </div>
            );
          })}
          <div
            style={{
              float: "left",
              clear: "both",
              height: "30px",
              width: "100%",
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
