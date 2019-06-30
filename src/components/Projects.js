import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'
const { invokeScript } = require('@waves/waves-transactions')
const txData = {
    type: 16,
    data: {
        amount: {
            assetId: "WAVES",
            tokens: "1.567"
        },
        fee: {
            assetId: "WAVES",
            tokens: "0.001"
        },
        recipient: "test"
    }
};

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
    async createApp(name, description) {
        try {
            const txData = {
                type: 16,

                data: {
                    dApp: "3N2SxuEYw6ExBkFAaB5yvHLc526LMsFmiJv",
                    payment: [],
                    fee: {
                        "tokens": "0.05",
                        "assetId": "WAVES"
                    },
                    call: {
                        function: "registerProject",
                        args: [{ type: "string", value: name }, { type: "string", value: description }]
                    },

                },


            };
            let data = await window.WavesKeeper.signAndPublishTransaction(txData);
            console.log(data)
        }
        catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {

    }
    render() {
        const { classes } = this.props;
        return (
            <MenuBar title="Projects"></MenuBar>
        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);