import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  registerLink: {
    textDecoration: "none",
    display: "block",
    padding: "20px 0"
  }
});

const URL = "https://authlambda.herokuapp.com/api";

class SignIn extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    result: {},
    isLoading: false,
    error: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post(`${URL}/register`, this.state)
      .then(res =>
        this.setState({
          result: res.data,
          isLoading: false,
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        })
      )
      .catch(err =>
        this.setState(
          {
            error: err.response.data.message,
            isLoading: false,
            firstname: "",
            lastname: "",
            username: "",
            password: ""
          },
          () => console.log(this.state)
        )
      );
  };
  render() {
    const { classes, history } = this.props;
    if (this.state.result.success) {
      history.push("/login");
    }
    return (
      <>
        {this.state.isLoading && <Loader />}
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={this.registerUser}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  autoComplete="firstname"
                  value={this.state.firstname}
                  autoFocus
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {this.state.error && (
                <small style={{ color: "red", display: "block" }}>
                  {this.state.error}
                </small>
              )}
              <Typography component="h6" variant="h6">
                <Link className={classes.registerLink} to="/login">
                  Already have an account? Sign in
                </Link>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </main>
      </>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
