import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Chat, Room } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "rgba(2,0,36)",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(67,67,198,1) 0%, rgba(0,212,255,1) 100%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(23, 105, 135, .3)",
    height: "90vh",
    overflow: "auto"
  },
  title: {
    textAlign: "center"
  },
  room: {
    marginTop: theme.spacing(2)
  }
}));
const ChannelList = ({ channels }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        <Room className={classes.room} /> Channels
      </Typography>
      {channels.map((channel, index) => (
        <List key={index}>
          <ListItem button>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText>{channel.name}</ListItemText>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default ChannelList;
