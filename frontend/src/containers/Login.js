import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { authLogout } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'



class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.props.logout();
        this.props.history.push('/');
    }
    render() {
        console.log(this.props.isAuthenticatedDone, this.props.isAuthenticated, 'chdljljf');
        return (
            <React.Fragment>
                {this.props.isAuthenticatedDone ?
                    (!this.props.isAuthenticated ?
                        <React.Fragment>
                            <div className='login-btn'>
                                <Link to="/login"><div>Login</div></Link>
                            </div>
                            <div className='signup-btn'>
                                <Link to="/signup"><div>Signup</div></Link>
                            </div>
                        </React.Fragment>
                        :
                        <div className='user-profile-dropdown'>
                            <Dropdown text={this.props.username}>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Logout' onClick={this.handleLogout} />
                                    <Dropdown.Item text='Profile' onClick={this.handleLogout} />
                                    <Dropdown.Item text='AgainProfile' onClick={this.handleLogout} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>)
                :
                null
                }
                

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        username: state.authReducer.username,
        isAuthenticatedDone: state.authReducer.isAuthenticatedDone
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(authLogout())
    }
}


Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(Login);



