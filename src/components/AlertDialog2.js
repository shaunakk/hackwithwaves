import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import '../AlertDialog.css';
import { Link } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom'
import { send } from 'q';

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
        openEmail:false,
        name:"",
        email:"",
        reason:""
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    sendEmail(){
        window.emailjs
        .send(
          "default_service",
          "send_to_hacker",
          {
            email: this.state.email,
            name:this.state.name,
            reason: this.state.reason,
            nameRec: this.props.name,
            emailRec: this.props.email
          },
          "user_3OkfdfLBPDUP0hsiLKF3j"
        )
    }
    handleEmailClose = () => {
        this.setState({openEmail:false})
    }


    render() {
        let WalletButton = withRouter(({ history }) => (
            <Button class={theme} onClick={() => {

            }}>More Info about the Project</Button>

       
        ))

        const handleChange1 = (e) => {
            this.setState({name:e.target.value})
        }

       const  handleChange2 = (e) => {
        this.setState({email:e.target.value})
        }
       const handleChange3 = (e) => {
        this.setState({reason:e.target.value})
        }
        
        return (
            <div>
                <Button size='small' onClick={this.handleClickOpen} color="primary">
                    View Profile
                </Button>
                  <Button size='small' onClick={async () => {
                                this.setState({openEmail:true})
                            }} color="primary">
                                Email Them
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
                        Person's Name: {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                            <p>{this.props.name}'s Description: {this.props.description}</p>
                            <p>{this.props.name}'s ID: {this.props.address}</p>
                            <p>{this.props.name}'s Email: {this.props.email}</p>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.handleClose} color="primary">
                            OK
            </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openEmail}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleEmailClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Send an email to {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                       
                        <DialogContentText>
                                Please enter your name, reason to email this person, and email address
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                value={this.state.name}
                                onChange={handleChange1}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email"
                                type="text"
                                value={this.state.email}
                                onChange={handleChange2}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Reason for Email"
                                type="text"
                                value={this.state.reason}
                                onChange={handleChange3}
                                fullWidth
                            />

                    </DialogContent>
                    <DialogActions>

                        <Button onClick={()=>{this.handleEmailClose(); this.sendEmail()}} color="primary">
                            Send Email
            </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default AlertDialog;