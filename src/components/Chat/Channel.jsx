import React,{useState,useContext} from 'react'
import {List,ListItem,ListItemIcon,Menu,MenuItem,Dialog,DialogContent,TextField,Button,IconButton,ListItemText,DialogTitle,DialogActions,Snackbar} from "@material-ui/core"
import {MoreVert} from "@material-ui/icons"
import {ChannelsContext} from "../ContextApi/ChannelsContext"
import {Alert} from "@material-ui/lab"
const Channel = ({channel,mess,index}) => {
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
        editChannel(channel._id, text);
        setText("");
        dialogClose();
        handleClose()
        // console.log(text);
      };
      const showSnackBar =()=> {
      return  <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success">{mess}</Alert>
      </Snackbar>
      }
      
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
              <ListItemText>{channel.title}</ListItemText>
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
                if(window.confirm("Are you sure?"))
                delChannel(channel._id);
                showSnackBar()
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
