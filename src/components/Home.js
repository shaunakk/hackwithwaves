import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'
import Investor from './Investor';
import Hacker from './Hacker'
import Balances from './Balances';



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
        console.log(localStorage.acct)
        return (
            <div>
                {(localStorage.getItem("hacker") == "true") ? <Hacker /> : <Investor />}
                <Balances />
            </div>
        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);