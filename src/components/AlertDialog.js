import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import '../AlertDialog.css';
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
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    

    render() {
        let WalletButton = withRouter(({ history }) => (
            <Button class={theme} onClick={() => {
                
            }}>More Info about the Project</Button>
        ))
        return (
            <div>
                <Button size='small' onClick={this.handleClickOpen}  color="primary">
                    View Project
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
                        Project's Name: {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                            <p>Project's Description: {this.props.description}</p>
                            <p>Project's Investment ID: {this.props.address}</p>
                            <p>Project's Email: {this.props.email}</p>
                          

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.handleClose} color="primary">
                            OK
            </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default AlertDialog;