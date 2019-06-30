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
    advice: "",
    investorName: "",
    email:"",
    projectName:"",
    pending: false,
    assets: [
      
    ],
    confirmTransfer: false,
    names: ["WAVES","HACK"],
    transactionSuccessful: { success: null, message: "" },
    memo: "",
    emailWrong:false,
    done:false,
    projects:[]
  };
  handleCurrencyChange = (e) => {
    this.setState({ currency: e.target.value })
  }
  handleAmountChange = (e) => {
    this.setState({ investorName : e.target.value })
  }
  handleMemoChange = (e) => {
    this.setState({ advice: e.target.value })
  }
  handleDestChange = (e) => {
    this.setState({ projectName: e.target.value })
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

  async getEmail(){

    
        let res = await (await fetch("https://testnodes.wavesnodes.com/addresses/data/3N2SxuEYw6ExBkFAaB5yvHLc526LMsFmiJv")).json();
        console.log(res)
        let filtered = (res.filter(project => {
            try { return JSON.parse(project.value).name != "" }
            catch{ return false }
        }
        )).map(project => { return { key: project.key, value: JSON.parse(project.value) } })
        console.log("FILTERED")
        console.log(filtered)
        this.setState({
            projects: filtered
        });
    let val = this.state.projects.find(project=>project.value.name==this.state.projectName).value.email
    if(val==-1){
        this.setState({emailWrong:true});
        return false;
    }


    await this.setState({email:val})
 
    console.log(this.state.email)
  }

  send = async () => {
    await this.getEmail();
    if((this.state.email.indexOf("@")!==-1)&&(this.state.email.indexOf(".")!==-1)){
    window.emailjs
    .send(
      "default_service",
      "send_advice",
      {
        investorName: this.state.investorName,
        projectName:this.state.projectName,
        email: this.state.email,
        advice:this.state.advice
      },
      "user_9TNj7xNArwLySO7eexAjz"
    )
    .then(res => {
        this.setState({transactionSuccessful:{success: true, message: "success"}})
      console.log(res);

    })
    // Handle errors here however you like
    .catch(err => {
        this.setState({transactionSuccessful:{success: false, message: "error"}})
    });
    } else {
        this.setState({transactionSuccessful:{success: false, message: "error"}})
    }
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
        Send Advice to {this.state.projectName}
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
          <MenuBar title="Give Advice" auth={false} />

          <main className={classes.main}>
            <Paper className={classes.paper}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
                className={classes.form}
              >
               
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="amount">Your Name</InputLabel>
                  <Input
                    type="text"
                    id="amount"
                    value={this.state.value}
                    onChange={this.handleAmountChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="dest">Project Name</InputLabel>
                  <Input
                    type="text"
                    id="dest"
                    value={this.state.value}
                    onChange={this.handleDestChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="memo">Advice</InputLabel>
                  <Input
                    type="text"
                    id="memo"
                    value={this.state.value}
                    onChange={this.handleMemoChange}
                    fullWidth
                  />
                </FormControl>
              </form>
              <SendButton />
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
                {`Are you sure you want to send ${this.state.projectName} your advice?`}
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

              <span id="message-id">Success! Your email has been sent.</span>
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

              <span id="message-id">Error! The email could not be sent</span>
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