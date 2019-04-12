import React, { Component } from 'react';
import { navContent, addBorderClass } from './utilFuntions';
import AddContact from './AddContact';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: 'Contacts'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log(event.target.tagName);
        if (event.target.tagName == 'SPAN') {
            const sectionValue = event.target.dataset.section;
            this.setState({
                navbar: sectionValue
            })
        }
    }

    render() { 
        return (
            <div className='dashboard-section'>
                <div className='left-navbar-section'>
                    <div className='list-container' onClick={this.handleClick}>
                        <div className='list-item'>{addBorderClass(this.state, 'Contacts')}</div>
                        <div className='list-item'>{addBorderClass(this.state, 'SentEmail')}</div>
                        <div className='list-item'>{addBorderClass(this.state, 'Groups')}</div>
                        <div className='list-item'>{addBorderClass(this.state, 'Template')}</div>
                        <div className='list-item'>{addBorderClass(this.state, 'NewEmail')}</div>
                    </div>
                </div>
                <div className='main-content-section'>
                    {navContent(this.state)}
                </div>
            </div>
        );
    }
}

export default Dashboard;