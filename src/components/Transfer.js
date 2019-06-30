import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";
import blue from "@material-ui/core/colors/blue";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MenuBar from "./MenuBar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { auth } from "./PrivateRoute";


const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1E88E5" },
    secondary: blue
  }
});

const styles = () => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  noStyle: {
    textDecoration: "none"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class Transfer extends React.Component {
  constructor() {
    super();
  }
  state = {
    currency: 1,
    deposit: false,
    amount: "",
    dest: "",
    pending: false,
    assets: [
      
    ],
    confirmTransfer: false,
    names: ["WAVES","HACK"],
    transactionSuccessful: { success: null, message: "" },
    memo: ""
  };
  handleCurrencyChange = (e) => {
    this.setState({ currency: e.target.value })
  }
  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }
  handleMemoChange = (e) => {
    this.setState({ memo: e.target.value })
  }
  handleDestChange = (e) => {
    this.setState({ dest: e.target.value })
  }
  handleClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handleTransferClose = () => {
    this.setState({ confirmTransfer: false });
  };
  handleDepositClose = () => {
    this.setState({ deposit: false });
  };
  handleSnackbarSuccessClose = () => {
    this.setState({ transactionSuccessful: { success: null, err: "" } });
  }
  handleSnackbarPending = () => {
    this.setState({ pending: false });
  }

  send = async () => {
    const txData = {
        type: 4,
        data: {
            amount: {
               assetId: this.state.names[this.state.currency-1] == "WAVES" ? "WAVES" : "2ChhXGYQHywQfrKcoE3aj9F8BepEdTBX82UawkZCVoge",
               tokens: this.state.amount,
               Attachment: this.state.memo
            },
            fee: {
                assetId: "WAVES",
                tokens: "0.009"
            },
            recipient: this.state.dest
        }
    };

    window.WavesKeeper.signAndPublishTransaction(txData).then((data) => {
        this.setState({transactionSuccessful:{success: true, message: "success"}})
    }).catch((error) => { 
        this.setState({transactionSuccessful:{success: false, message: "error"}})
    });
  }

  render() {
    const { classes } = this.props;

    const SendButton = withRouter(({ history }) => (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => { this.setState({ confirmTransfer: true }) }}
      >
        {" "}
        Send {this.state.amount} {this.state.names[this.state.currency-1]}
      </Button>
    ));

    const DepositButton = withRouter(({ history }) => (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => {
          this.setState({ deposit: true })
        }}
      >
        {" "}
        Deposit
        </Button>
    ));
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <MenuBar title="Send/Receive Funds" auth={false} />

          <main className={classes.main}>
            <Paper className={classes.paper}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
                className={classes.form}
              >
                <FormControl margin="normal" required fullWidth>
                  <FormHelperText>Token</FormHelperText>
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
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="amount">Amount of {this.state.names[this.state.currency-1]}</InputLabel>
                  <Input
                    type="text"
                    id="amount"
                    value={this.state.value}
                    onChange={this.handleAmountChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="dest">Destination (Waves Address)</InputLabel>
                  <Input
                    type="text"
                    id="dest"
                    value={this.state.value}
                    onChange={this.handleDestChange}
                  />
                </FormControl>
                <FormControl margin="normal"  fullWidth>
                  <InputLabel htmlFor="memo">Attachment (optional)</InputLabel>
                  <Input
                    type="text"
                    id="memo"
                    value={this.state.value}
                    onChange={this.handleMemoChange}
                  />
                </FormControl>
              </form>
              <SendButton />
              <DepositButton />
            </Paper>
          </main>


          <Dialog
            open={this.state.confirmTransfer}
            onClose={this.handleTransferClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Are you sure you want to send ${this.state.amount} ${this.state.names[this.state.currency - 1]} to ${this.state.dest}?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleTransferClose} color="primary">
                Cancel
          </Button>
              <Button onClick={() => { this.handleTransferClose(); this.send();  }} color="primary" autoFocus>
                Confirm
          </Button>
            </DialogActions>
          </Dialog>






          <Dialog
            open={this.state.deposit}
            onClose={this.handleDepositClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            <DialogTitle id="alert-dialog-title">Depositing Funds</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`If you want to deposit funds into your wallet, send them to this account address: ${JSON.parse(localStorage.acct).info.account.address}`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleDepositClose(); }} color="primary" autoFocus>
                Ok
          </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.transactionSuccessful.success}
            autoHideDuration={4000}
            onClose={this.handleSnackbarSuccessClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={

              <span id="message-id">Success! Your funds have been sent.</span>
            }
            action={[

              <CheckCircleIcon />

            ]}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.pending}
            // autoHideDuration={5000}
            //onClose={this.handleSnackbarPending}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={

              <span id="message-id">Processing Transaction...</span>

            }
            action={[
            ]}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.transactionSuccessful.success == false}
            autoHideDuration={4000}
            onClose={this.handleSnackbarSuccessClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={

              <span id="message-id">Error! Double Check Amount and Destination Address</span>
            }
            action={[

              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackbarSuccessClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
Transfer.propTypes = {
  classes: PropTypes.object.isRequired
};
const style = {
  margin: 15
};
export default withStyles(styles)(Transfer);