import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'
const { invokeScript } = require('@waves/waves-transactions')
const WavesAPI = require('@waves/waves-api')
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
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
        maxWidth: 345,
        margin: '0 auto'

    },
    leftMargin: {
        marginLeft: '10px'
    }

};
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#1E88E5" }

    }
})
class Home extends React.Component {
    constructor() {
        super();
    }
    state = {
        projects: [],
        open: false,
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

    async getProjects() {
        let res = await (await fetch("https://testnodes.wavesnodes.com/addresses/data/3N2SxuEYw6ExBkFAaB5yvHLc526LMsFmiJv")).json();
        let projects = res.filter(project => {
            return (project.key.includes("Description"))
        })
        this.setState({
            projects: projects
        });
    }

    componentDidMount() {
        this.getProjects();
    }
    render() {
        const { classes } = this.props;
        const handleClickOpen = () => {
            this.setState({ open: true })
        }
        const handleClose = () => {
            this.setState({ open: false })
        }
        return (
            <MuiThemeProvider theme={theme}>

                <div>
                    <MenuBar title="Projects"></MenuBar>
                    <br />
                    <Button variant="contained" className={classes.leftMargin} color="primary" onClick={handleClickOpen}>
                        Create a Project
                </Button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={handleClose} color="primary">
                                Create
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <br />
                    {
                        this.state.projects.map(project =>
                            <div>
                                <br />
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {project.key.replace(" Description", "")}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {project.value}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Delete
                                    </Button>
                                        <Button size="small" color="primary">
                                            Select Item
                                    </Button>
                                    </CardActions>
                                </Card>
                            </div>

                        )
                    }

                </div >
            </MuiThemeProvider>
        );
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);