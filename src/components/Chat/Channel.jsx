import React,{useState,useContext} from 'react'
import {List,ListItem,ListItemIcon,Menu,MenuItem,Dialog,DialogContent,TextField,Button,IconButton,ListItemText,DialogTitle,DialogActions} from "@material-ui/core"
import {MoreVert} from "@material-ui/icons"
import {ChannelsContext} from "../ContextApi/ChannelsContext"

const Channel = ({channel,index}) => {
    const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [channels, setChannels, addChannel, delChannel,editChannel] = useContext(ChannelsContext)

    const handleChange = event => {
        const { value } = event.target;
        setText(value);
        // console.log(value);
      };
    const handleSubmit = event => {
        event.preventDefault();
        editChannel(index, text);
        setText("");
        dialogClose();
        handleClose()
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
    )
}

export default Channel
