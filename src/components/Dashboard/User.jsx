import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import UserAccount from "./UserAccount";
import UserDashboard from "./UserDashboard";
import Navbar from "../Navbar/Navbar";
import {useHistory} from "react-router-dom"
import {getJwt} from "../../helpers/jwt"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4)
  }
}));

const User = () => {
  const classes = useStyles();
  const token = getJwt()
  let history = useHistory()
  return (
    <div>
      { 
       token ? (<div> <Navbar />
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <UserDashboard />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <UserAccount />
          </Grid>
        </Grid>
      </div> </div>) : ( history.push("/signin")) }
     
    </div>
  );
};

export default User;
