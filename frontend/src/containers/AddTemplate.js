import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { createTemplate } from '../actions/templateActions'
import { Segment, Button, Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

class AddTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "**Hello world!!!**",
            name: '',
            tab: "write"
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
        this.handleClick = this.handleClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleClick() {
        let formData = new FormData();;
        formData.set('value', this.state.value);
        formData.set('name', this.state.name);
        this.props.createTemplate(formData)
            .then(() => this.props.formClick())
    }

    handleValueChange = value => {
        this.setState({ value });
    };

    handleNameChange(event) {
        console.log(event.target.value);
        this.setState({
            name: event.target.value
        });
        console.log(this.state);
    }

    handleTabChange = tab => {
        this.setState({ tab });
    };

    render() {
        let name = '';
        return (
            <div className="container">
                <Segment inverted color='black'>
                    <div className='form-field-template'>
                        <Input inverted onChange={this.handleNameChange} placeholder='name' />
                    </div>
                    <div className='form-field-template'>
                        <ReactMde
                            onChange={this.handleValueChange}
                            onTabChange={this.handleTabChange}
                            value={this.state.value}
                            minEditorHeight={340}
                            maxEditorHeight={340}
                            minPreviewHeight={340}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(this.converter.makeHtml(markdown))
                            }
                            selectedTab={this.state.tab}
                        />
                    </div>
                    <Button onClick={this.handleClick} data-id='addlinks' color='green'>Add Template</Button>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        templateCreateError: state.templateReducer.templateCreateError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTemplate: (data) => dispatch(createTemplate(data))
    }
}

AddTemplate = connect(mapStateToProps, mapDispatchToProps)(AddTemplate)
export default AddTemplate;
