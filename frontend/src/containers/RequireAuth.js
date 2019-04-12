import React, { Component } from 'react';
import { connect } from 'react-redux';

const RequireAuth = (ComposedComponent) => {
    class Authentication extends Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.replace('/login');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.authReducer.isAuthenticated
        }
    }
    Authentication = connect(mapStateToProps)(Authentication);
    return Authentication;
}

export default RequireAuth;