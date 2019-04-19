import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { authLogin, authLogout, socialauthLogin } from '../actions/authActions';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    componentDidMount() {
        this.props.LogoutAuth();
    }

    responseGoogle(response) {
        console.log(response);
        let code = response.code;
        this.props.socialAuthLogin(code, 'google');
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.LoginAuth(this.state.email, this.state.password);
    }

    handleInput(event) {
        let key = event.target.name;
        let value = event.target.value;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    render() {
        let errorMsg = ''
        for (let key in this.props.authError) {
            errorMsg += this.props.authError[key];
        }
        if (this.props.isAuthenticated) return <Redirect to="/" />;
        return (
            <div className='login-box-container'>
                <div className='login-box-wrapper'>

                    <div className='login-title'>Login</div>
                    <div className="login-item">
                        <form onSubmit={this.handleSubmit} className="form form-login">
                            <p className='error-msg'>{errorMsg}</p>
                            <div className="form-field">
                                <label className="user" htmlFor="login-email"><span className="hidden">EmailID</span></label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder='email'
                                    onChange={this.handleInput}
                                />
                            </div>
                            <div className="form-field">
                                <label className="lock" htmlFor="login-password"><span className="hidden">Password</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='password'
                                    onChange={this.handleInput}
                                />
                            </div>
                            <div className="form-field">
                                <input
                                    type="submit"
                                    value="LOG IN"
                                    onSubmit={this.handleSubmit}
                                />
                            </div>
                        </form>
                        <GoogleLogin
                            clientId="705813183307-hminde5i1ejhm790gl6t2ct0j6n7vft0.apps.googleusercontent.com"
                            buttonText="Login"
                            scope="https://mail.google.com/ email profile"
                            responseType='code'
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            accessType="offline"
                            prompt='consent'
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div className='signup-link'>
                        <Link to="/signup"><div>Signup</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LoginAuth: (email, password) => dispatch(authLogin(email, password)),
        socialAuthLogin: (email, token, provider) => dispatch(socialauthLogin(email, token, provider)),
        LogoutAuth: () => dispatch(authLogout())
    }
}

const mapstateToProps = (state) => {
    return {
        authError: state.authReducer.authError,
        isAuthenticated: state.authReducer.isAuthenticated,
        authLoading: state.authReducer.isAuthenticated
    }
}

LoginForm = connect(mapstateToProps, mapDispatchToProps)(LoginForm);
export default LoginForm;