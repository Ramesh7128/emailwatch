import React, { Component } from 'react';
import { Button, Form, Segment, TextArea, Grid, Modal, Header, Image } from 'semantic-ui-react';
import * as constURL from '../actions/constants';

class AddLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkUrl: '',
            linkHTMLTag: '',
            linkText: '',
            linkId: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createLinkTracker = this.createLinkTracker.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleModalclose = this.handleModalclose.bind(this);
    }

    handleChange(event, { name, value }) {
        this.setState({ [name]: value });
    }

    handleClick() {
        console.log('check');
        this.props.handleLinkFormToggle();
        this.props.handleLinkFormError();
    }

    createLinkTracker() {
        let randomIdentity = +new Date() + Math.random().toString(36).slice(2);
        let url = constURL.LinkTrackerURL + randomIdentity
        console.log(url);
        let linkHTMLTag = `<a href=${url}>${this.state.linkText}</a>`
        return ([linkHTMLTag, randomIdentity]);
    }
    
    handleModalclose() {
        this.props.handleLinkFormError();
        this.props.handleLinkFormToggle();
    }

    handleSubmit(event) {
        if (this.state.linkUrl) {
            const [linkHTMLTag, randomIdentity] = this.createLinkTracker()
            console.log(this.state, linkHTMLTag, randomIdentity, 'inside add links');
            this.setState({ linkHTMLTag: linkHTMLTag, linkId: randomIdentity, open: false },
                () => {
                    this.props.handleLinkTracking(
                        this.state.linkUrl,
                        this.state.linkHTMLTag,
                        this.state.linkText,
                        this.state.linkId)
                });
            this.props.handleLinkFormToggle();
        } else {
            this.props.handleLinkFormError('Link url is required*');
        }
    }

    render() {
        const { linkUrl, linkText, open } = this.state;
        return (
            <Modal
                onClose={this.handleModalclose} 
                open={this.props.open}
                trigger={<Button onClick={this.handleClick} size='mini' data-id='addlinks' color='green'>Add Tracking Links</Button>}>
                <Modal.Header>Add Link</Modal.Header>
                <Modal.Content>
                    <Segment inverted>
                        <Form inverted onSubmit={this.handleSubmit}>
                            {this.props.linkFormError}
                            <Form.Input
                                label='Link URL'
                                type='text'
                                value={linkUrl}
                                name='linkUrl'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Link placeholder text'
                                type='text'
                                value={linkText}
                                name='linkText'
                                onChange={this.handleChange}
                            />
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Segment>
                </Modal.Content>
            </Modal>

        );
    }
}

export default AddLinks;