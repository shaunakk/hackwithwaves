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
import MenuBar from './MenuBar'
import { auth } from './PrivateRoute'
import AlertDialog from './AlertDialog';
import Invest from './Invest'
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
        name: "",
        description: "",
        error:false
    }
    refreshProjects() {
        setInterval(() => { this.getProjects() }, 1000);
    }
    handleErrorClose = () => {
        this.setState({error:false})
    }
    async createApp() {
        console.log(this.state.name)
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
                        args: [{ type: "string", value: this.state.name }, { type: "string", value: JSON.stringify({ name: this.state.name, description: this.state.description, email: this.state.email, address: JSON.parse(localStorage.acct).info.account.address }) }]
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



    async deleteProject(project,index) {
        console.log(this.state.name)
        
        try {
            if(project.value.address == JSON.parse(localStorage.acct).info.account.address){
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
                        args: [{ type: "string", value: this.state.projects[index].key }, { type: "string", value: JSON.stringify({ name: "" }) }]
                    },

                },


            };
            let data = await window.WavesKeeper.signAndPublishTransaction(txData);
            console.log(data)
            console.log("done")
        } else{
            this.setState({error:true})
        }
        }
        catch (e) {
            this.setState({error:true})
            console.log(e);
        }
    }
    async getProjects() {
        let res = await (await fetch("https://testnodes.wavesnodes.com/addresses/data/3N2SxuEYw6ExBkFAaB5yvHLc526LMsFmiJv")).json();
        console.log(res)
        let filtered = (res.filter(project => {
            try { return JSON.parse(project.value).name != "" }
            catch{ return false }
        }
        )).map(project => { return { key: project.key, value: JSON.parse(project.value) } })
        this.setState({
            projects: filtered
        });
        
    }

    componentDidMount() {
        this.getProjects();
        this.refreshProjects();
    }
    render() {
        const { classes } = this.props;
        const handleClickOpen = () => {
            this.setState({ open: true })
        }
        const handleClose = () => {
            this.setState({ open: false })
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
        return (
            <MuiThemeProvider theme={theme}>

                <div>
                    <MenuBar title="Projects"></MenuBar>
                    <br />
                    {/* <Button variant="contained" className={classes.leftMargin} color="primary" onClick={handleClickOpen}>
                        Create a Project
                </Button> */}
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the name and a description of your hackathon project
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
                             <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.error}
                            autoHideDuration={8000}
                            onClose={this.handleErrorClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={

                                <span id="message-id">Error! You Cannot Delete this Project</span>
                            }
                            action={[

                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.handleErrorClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                            <TextField
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                value={this.state.description}
                                onChange={handleChange2}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                value={this.state.email}
                                onChange={handleChange3}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={async () => {
                                
                                await this.createApp()
                                handleClose()
                            }} color="primary">
                                Create
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <br />
                    {
                        this.state.projects.map((project, index) =>
                            <div>
                                <br />
                                <Card className={classes.card}>
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
                                        <Invest id={project.value.address} name={project.value.name}></Invest>
                                        {/* <Button size="small" color="primary" onClick={async () => {    
                                            await this.deleteProject(project,index)
                                        }}>
                                            Delete
                                        </Button> */}
                                        <AlertDialog name={project.value.name} description={project.value.description} address={project.value.address} email={project.value.email} color="primary"></AlertDialog>
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