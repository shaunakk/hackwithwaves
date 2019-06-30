import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import '../AlertDialogSlide.css';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
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
        return (
            <div>
                <Button size='small' onClick={this.handleClickOpen} className="more-info">
                    More Info
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
                        Transaction ID:{this.props.id}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                            <p>Sender: {this.props.sender}</p>
                            <p>Fee: {this.props.fee}</p>
                            <p>Date: {this.props.date}</p>
                            <p>{"Recipient: " + this.props.recipient + "    "}</p>


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

export default AlertDialogSlide;