import React, { useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Chat, Room, MoreVert } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "rgba(2,0,36)",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(67,67,198,1) 0%, rgba(0,212,255,1) 100%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(23, 105, 135, .3)",
    height: "83vh",
    overflow: "auto"
  },
  title: {
    textAlign: "center"
  },
  room: {
    marginTop: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
}));
const ChannelList = ({ channels, delChannel, editChannel }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleChange = event => {
    const { value } = event.target;
    setText(value);
    // console.log(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // editChannel(index, text);
    setText("");
    dialogClose();
    // console.log(text);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dialogOpen = () => {
    setOpen(true);
  };
  const dialogClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        <Room className={classes.room} /> Channels
      </Typography>
      {channels.map((channel, index) => (
        <Link className={classes.link} to={`/chat/${index}`}>
          <List key={index}>
            <ListItem button>
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText>{channel.name}</ListItemText>
            </ListItem>
          </List>
        </Link>
      ))}
      <Divider />
      {channels.map((channel, index) => (
        <>
          <List key={index}>
            <ListItem button>
              <ListItemIcon>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </ListItemIcon>
              <ListItemText>{channel.name}</ListItemText>
            </ListItem>
          </List>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={dialogOpen}>Edit</MenuItem>
            <Dialog
              open={open}
              onClose={dialogClose}
              aria-labelledby="edit-channel"
            >
              <DialogTitle id="edit-channel">Edit Channel</DialogTitle>
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
                  onClick={dialogClose}
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
            <MenuItem
              onClick={() => {
                delChannel(index);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ))}
    </div>
  );
};

export default ChannelList;
