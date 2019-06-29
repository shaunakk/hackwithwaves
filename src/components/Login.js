import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import ErrorIcon from '@material-ui/icons/Error';
import MenuBar from './MenuBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import { auth } from './PrivateRoute'
let privateKey = '';
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#43a047" },
        secondary: blue
    }
})
const styles = () => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    noStyle: {
        textDecoration: 'none',
    }
});
class Login extends React.Component {
    constructor() {
        super();
        auth.isAuthenticated = false;
    }
    handleChange(e) {
        privateKey = e.target.value
    }
    state = {
        privateKey: '',
        snackbarOpen: auth.authBefore,
        ledgerConnected: false,
    }
    handleClose = () => {
        this.setState({ snackbarOpen: false });
    };
    createRedirect = () => {
        if (localStorage.getItem("createRedirect")) {
            localStorage.setItem("createRedirect", false);
            return "Please log in with your private key you just received"
        }
        else return "Invalid Private Key";
    }
    render() {
        const { classes } = this.props;
        const LoginButton = withRouter(({ history }) => (

            <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => {
                localStorage.setItem('psk', privateKey);

                auth.authenticate(() => history.push('/'), privateKey)
            }}
                onSubmit={() => {
                    localStorage.setItem('psk', privateKey);

                    auth.authenticate(() => history.push('/'), privateKey)
                }}
            > Login</Button >

        ))
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <MenuBar
                        title="Login"
                        auth={false}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={8000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={

                            <span id="message-id">{this.createRedirect()}</span>
                        }
                        action={[

                            <IconButton
                                key="close"
                                arsia-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <main className={classes.main}>
                        <Paper className={classes.paper}>

                            <Typography component="h2" variant="h5">
                            </Typography>
                            <form onSubmit={e => { e.preventDefault(); }} className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Private Key</InputLabel>
                                    <Input type="password" id="password" autoComplete="current-password" value={this.state.value} onChange={this.handleChange} />
                                </FormControl>

                                <LoginButton></LoginButton>
                                <br />
                                <br />

                            </form>
                        </Paper>
                    </main>
                </MuiThemeProvider >
            </div >
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
const style = {
    margin: 15,
};
export default withStyles(styles)(Login);