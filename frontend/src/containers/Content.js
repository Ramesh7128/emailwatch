import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dashboard from './Dashboard'

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                {(this.props.isAuthenticatedDone) ?
                        (!this.props.isAuthenticated ?
                        <div className='content-section'>
                            <div className='content-wrapper'>
                                <div className='header-wrapper'>
                                    <h1 className='header-bold'><span className='header-border'>Email Watch</span></h1>
                                </div>
                                <p className='description-section'>A one stop solution to understand all your email campaigns under our watch.</p>
                                <h2 className='sub-header-bold'>Features offered</h2>
                                <ul className='description-section'>
                                    <li>Email engagement analytics topographically.</li>
                                    <li>Providing visualisiation to help you understand success rates of your email contents.</li>
                                    <li>Know how many of your clients have opened, glazed/deleted, or read your emails.</li>
                                </ul>
                            </div>
                        </div>
                        :
                        <Dashboard />)
                :
                null
                }
            </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        isAuthenticatedDone: state.authReducer.isAuthenticatedDone
    }
}

Content = connect(mapStateToProps)(Content)
export default Content;