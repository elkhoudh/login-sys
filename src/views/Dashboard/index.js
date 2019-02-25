import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NavBar from "../../components/NavBar";
import axios from "axios";

const URL = "https://authlambda.herokuapp.com/api";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  card: {
    minWidth: 275,
    marginTop: 20
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
class Dashboard extends React.Component {
  state = {
    users: [],
    error: {}
  };

  componentDidMount = () => {
    axios
      .get(`${URL}/users`, {
        headers: {
          Authorization: window.localStorage.token
        }
      })
      .then(res => this.setState({ users: res.data }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { classes } = this.props;

    if (!window.localStorage.token) {
      this.props.history.push("/login");
    }
    return (
      <>
        <NavBar history={this.props.history} />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={32}
            >
              {this.state.users &&
                this.state.users.map(user => {
                  return (
                    <Grid key={user.id} item>
                      <Card className={classes.card}>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            {user.username}
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {user.firstname} {user.lastname}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Dashboard);
