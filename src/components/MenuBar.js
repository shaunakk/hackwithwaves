import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { auth } from './PrivateRoute'
import logo from '../hi.png'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#1E88E5" }

    }
})
const styles = {
    root: {
        flexGrow: 1,
    },
    alignRight: {
        marginLeft: 'auto',
    }
}
const LogoutButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        localStorage.clear();
        auth.signout(() => history.push('/login'))
    }}>Sign out</MenuItem>
))
const WalletButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/wallet')
    }}>Wallet</MenuItem>
))
const ProjectsButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/projects')
    }}>Projects</MenuItem>
))
const InvestmentsButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/projectsToInvest')
    }}>Projects</MenuItem>
))
const TransferButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/transfer')
    }}>Send/Receive</MenuItem>
))
const GiveButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/give')
    }}>Give Advice</MenuItem>
))
const GetButton = withRouter(({ history }) => (
    <MenuItem onClick={() => {
        history.push('/get')
    }}>Get Advice</MenuItem>
))
class MenuBar extends React.Component {
    state = {
        anchorEl: null,
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <img src={logo} height='30' width='42' />
                            <Typography variant="h6" color="inherit">{this.props.title}</Typography>
                            {auth.isAuthenticated && (
                                <div className={classes.alignRight}>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <WalletButton />
                                        <TransferButton />
                                        {(localStorage.getItem("hacker") == "true") ? <ProjectsButton /> : <InvestmentsButton />}
                                        {(localStorage.getItem("hacker") == "true") ? <GetButton /> : <GiveButton />}
                                        <LogoutButton />
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>

            </div>
        );
    }
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);