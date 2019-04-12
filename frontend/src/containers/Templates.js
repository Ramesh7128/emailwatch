import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import AddTemplate from './AddTemplate';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false
        };
        this.addTemplates = this.addTemplates.bind(this);
    }

    addTemplates() {
        this.setState(prevState => ({
            formActive: !prevState.formActive
        }));
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.formActive ?
                    <div className='contact-table-section'>
                        <Button color='green' onClick={this.addTemplates}>Add Template</Button>
                        <div>
                            Template list
                        </div>
                    </div>
                    :
                    <div className='add-contact-form-section'>
                        <div onClick={this.addTemplates}>
                            <Icon name='arrow left' />Back
                        </div>
                        <AddTemplate formClick={this.addTemplates} />
                    </div>
                }
            </React.Fragment>
        );
    }
}


export default Template;