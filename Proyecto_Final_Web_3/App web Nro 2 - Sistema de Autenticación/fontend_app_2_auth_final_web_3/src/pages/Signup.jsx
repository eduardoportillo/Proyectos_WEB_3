import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import Model from '../Model';
import Rol from './Rol';


const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, setState] = React.useState({})
  React.useEffect(() => {
    if (id) {
      Model.Usuario.getById(id).then((resp) => {
        state.usuario = resp;
        setState({ ...state })
      }).catch((e) => {
        console.log(e)
      })
    }

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.target);
    var obj = {};
    for (const [name, value] of data) {
      obj[name] = value;
    }
    console.log(obj);
    if (id) {
      //edit
      Model.Usuario.editar(id, obj).then(e => {
        navigate("/", { replace: true })
      }).catch(e => {
        console.error(e)
      })
    } else {
      //registrar
      Model.Usuario.signup(obj).then(e => {
        navigate("/", { replace: true })
      }).catch(e => {
        console.error(e)
      })
    }

  }
  if (id) {
    if (!state.usuario) return <div>Loading...</div>
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                defaultValue={state?.usuario?.username}
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={state?.usuario?.email}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={state?.usuario?.password}
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
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
            Sign Up
          </Button>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              if (window.confirm("Seguro que desea eliminar el usuario?")) {
                Model.Usuario.delete(id).then(e => {
                  window.location.href = "/";
                })
              }
            }}
          >
            Delete
          </Button>

        </form>
        <Rol id_usr={id} />
      </div>

    </Container>
  );
}
