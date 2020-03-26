import React, { useState, useContext } from "react";
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
import axios from "axios";

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

const SignIn = () => {
  const classes = useStyles();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const onChangeEmail = event => {
    const { value } = event.target;
    setEmail(value);
  };
  const onChangePassword = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (email === "" && password === "") {
      setError(true)
    } else {
      axios
        .post("http://localhost:3001/users/login", {
          email,
          password
        })
        .then(res => localStorage.setItem("token", res.data))
        .catch(err =>{
          console.log(err);
        })

      history.push("/dashboard");
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
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                type="password"
                variant="outlined"
                error={error}
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
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
