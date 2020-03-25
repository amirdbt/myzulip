import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import UserAccount from "./UserAccount";
import UserDashboard from "./UserDashboard";
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4)
  }
}));

const User = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    firstname: "Iman",
    lastname: "Wada",
    email: "iman.wada@yahoo.com",
    phone: "08022032332",
    state: "Abuja",
    country: "Nigeria",
    img:
      "https://pbs.twimg.com/profile_images/1195874236675624960/8cBE9ek__400x400.jpg"
  });

  const removePicture = () => {
    const userObj = user;
    userObj["img"] = null;
    setUser(userObj);
  };
  return (
    <div>
      {console.log(user)}
      <Navbar />
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <UserDashboard
              user={user}
              setUser={setUser}
              removePicture={removePicture}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <UserAccount user={user} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default User;
