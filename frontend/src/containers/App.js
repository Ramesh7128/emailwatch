import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Content from './Content';
import Header from './Header';
import { connect } from 'react-redux';
import { tokenAuthentication } from '../actions/authActions'


class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkValidToken()
  }
  render() {
    return (
      <Router>
        <div className="container-section">
          <Header />
          <Switch>
            <Route exact path="/" component={Content} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            {/* <Route path="/category/:id" component={Content} /> */}
          </Switch>
          <div className='footer-section'>
            Made with <span>&#9829;</span> in <a href='https://altcampus.io/'>altCAMPUS</a>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    isAuthenticated: state.authReducer.isAuthenticated,
    username: state.authReducer.username,
    isAuthenticatedDone: state.authReducer.isAuthenticatedDone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkValidToken: () => dispatch(tokenAuthentication()),
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
