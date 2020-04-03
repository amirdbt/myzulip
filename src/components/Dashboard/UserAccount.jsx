import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import { UserContext } from "../ContextApi/UserContext";


const useStyles = makeStyles(() => ({
  root: {}
}));

const UserAccount = props => {
  const { className, ...rest } = props;
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [user, setUser, updateUser, deleteUser] = useContext(UserContext);

  const classes = useStyles();

  const handlePhone = event => {
    const { value } = event.target;
    setPhone(value);
  };

  const handleState = event => {
    const { value } = event.target;
    setState(value);
  };

  const handleCountry = event => {
    const { value } = event.target;
    setCountry(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    updateUser(phone, state, country);
    setPhone("");
    setState("");
    setCountry("");
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card {...rest} className={classes.root}>
        <CardHeader subheader="Complete your profile" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handlePhone}
                type="number"
                value={phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleState}
                required
                value={state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleCountry}
                required
                value={country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" onClick={handleSubmit} variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
export default UserAccount;
