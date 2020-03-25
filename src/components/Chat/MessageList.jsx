import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles({
  root: {
    height: "90vh",
    flexGrow: 1,
    overflow: "auto"
  }
});

const MessageList = ({ messages, delMessage,editMessage }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <Typography variant="subtitle2">Amir Dambatta</Typography>
                {/* <SnackbarContent message={message.text} /> <br /> */}
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
