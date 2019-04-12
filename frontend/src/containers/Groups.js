import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Icon, Table } from 'semantic-ui-react'
import AddGroup from './AddGroup';
import { connect } from 'react-redux';
import { getGroups } from '../actions/groupActions';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false
        };
        this.addGroup = this.addGroup.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    addGroup(event) {
        this.setState(prevState => ({
            formActive: !prevState.formActive
        }));
    }

    componentDidMount() {
        this.props.getGroups();
    }

    handleClick(event) {
        console.log(event.target.dataset.name);
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.formActive ?
                    <div className='contact-table-section'>
                        <Button color='green' onClick={this.addGroup}>Add Group</Button>
                        <div>
                            {this.props.contactLoading &&
                                <div>Loading ...</div>
                            }
                            {this.props.groups &&
                                <React.Fragment>
                                    <div className='content-heading'><span className='heading-underline'>Groups</span></div>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>Desciption</Table.HeaderCell>
                                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.props.groups.map((group) =>
                                                <Table.Row key={group.name}>
                                                    <Table.Cell>{group.name}</Table.Cell>
                                                    <Table.Cell>{group.description}</Table.Cell>
                                                    <Table.Cell>
                                                        <Icon name='trash alternate outline' onClick={this.handleClick} data-name={group.name} />
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
                        <div onClick={this.addGroup}>
                            <Icon name='arrow left' />Back
                        </div>
                        <AddGroup formClick={this.addGroup}/>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        groups: state.groupReducer.groups,
        error: state.groupReducer.groupFetchError,
        groupLoading: state.groupReducer.groupLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: () => dispatch(getGroups())
    }
}

Groups = connect(mapStateToProps, mapDispatchToProps)(Groups);

export default Groups;