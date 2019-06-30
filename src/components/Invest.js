import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import '../AlertDialog.css';
import TextField from '@material-ui/core/TextField';
import { Link } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#1E88E5" }

    }
})

class AlertDialog extends React.Component {
    state = {
        open: false,
        currency: 1,
        names: ["WAVES","HACK"],
        amount:"",
        memo:""
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange3 = (event) => {
        this.setState({ amount: event.target.value });
    }
     handleCurrencyChange = (event) => {
        this.setState({ currency: event.target.value });
    }
    handleMemoChange = (event) => {
        this.setState({ memo: event.target.value });
    }
    invest(){
        console.log(this.state.amount)
        console.log(this.props.id)
        const txData = {
            type: 4,
            data: {
                amount: {
                   assetId: this.state.names[this.state.currency-1] == "WAVES" ? "WAVES" : "2ChhXGYQHywQfrKcoE3aj9F8BepEdTBX82UawkZCVoge",
                   tokens: this.state.amount,
                   Attachment: "Investment from "+ this.state.memo
                },
                fee: {
                    assetId: "WAVES",
                    tokens: "0.009"
                },
                recipient: this.props.id
            }
        };
    
        window.WavesKeeper.signAndPublishTransaction(txData).then((data) => {
            
        }).catch((error) => { 
            console.log(error)
        });
    }
    render() {
        
        let WalletButton = withRouter(({ history }) => (
            <Button class={theme} onClick={() => {
                
            }}>More Info about the Project</Button>
        ))
        return (
            <div>
                <Button size='small' onClick={this.handleClickOpen}  color="primary">
                    Invest
                </Button>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Invest in {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                        <Select
                        value={this.state.currency}
                        onChange={this.handleCurrencyChange}
                        inputProps={{
                         name: "pair",
                        id: "pair-simple"
                        }}
                    >
                    <MenuItem value={1} >WAVES</MenuItem>
                    <MenuItem value={2} >HACK</MenuItem>
                  </Select>
                  <br/>
                        <TextField
                                margin="dense"
                                id="email"
                                label={`Investor's Name`}
                                type="email"
                                value={this.state.memo}
                                onChange={this.handleMemoChange}
                                fullWidth
                            />
                             <br/>
                            <TextField
                                margin="dense"
                                id="email"
                                label={`Amount of ${this.state.names[this.state.currency-1]} to invest`}
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange3}
                                fullWidth
                            />
                           
                          
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={()=>{this.handleClose();  this.invest();}} color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default AlertDialog;