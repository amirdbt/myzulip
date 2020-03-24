import React from "react";
import {
  Card,
  CardContent,
  makeStyles,
  SnackbarContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "90vh",
    flexGrow: 1,
    overflow: 'auto'
  }
});

const MessageList = ({ messages }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <Typography variant="subtitle2">Amir Dambatta</Typography>
                <SnackbarContent message={message.text} /> <br />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageList;
