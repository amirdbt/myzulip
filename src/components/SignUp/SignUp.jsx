import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let history = useHistory();

  const onChangeFirstName = event => {
    const { value } = event.target;
    setFirstName(value);
    // console.log(value);
  };
  const onChangeLastName = event => {
    const { value } = event.target;
    setLastName(value);
    // console.log(value);
  };
  const onChangeEmail = event => {
    const { value } = event.target;
    setEmail(value);
    // console.log(value);
  };
  const onChangePassword = event => {
    const { value } = event.target;
    setPassword(value);
    // console.log(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      firstname === "" &&
      lastname === "" &&
      email === "" &&
      password === ""
    ) {
      setError(true);
      history.push("/");
    } else {
      history.push("/dashboard");
      console.log("Done");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                variant="outlined"
                error={error}
                required
                fullWidth
                id="firstname"
                label="First Name"
                value={firstname}
                onChange={onChangeFirstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastname"
                variant="outlined"
                error={error}
                required
                fullWidth
                id="lastname"
                label="Last Name"
                value={lastname}
                onChange={onChangeLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                error={error}
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                error={error}
                type="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                value={password}
                onChange={onChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
