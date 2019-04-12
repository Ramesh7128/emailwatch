import React, { Component } from 'react';
import { Button, Checkbox, Form, Segment, Dropdown, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getGroups } from '../actions/groupActions';
import { createContact } from '../actions/contactActions';

class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            groupList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getGroups();
    }

    handleChange(event, { name, value }) {
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        let formData = new FormData();
        formData.set('email', this.state.email);
        formData.set('phone_no', this.state.phone);
        formData.set('groups', this.state.groupList);
        formData.set('name', this.state.name);
        this.props.createContact(formData)
            .then(() => this.props.formClick())
    }

    render() {
        const { name, email, phone, groupList } = this.state;
        if (this.props.groupLoading) {
            return <div>Loading...</div>
        } else if (this.props.error) {
            return <div>{this.props.error}</div>
        } else if (!this.props.groupLoading && this.props.groups) {
            const options = this.props.groups.map(group => {
                return {
                    key: group.name,
                    text: group.name,
                    value: group.name
                }
            });
            return (
                <div className='add-contact-form'>
                    <Grid centered>
                        <Grid.Column width={10}>
                            <Segment inverted>
                                <Form inverted onSubmit={this.handleSubmit}>
                                    {this.props.contactCreateError}
                                    <Form.Input
                                        label='Contact Name'
                                        type='text'
                                        value={name}
                                        name='name'
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        label='Email'
                                        type='type'
                                        value={email}
                                        name='email'
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        label='Phone'
                                        type='text'
                                        value={phone}
                                        name='phone'
                                        onChange={this.handleChange}
                                    />
                                    <Form.Dropdown
                                        placeholder='Group'
                                        label='Group'
                                        name='groupList'
                                        options={options}
                                        multiple selection
                                        value={groupList}
                                        onChange={this.handleChange}
                                    />
                                    <Button type='submit'>Submit</Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        groups: state.groupReducer.groups,
        groupLoading: state.groupReducer.groupLoading,
        error: state.groupReducer.error,
        contactCreateError: state.contactReducer.contactCreateError,
        contactCreateSuccess: state.contactReducer.contactCreateSuccess,
        contactCreateLoading: state.contactReducer.contactCreateLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: () => dispatch(getGroups()),
        createContact: (data) => dispatch(createContact(data))
    }
}

AddContact = connect(mapStateToProps, mapDispatchToProps)(AddContact);

export default AddContact;
