import React, { Component } from 'react';
import { Button, Form, Segment, TextArea, Grid, Modal, Header, Image } from 'semantic-ui-react';
import { sendEmail } from '../actions/emailActions';
import { connect } from 'react-redux';
import * as constURL from '../actions/constants';
import AddLinks from './AddLinks';

class NewEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: '',
            body: '',
            subject: '',
            trackerStatus: false,
            trackerId: '',
            imgTag: '',
            linkList: [],
            open: false,
            linkFormError: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.createTracker = this.createTracker.bind(this);
        this.handleLinkTracking = this.handleLinkTracking.bind(this);
        this.handleLinkFormToggle = this.handleLinkFormToggle.bind(this);
        this.handleLinkFormError = this.handleLinkFormError.bind(this);
    }

    handleLinkFormError(error) {
        error ? this.setState({linkFormError: error}):this.setState({linkFormError: ""});
    }

    handleLinkTracking(linkUrl, linkHTMLTag, linkText, linkId) {
        this.setState(prevState=> ({
            linkList: [...prevState.linkList, {linkUrl, linkId}],
            body: prevState.body + linkHTMLTag,
        }));
    }

    handleChange(event, { name, value }) {
        this.setState({ [name]: value });
    }

    handleLinkFormToggle() {
        this.setState(prevState=> ({
            open: !prevState.open
        }));
    }

    handleSubmit(event) {
        let links = JSON.stringify(this.state.linkList); 
        let formData = new FormData();
        formData.set('to', this.state.to);
        formData.set('body', this.state.body);
        formData.set('subject', this.state.subject);
        formData.set('links', links);
        if (this.state.trackerStatus) {
            formData.set('trackerId', this.state.trackerId)
        }
        this.props.sendEmail(formData)
            .then(() => this.props.handleStateChange('SentEmail'));
    }

    createTracker() {
        let randomIdentity = +new Date() + Math.random().toString(36).slice(2);
        let url = constURL.trackerURL + randomIdentity
        console.log(url);
        let imageTag = `<img src=${url}>`
        console.log(imageTag)
        return ([imageTag, randomIdentity]);
    }

    handleClick(event) {
        console.log(event.target.textContent);
        const type = event.target.dataset.id;
        if (type == 'add') {
            const [imageTag, trackerId] = this.createTracker();
            this.setState(prevState => ({
                trackerStatus: !prevState.trackerStatus,
                body: prevState.body + imageTag,
                imgTag: imageTag,
                trackerId: trackerId
            }));
        } else if (type == 'remove') {
            this.setState(prevState => ({
                trackerStatus: !prevState.trackerStatus,
                body: prevState.body.replace(prevState.imgTag, ''),
                imgTag: '',
                trackerId: ''
            }));
        }
    }

    render() {
        let { to, body, subject } = this.state

        return (
            <div className='add-contact-form'>
                <Grid centered>
                    <Grid.Column width={10}>
                        <Segment inverted>
                            <div className='content-heading heading-form-underline'>
                                <span className='email-form-heading'>Email</span>
                                {!this.state.trackerStatus &&
                                    <Button onClick={this.handleClick} size='mini' data-id='add' color='orange'>Add Tracker</Button>
                                }
                                {this.state.trackerStatus &&
                                    <Button onClick={this.handleClick} size='mini' data-id='remove' color='orange'>Remove Tracker</Button>
                                }
                                <AddLinks
                                    open={this.state.open}
                                    linkFormError={this.state.linkFormError}
                                    handleLinkFormToggle={this.handleLinkFormToggle}
                                    handleLinkFormError={this.handleLinkFormError}
                                    handleLinkTracking={this.handleLinkTracking}/>
                            </div>
                            <Form inverted onSubmit={this.handleSubmit}>
                                {this.props.sendEmailError}
                                <Form.Input
                                    label='To'
                                    type='text'
                                    value={to}
                                    name='to'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label='Subject'
                                    type='text'
                                    value={subject}
                                    name='subject'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label='Body'
                                    control={TextArea}
                                    style={{ minHeight: 300 }}
                                    placeholder='Emails can be in plain text/html templates.'
                                    type='text'
                                    value={body}
                                    name='body'
                                    onChange={this.handleChange}
                                />
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        sendEmailError: state.emailReducer.sendEmailError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendEmail: (data) => dispatch(sendEmail(data))
    }
}

NewEmail = connect(mapStateToProps, mapDispatchToProps)(NewEmail)
export default NewEmail;