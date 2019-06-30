import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import MenuBar from './MenuBar'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import { auth } from './PrivateRoute'
const WavesAPI = require('@waves/waves-api')
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#1E88E5" },
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
    state = {
        type: "hacker"
    }
    async wavesKeeperLogin() {
        try {
            const keeperApi = await window.WavesKeeper.initialPromise
            const state = await keeperApi.publicState()
            console.log(state);
            let acct = { info: state }
            acct.balances = await Waves.API.Node.assets.balances(state.account.address);
            localStorage.setItem("acct", JSON.stringify(acct));
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    render() {
        const { classes } = this.props;
        const handleChange = (event) => {
            this.setState({ type: event.target.value });
        }
        const LoginButton = withRouter(({ history }) => (
            <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={async () => {
                localStorage.setItem("hacker", (this.state.type == "hacker"));
                await this.wavesKeeperLogin()
                auth.authenticate(() => history.push('/wallet'))
            }}
            >Login as {this.state.type == "investor" ? "an Investor" : "a Hacker"} </Button >

        ))
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <MenuBar
                        title="Login"
                        auth={false}
                    />
                    <main className={classes.main}>
                        <Paper className={classes.paper}>

                            <RadioGroup
                                aria-label="Hacker Or Investor"
                                name="hackerOrInvestor"
                                className={classes.group}
                                value={this.state.type}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="hacker" control={<Radio />} label="Hacker" />
                                <FormControlLabel value="investor" control={<Radio />} label="Investor" />
                            </RadioGroup>

                            <form onSubmit={e => { e.preventDefault(); }} className={classes.form}>
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