import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSentEmails } from '../actions/emailActions';
import { Button, Checkbox, Form, Segment, Dropdown, Grid, Table, Icon } from 'semantic-ui-react';

class SentEmail extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getSentEmails();
    }
    render() {
        return (
            <React.Fragment>
                <div className='content-heading'><span className='heading-underline'>Sent Emails</span></div>
                {this.props.getEmailsLoading &&
                    <div>Loading...</div>
                }
                {this.props.getEmailsSuccess &&
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>TrackerID</Table.HeaderCell>
                                <Table.HeaderCell>Receiver</Table.HeaderCell>
                                <Table.HeaderCell>subject</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Read Status</Table.HeaderCell>
                                <Table.HeaderCell>Sent Date</Table.HeaderCell>
                                <Table.HeaderCell>Read Date</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.getEmailsSuccess.map((email) =>
                                <Table.Row key={email.id}>
                                    <Table.Cell>{email.tracker_id}</Table.Cell>
                                    <Table.Cell>{email.receiver}</Table.Cell>
                                    <Table.Cell>{email.subject}</Table.Cell>
                                    <Table.Cell>{email.status}</Table.Cell>
                                    <Table.Cell>{email.read_status}</Table.Cell>
                                    <Table.Cell>{email.creation_date}</Table.Cell>
                                    <Table.Cell>{email.read_date}</Table.Cell>
                                    <Table.Cell>
                                        <Icon name='trash alternate outline' onClick={this.handleClick} data-id={email.id} />
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        getEmailsLoading: state.emailReducer.getEmailsLoading,
        getEmailsSuccess: state.emailReducer.getEmailsSuccess,
        getEmailsError: state.emailReducer.getEmailsError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSentEmails: () => dispatch(getSentEmails()),
    }
}

SentEmail = connect(mapStateToProps, mapDispatchToProps)(SentEmail)
export default SentEmail;