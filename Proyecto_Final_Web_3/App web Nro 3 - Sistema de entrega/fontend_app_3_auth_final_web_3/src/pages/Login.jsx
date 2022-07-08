import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Model from '../Model';

const _Styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = _Styles();
  const navigate = useNavigate();

  const handleClick = () => {
    const _email = { current: document.getElementById("email") }
    const _password = { current: document.getElementById("password") }
    var exito = true;
    var email = _email.current.value;
    var password = _password.current.value;
    if (!email) {
      _email.current.style.borderColor = "#f00";
      exito = false;
    } else {
      _email.current.style.borderColor = "#fff";
    }
    if (!password) {
      exito = false;
      _password.current.style.borderColor = "#f00";
    } else {
      _password.current.style.borderColor = "#fff";
    }

    if (!exito) return;

    Model.Usuario.login({
      email,
      password
    }).then((resp) => {
      localStorage.setItem("token", resp.token);
      navigate("/", { replace: true })
    }).catch((e) => {
      console.error(e);
    })
  }
  if (Model.Usuario.getToken()) {
    return <Navigate to="/" />
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
         
        </form>
      </div>
      
    </Container>
  );
}
