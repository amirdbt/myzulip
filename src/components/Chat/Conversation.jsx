import React,{useState} from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  ty: {
    flexGrow: 8
  },
  card: {
    height: "9vh",
    marginBottom: theme.spacing(3)
  }
}));

const Conversation = ({ conversation,editConversation,index ,delConversation}) => {
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
    editConversation(index, text);
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
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.root}>
          <Typography className={classes.ty}>{conversation}</Typography>
          <div className={classes.icons}>
              <Tooltip title="More Actions" arrow>
            <IconButton  onClick={handleClick}>
              <MoreVert />
            </IconButton>
            </Tooltip>
          </div>
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
              <DialogTitle id="edit-channel">Edit Conversation</DialogTitle>
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
                delConversation(index)
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </CardContent>
    </Card>
  );
};

export default Conversation;
