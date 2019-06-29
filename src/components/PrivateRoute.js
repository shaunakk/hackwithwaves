import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
export const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);


    },
    getPublicKey() {
        console.log(JSON.parse(localStorage.getItem("publicKey")).publicKey)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        if (auth.isAuthenticated) {
            return (<Component {...props} />)

        } else {
            return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }

    }
    }
    />
)
export default PrivateRoute;
