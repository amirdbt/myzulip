import React, { useState, useContext } from "react";
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
  Tooltip
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { UserContext } from "../ContextApi/UserContext";
import { Alert } from "@material-ui/lab";

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

const Conversation = ({
  conversation,
  editConversation,
  index,
  deleteConversation,
  userCon,
  mess
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [user] = useContext(UserContext);
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
    <>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.root}>
            <Typography className={classes.ty}>{conversation}</Typography>
            <div className={classes.icons}>
              {user._id === userCon ? (
                <>
                  <Tooltip title="Edit" arrow>
                    <IconButton onClick={dialogOpen}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() => {
                        if (window.confirm("Are you sure?"))
                          deleteConversation(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <div></div>
              )}
            </div>

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
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Conversation;
