import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Typography,
  LinearProgress,
  Avatar,
  Tooltip
} from "@material-ui/core";
import { UserContext } from "../ContextApi/UserContext";


const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  input: {
    display: "none"
  }
}));

const UserDashboard = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [count, setCount] = useState(50);
  const [user,setUser,updateUser,deleteUser] = useContext(UserContext);

  useEffect(() => {
    checkPogress();
  }, []);

  const checkPogress = () => {
    if (
      user.phone !== "" &&
      user.state !== "" &&
      user.country !== "" &&
      user.img !== ""
    ) {
      setCount(count + 50);
    } else if (user.phone !== "" || user.state !== "" || user.country !== "") {
      setCount(count + 40);
    } else if (user.phone !== "" || user.state !== "") {
      setCount(count + 30);
    } else if (user.phone !== "") {
      setCount(count + 10);
    }
  };

  return (
    <Card {...rest} className={classes.root}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.firstname} {user.lastname}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.state}, {user.country}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.phone}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {moment().format("hh:mm A")} ('GMT+1')
            </Typography>
          </div>

          <Avatar className={classes.avatar} />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">
            Profile Completeness: {count}%
          </Typography>
          <LinearProgress value={count} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
  
        <Tooltip title="Deactivate Account" arrow>
        <Button variant="contained" color="secondary" onClick={()=>{if(window.confirm('Are you sure you want to deactivate your account?')) deleteUser()}}>Deactivate Account</Button>
      
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default UserDashboard;
