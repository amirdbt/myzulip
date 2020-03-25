import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Message from "./Message";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: "83vh",
    flexGrow: 1,
    overflow: "auto"
  }
});

const MessageList = ({ messages, delMessage, editMessage }) => {
  const classes = useStyles();
  let history = useHistory();
  let index = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(index + 1);

  return (
    <div>
      <Card className={classes.root}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageList;
