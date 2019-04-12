import React, { Component } from 'react';
import { Button, Form, Segment, TextArea, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createGroup } from '../actions/groupActions';


class AddGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, { name, value }) {
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        let formData = new FormData();
        console.log(this.state, 'check for state');
        formData.set('name', this.state.name);
        formData.set('description', this.state.description);
        this.props.createGroup(formData)
            .then(() => this.props.formClick());
    }

    render() {
        const { name, description } = this.state;
        return (
            <div className='add-contact-form'>
                <Grid centered>
                    <Grid.Column width={10}>
                        <Segment inverted>
                            <Form inverted onSubmit={this.handleSubmit}>
                                {this.props.groupCreateError}
                                <Form.Input
                                    label='name'
                                    type='text'
                                    value={name}
                                    name='name'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label='Description'
                                    control={TextArea}
                                    type='text'
                                    value={description}
                                    name='description'
                                    onChange={this.handleChange}
                                />
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        groupCreateError: state.groupReducer.groupCreateError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: (data) => dispatch(createGroup(data))
    }
}

AddGroup = connect(mapStateToProps, mapDispatchToProps)(AddGroup);
export default AddGroup;
