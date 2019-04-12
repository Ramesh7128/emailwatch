import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import AddContact from './AddContact';
import { Icon, Table, Label, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getContacts, createContact } from '../actions/contactActions';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false
        };
        this.addContact = this.addContact.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    addContact(event) {
        this.setState(prevState => ({
            formActive: !prevState.formActive
        }));
    }
    handleClick(event) {
        console.log(event.target.dataset.email);
    }

    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        console.log(this.props.contactLoading);
        const colors = ['purple', 'yellow', 'green'];
        const colorsLength = colors.length;
        return (
            <React.Fragment>
                {!this.state.formActive ?
                    <div className='contact-table-section'>
                        <Button color='orange' onClick={this.addContact}>Add Contact</Button>
                        <div>
                            {this.props.contactLoading &&
                                <div>Loading ...</div>
                            }
                            {this.props.contacts &&
                                <React.Fragment>
                                    <div className='content-heading'><span className='heading-underline'>Contact Table</span></div>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>Email</Table.HeaderCell>
                                                <Table.HeaderCell>Phone No</Table.HeaderCell>
                                                <Table.HeaderCell>Group</Table.HeaderCell>
                                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.props.contacts.map((contact) =>
                                                <Table.Row key={contact.email}>
                                                    <Table.Cell>{contact.name}</Table.Cell>
                                                    <Table.Cell>{contact.email}</Table.Cell>
                                                    <Table.Cell>{contact.phone_no}</Table.Cell>
                                                    <Table.Cell verticalAlign='top'>
                                                        {contact.groups.map((group, index) => <Button size='mini' color={colors[index % colorsLength]}>{group.name}</Button>)}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Icon name='trash alternate outline' onClick={this.handleClick} data-email={contact.email} />
                                                    </Table.Cell>

                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                    <ul>

                                    </ul>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    :
                    <div className='add-contact-form-section'>
                        <div onClick={this.addContact}>
                            <Icon name='arrow left' />Back
                        </div>
                        <AddContact formClick={this.addContact} />
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        contacts: state.contactReducer.contacts,
        error: state.contactReducer.contactFetchError,
        contactLoading: state.contactReducer.contactLoading,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => dispatch(getContacts()),
    }
}


Contact = connect(mapStateToProps, mapDispatchToProps)(Contact);
export default Contact;