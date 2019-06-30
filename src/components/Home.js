import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MenuBar from './MenuBar'
import moment from 'moment'
import { auth } from './PrivateRoute'
import '../Balances.css';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AlertDialogSlide from './AlertDialogSlide'
import Hacker from './Hacker'
import Investor from './Investor'
import Balances from './Balances'
import '../Home.css'

const WavesAPI = require('@waves/waves-api');
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);


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
        transactionHistory: [],
        types:["","","","Issued","Transfered","Reissued","Burned","Exchanged","Leased","Canceled Lease","Alias","Mass Transfered", "Data", "Set Script","Set Sponsorship", "Set Asset Script", "Script Invocation"]
    }

    componentDidMount(){
        Waves.API.Node.transactions.getList(JSON.parse(localStorage.acct).info.account.address).then((txList) => {
            console.log(txList);
            this.setState({transactionHistory:txList})
        });
    }

    render() {
        const { classes } = this.props;
        console.log(localStorage.acct)
        return (
            <div>
            <div>
                {(localStorage.getItem("hacker") == "true") ? <Hacker /> : <Investor />}
                <Balances />
                <br/>
                <br/>
                <br/>
            </div>

{this.state.transactionHistory.map(i =>
<div>
<Card className={classes.card}>
    <CardContent className="transaction-container">
        <Typography margin="0 20px" variant="h5" component="h2">{this.state.types[i.type]} </Typography>
        <Typography margin="0 20px" variant="h5" component="h2" gutterBottom>{moment(i.timestamp).format('MMMM Do YYYY, h:mm:ss a')} </Typography>
        {i.amount ?
        <Typography margin="0 20px" variant="h5" component="h2">Amount: {i.amount/100000000}</Typography>
        : <Typography margin="0 20px" variant="h5" component="h2">Amount: None</Typography>
        }
        <AlertDialogSlide
            id={i.id}
            sender={i.sender}
            fee={i.fee/100000000}
            date={moment(i.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
            recipient={i.recipient ? i.recipient : "none"}
        ></AlertDialogSlide>
    </CardContent>
</Card>
<br />
</div>
)}
</div>

        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);