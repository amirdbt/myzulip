import React, { createRef, useEffect,useContext } from "react";
import Conversation from "./Conversation";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {UserContext} from "../ContextApi/UserContext"

const useStyles = makeStyles(theme => ({
  root: {
    height: "83vh",
    flexGrow: 1,
    overflow: "auto"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center"
  }
}));


const ConversationList = ({
  conversations,
  editConversation,
  delConversation,
  message
}) => {
  const classes = useStyles();
  let messagesEnd = createRef();
  const [user] = useContext(UserContext)
  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div>
      <Card className={classes.root}>
        <Typography variant="h5" className={classes.title}>
         Topic: {message}
        </Typography>
        <CardContent>
          {conversations.map((conversation, index) => (
            <div key={index}>
              <Typography variant="caption">{conversation.firstname} {conversation.lastname}</Typography>
              <Conversation
                editConversation={editConversation}
                conversation={conversation.text}
                email ={conversation.email}
                delConversation={delConversation}
                index={index}
              />
            </div>
          ))}
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

export default ConversationList;
