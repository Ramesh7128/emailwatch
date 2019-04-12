import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'


class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='header-section'>
                <div className='logo-text'>
                    <a href='/'>
                        <FontAwesomeIcon icon={faEnvelopeOpen} /> Watch
                    </a>
                </div>
                <Login />
            </div>
        );
    }
}

export default Header;