import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'

const theme = createMuiTheme({
    palette: {
        primary: { 500: "#43a047" },
        secondary: blue
    }
})
const styles = {
    card: {
        maxWidth: 1400,
        margin: '0 auto'

    },
    leftMargin: {
        marginLeft: '10px'
    }

};

class Home extends React.Component {
    constructor() {
        super();
    }
    state = {

    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider style={{ display: "flex" }} theme={theme}>
                <MenuBar title="Investor Wallet"></MenuBar>
            </MuiThemeProvider >
        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);