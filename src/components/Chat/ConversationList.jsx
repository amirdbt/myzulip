import React, { createRef, useEffect, useContext } from "react";
import Conversation from "./Conversation";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { UsersContext } from "../ContextApi/UsersContext";

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
  deleteConversation,
  message,
  conversation_id,
  mess,
  messAlert
}) => {
  const classes = useStyles();
  let messagesEnd = createRef();
  const [users] = useContext(UsersContext);
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
        {messAlert ? <Alert severity="success">{mess}</Alert> : <div></div>}
        <CardContent>
          {conversations.length > 0 ? (
            conversations.map((conversation, index) => (
              <div key={index}>
                {users.map((user, index) => {
                  if (user._id === conversation.user) {
                    return (
                      <Typography variant="caption">
                        {user.firstname} {user.lastname}
                      </Typography>
                    );
                  }
                })}
                <Conversation
                  index={conversation._id}
                  editConversation={editConversation}
                  conversation={conversation.msg}
                  userCon={conversation.user}
                  deleteConversation={deleteConversation}
                  mess={mess}
                />
              </div>
            ))
          ) : (
            <div></div>
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

export default ConversationList;
