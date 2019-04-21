import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table, Card, Image } from 'semantic-ui-react';
import AddTemplate from './AddTemplate';
import { getTemplates } from '../actions/templateActions';
import * as Showdown from "showdown";


class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false,
            htmlTemplates: [],
        };
        this.addTemplates = this.addTemplates.bind(this);
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    componentDidMount() {
        this.props.getTemplates().then(templates => {
            let promise_html_templates = templates.map(template => {
                return Promise.resolve(this.converter.makeHtml(template.body));
            });
            Promise.all(promise_html_templates).then(values => {
                this.setState({htmlTemplates: values});
            });
        });
    }

    addTemplates() {
        this.setState(prevState => ({
            formActive: !prevState.formActive
        }));
    }

    render() {
        console.log(this.props.templateFetchSuccess, 'inside render');
        return (
            <React.Fragment>
                {!this.state.formActive ?
                    <div className='contact-table-section'>
                        <Button color='green' onClick={this.addTemplates}>Add Template</Button>
                        <div>
                            {this.props.templateFetchLoading && <div>Loading...</div>}
                            {this.props.templateFetchSuccess &&
                                <React.Fragment>
                                    <div className='content-heading'><span className='heading-underline'>Templates</span></div>
                                    {this.state.htmlTemplates.map((template, index) =>
                                        <Card>
                                            <div dangerouslySetInnerHTML={{__html: template}}>
                                            </div>
                                            <Card.Content>
                                                <Card.Header>{this.props.templateFetchSuccess[index].name}</Card.Header>
                                                <Card.Meta>
                                                    <span className='date'>Card tags filler</span>
                                                </Card.Meta>
                                                <Card.Description>check</Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <a>
                                                    <Icon name='user' />
                                                    22 Friends
                                            </a>
                                            </Card.Content>
                                        </Card>
                                    )}
                                </React.Fragment>
                            }
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

const mapStateToProps = (state) => {
    return {
        templateFetchLoading: state.templateReducer.templateFetchLoading,
        templateFetchError: state.templateReducer.templateFetchError,
        templateFetchSuccess: state.templateReducer.templateFetchSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTemplates: () => dispatch(getTemplates())
    }
}

Template = connect(mapStateToProps, mapDispatchToProps)(Template);
export default Template;