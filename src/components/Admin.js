import React from 'react';
import PropTypes, { checkPropTypes } from 'prop-types';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';

import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'
import AlertDialog from './AlertDialog';
const { transfer, broadcast } = require('@waves/waves-transactions')
const WavesAPI = require('@waves/waves-api')
const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
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
    },
    search: {
        alignItems: "center",
        margin: '0 auto',
        justify: "center"

    }


};
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#1E88E5" }

    }
})
class Admin extends React.Component {
    constructor() {
        super();
    }
    state = {
        projects: [],
        open: false,
        name: "",
        description: "",
        error: false,
        search: "",
        filteredResponse: [],
        rewardOpen2: false,
        rewardOpen: false

    }
    refreshProjects() {
        setInterval(() => { this.getProjects() }, 1000);
    }
    handleErrorClose = () => {
        this.setState({ error: false })
    }
    async createApp() {
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
                        function: "project",
                        args: [{ type: "string", value: this.state.name }, { type: "string", value: JSON.stringify({ update: false, name: this.state.name, description: this.state.description, email: this.state.email, url: this.state.url, address: JSON.parse(localStorage.acct).info.account.address }) }]
                    },

                },


            };
            let data = await window.WavesKeeper.signAndPublishTransaction(txData);
            const params = {
                amount: 500,
                recipient: JSON.parse(localStorage.acct).info.account.address,
                feeAssetId: "WAVES",
                fee: 900000,
                assetId: "2ChhXGYQHywQfrKcoE3aj9F8BepEdTBX82UawkZCVoge",

            }

            const signedTransferTx = transfer(params, "satoshi hill advance update tongue design recall uniform method fun bone math february phrase little")
            let res = broadcast(signedTransferTx, "https://testnodes.wavesnodes.com").then(() => {
                this.setState({ rewardOpen: true })
            })
            console.log("You have just been awarded 5 HACKS")


        }
        catch (e) {
            console.log(e);
        }
    }



    async removeStatus(project, index) {

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
                        function: "project",
                        args: [{ type: "string", value: this.state.filteredResponse[index].key }, { type: "string", value: JSON.stringify({ name: "" }) }]
                    },

                },


            };
            let data = await window.WavesKeeper.signAndPublishTransaction(txData);

        }

        catch (e) {
            this.setState({ error: true })
            console.log(e);
        }
    }
    async getProjects() {
        let res = await (await fetch("https://testnodes.wavesnodes.com/addresses/data/3N2SxuEYw6ExBkFAaB5yvHLc526LMsFmiJv")).json();
        let filtered = (res.filter(project => {
            try { return JSON.parse(project.value).name != "" && JSON.parse(project.value).update }
            catch{ return false }
        }
        )).map(project => { return { key: project.key, value: JSON.parse(project.value) } })

        this.setState({
            projects: filtered,
        });
    }

    async componentDidMount() {
        await this.getProjects();
        await this.refreshProjects();
        this.setState({ filteredResponse: this.state.projects })
        console.log("address " + JSON.parse(localStorage.acct).info.account.address
        )

    }
    render() {
        const { classes } = this.props;
        const handleClickOpen = () => {
            this.setState({ open: true })
        }
        const handleClose = () => {
            this.setState({ open: false })
            this.setState({ rewardOpen: false })
            this.setState({ rewardOpen2: false })


        }
        const handleChange1 = (event) => {
            this.setState({ name: event.target.value });
        }
        const handleChange2 = (event) => {
            this.setState({ description: event.target.value });
        }
        const handleChange3 = (event) => {
            this.setState({ email: event.target.value });
        }
        const handleChange5 = (event) => {
            this.setState({ url: event.target.value });
        }
        const handleChange4 = async (event) => {
            this.setState({ search: event.target.value });
            if (event.target.value.length > 1) {
                let responses = await this.state.projects.filter(project => {
                    console.log((project.value.name + project.value.description).toLowerCase().includes(event.target.value.toLowerCase())
                    )
                    return (project.value.name + project.value.description).toLowerCase().includes(event.target.value.toLowerCase())
                })
                this.setState({
                    filteredResponse: responses
                })
            }
            else this.setState({ filteredResponse: this.state.projects })

        }
        return (
            <MuiThemeProvider theme={theme}>

                <div>
                    <MenuBar title="Admin Dashboard"></MenuBar>
                    <br />
                    <Typography style={{marginLeft:"50px"}}>Pending Updates:</Typography>
                    <br />
                    {
                        this.state.projects.map((project, index) =>
                            <div>
                                <br />
                                <Card className={classes.card} >
                                    <CardActionArea>
                                        <CardContent>

                                            <Typography gutterBottom variant="h5" component="h2">
                                                {project.value.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {project.value.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={async () => {
                                            await this.deleteProject(project, index)
                                        }}>
                                            More Info
                                        </Button>
                                        <Button size="small" color="primary" onClick={async () => {
                                            let updatedValue = this.state.filteredResponse[index].value
                                            updatedValue.update = false
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
                                                        function: "project",
                                                        args: [{ type: "string", value: this.state.filteredResponse[index].key }, { type: "string", value: JSON.stringify(updatedValue) }]
                                                    },

                                                },


                                            };
                                            let data = await window.WavesKeeper.signAndPublishTransaction(txData);
                                            this.setState({ rewardOpen2: true })

                                        }}>
                                            Deny
                                        </Button>
                                        <Button size="small" color="primary" onClick={async () => {
                                            let updatedValue = this.state.filteredResponse[index].value
                                            updatedValue.update = false
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
                                                        function: "project",
                                                        args: [{ type: "string", value: this.state.filteredResponse[index].key }, { type: "string", value: JSON.stringify(updatedValue) }]
                                                    },

                                                },


                                            };
                                            let data = await window.WavesKeeper.signAndPublishTransaction(txData);
                                            const params = {
                                                amount: 1000,
                                                recipient: JSON.parse(localStorage.acct).info.account.address,
                                                feeAssetId: "WAVES",
                                                fee: 900000,
                                                assetId: "2ChhXGYQHywQfrKcoE3aj9F8BepEdTBX82UawkZCVoge",
                                            }

                                            const signedTransferTx = transfer(params, "satoshi hill advance update tongue design recall uniform method fun bone math february phrase little")
                                            let res = broadcast(signedTransferTx, "https://testnodes.wavesnodes.com").then(() => {
                                                this.setState({ rewardOpen: true })
                                            })

                                        }}>
                                            Accept
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>

                        )
                    }
                    <Dialog
                        open={this.state.rewardOpen}
                        TransitionComponent={Transition}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            Accept Submitted
                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                                <p>This project has been accepted, the user has recieved 10 HACKS</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} color="primary">
                                OK
            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.rewardOpen2}
                        TransitionComponent={Transition}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            Deny Submitted
                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{ whiteSpace: 'pre' }} id="alert-dialog-slide-description">
                                <p>This project update has been denied</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} color="primary">
                                OK
            </Button>
                        </DialogActions>
                    </Dialog>
                </div >
            </MuiThemeProvider>
        );
    }
}
Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);