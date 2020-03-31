import React, { createRef, useEffect } from "react";
import Conversation from "./Conversation";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Slide
} from "@material-ui/core";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConversationList = ({
  conversations,
  editConversation,
  delConversation
}) => {
  const classes = useStyles();
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
        <Typography variant="h5" className={classes.title}>
          Conversations
        </Typography>
        <CardContent>
          {conversations.map((conversation, index) => (
            <div key={index}>
              <Typography variant="caption">Amir Dambatta</Typography>
              <Conversation
                editConversation={editConversation}
                conversation={conversation.text}
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
