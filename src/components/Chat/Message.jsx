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
  Button
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  ty: {
    flexGrow: 8
  },
  card:{
      height: '10vh',
      marginBottom: theme.spacing(3)
  },
}));

const Message = ({ message, delMessage, index,editMessage }) => {
    const [open,setOpen] = useState(false)
    const [text,setText] = useState('')

    const handleChange =(event) =>{
        const {value} = event.target 
        setText(value)
        // console.log(value);
    }

    const handleSubmit =(event)=>{
        event.preventDefault()
        editMessage(index,text)
        setText('')
        handleClose()
        // console.log(text);
    }

    const handleClickOpen =() =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.root}>
          <Typography className={classes.ty}> {message}</Typography>
          <div className={classes.icons}>
            <IconButton onClick={handleClickOpen}>
              <Edit  />
            </IconButton>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="edit-form">
                <DialogTitle id="edit-form">
                    Edit Message
                </DialogTitle>
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
                    <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
                    <Button  color="primary" onClick={handleSubmit} variant="outlined">Submit</Button>
                </DialogActions>
            </Dialog>
            <IconButton onClick={()=>{delMessage(index)}}>
              <Delete />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Message;
