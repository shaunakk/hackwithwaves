import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import waves from '../waves.png';
import hack from '../hack.png';

const styles = () => ({
    largeArrow: {
        fontSizeLarge: '20%',
    }
})
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#fafafa" },
    },
});
class Balance extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        currentIndex: 0
    }

    render() {
        let image;

        return (
            <MuiThemeProvider theme={theme}>
                <Card className="balance" >
                    <CardContent>
                        <div class="asset-container">
                            <div class="asset">
                                <img src={waves} alt="logo" class="icon" />
                                {parseInt(JSON.parse(localStorage.acct).info.account.balance.available) / (100000000) + " WAVES"}
                            </div>
                            <div class="asset">
                                <img src={hack} alt="logo" class="icon" />
                                {parseInt(JSON.parse(localStorage.acct).balances.balances[0].balance) / (100) + " HACK"}
                            </div>
                        </div>
                    </CardContent>
                </Card >
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(Balance);