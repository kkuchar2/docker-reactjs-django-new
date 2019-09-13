import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import TextInputField from "components/fields/TextInputField.jsx";
import PasswordInputField from "components/fields/PasswordInputField.jsx";
import SubmitButton from "components/buttons/SubmitButton.jsx";
import ErrorText from "components/errors/ErrorText.jsx";

import FacebookButton from "components/buttons/social/FacebookButton.jsx";
import GoogleButton from "components/buttons/social/GoogleButton.jsx";


import Loader from "components/loaders/Loader.jsx";
import CheckBox from "components/checkbox/CheckBox.jsx";


import "./LoginForm.scss"
import {Link, withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {userActions} from "../../../redux/actions/user.actions";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameEmail: '',
            password: '',
            usernameEmailError: '',
            passwordError: '',
            formError: ''
        };

        this.onUsernameEmailChange = this.onUsernameEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onLoginResponse = this.onLoginResponse.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
    }

    renderFormError() {
        const error = this.state.formError;

        if (error !== undefined && error !== "") {
            return <ErrorText text={error}/>;
        }
    }

    onUsernameEmailChange(event) {
        this.setState({usernameEmailError: "", passwordError: "", formError: "", usernameEmail: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({usernameEmailError: "", passwordError: "", formError: "", password: event.target.value});
    }

    onSubmitForm(event) {
        event.preventDefault();
        this.props.login(this.state.usernameEmail, this.state.password);
    }

    onLoginResponse(data) {
        console.log(JSON.stringify(data, null, 4));
    }

    onLoginError(error) {
        console.log(error);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        let loggedIn = this.props.loggedIn;

        if (loggedIn) {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <Grid className={"loginFormContentGrid"} container>

                <form onSubmit={this.onSubmitForm}>

                    <Grid spacing={2} style={{padding: 0, margin: 0, width: "100%"}} container>

                        <div className={"title"}>Welcome</div>

                        <Grid className={"field"} style={{padding: 0}} item>

                            <TextInputField
                                className={"emailUsernameField"}
                                name={"username"}
                                placeholder={"E-mail or username"}
                                onChange={this.onUsernameEmailChange}
                                errorText={this.state.usernameEmailError}>
                            </TextInputField>

                        </Grid>

                        <Grid className={"field"} style={{padding: 0}} item>

                            <PasswordInputField
                                className={"passwordField"}
                                name={"password"}
                                placeholder={"Password"}
                                onChange={this.onPasswordChange}
                                errorText={this.state.passwordError}>
                            </PasswordInputField>

                        </Grid>

                        <Grid className={"rememberForgot"} style={{padding: 20, margin: 0}} item>
                            <CheckBox text={"Remember me"} />
                            <div className={"forget"}>
                                <Link to="/" className={"forgotPasswordLink"}>Forgot password?</Link>
                            </div>
                        </Grid>

                        <Grid className={"signIn"} style={{padding: 0, width: "100%", textAlign: "center"}} item>
                            <Loader visible={this.props.loggingIn}/>
                            <SubmitButton
                                className={"signInButton"}
                                onClick={this.onSubmitForm}
                                processing={this.props.loggingIn}
                                text={"Log in"}>s
                            </SubmitButton>
                        </Grid>

                        <div className={"createAccount"}>
                            <Link to='/register' className={"createAccountLink"}>Register</Link>
                        </div>

                        <div className={"bottomSection"}>
                            <GoogleButton/>
                            <FacebookButton/>
                        </div>

                    </Grid>
                </form>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const { loggingIn, loggedIn, loginError } = state.authentication;
    return { loggingIn, loggedIn, loginError };
};

const mapDispatchToProps = {
    login: userActions.login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));