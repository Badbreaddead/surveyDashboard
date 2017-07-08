import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Select, Button, Input, Spin, Tooltip, Popconfirm } from 'antd';

import QuestionCard from './QuestionCard';
import QuestionActions from '../../actions/question';
import SurveyActions from '../../actions/survey';
import { openNotification } from '../../actions/notification';

const Option = Select.Option;

class Questions extends Component {
	constructor() {
		super();

		this.state = {
			isEditing: false,
			isAdding: false,
			surveyNameTemporary: 'SurveyName',
			thankYouTemporary: 'Thank you',
		};
	}

	componentWillMount () {
		const { surveyActions } = this.props;

		surveyActions.getSurveys();
	}

	deleteSurvey = () => {
		const { surveyActions, currentSurvey } = this.props;

		surveyActions.deleteSurvey(currentSurvey);
	};
  
  handleActivationTelegram = () => {
		const { surveyActions, currentSurvey } = this.props;
		const request = {
			id: currentSurvey.id,
      isActiveTelegram: !currentSurvey.isActiveTelegram,
		};

		surveyActions.changeTelegramSurveyStatus(request);
	};
  
  handleActivationFacebook = () => {
    const { surveyActions, currentSurvey } = this.props;
    const request = {
      id: currentSurvey.id,
      isActiveFacebook: !currentSurvey.isActiveFacebook,
    };
    
    surveyActions.changeFacebookSurveyStatus(request);
  };

	handleSelectChange = (id) => {
		const { surveyActions, questionActions, surveys } = this.props;

		questionActions.getQuestions({ survey: id });
		surveyActions.chooseSurvey(surveys.find(s => s.id === id));
	};

	handleNameChange = (event) => {
		this.setState({ surveyNameTemporary: event.target.value })
	};

	handleThankYouChange = (event) => {
		this.setState({ thankYouTemporary: event.target.value });
	};

	editSurvey = () => {
		const { currentSurvey } = this.props;
		this.setState({ isEditing: true, surveyNameTemporary: currentSurvey.name, thankYouTemporary: currentSurvey.thankYou });
	};

	saveSurvey = () => {
		const { currentSurvey, surveyActions } = this.props;
		const { surveyNameTemporary, thankYouTemporary } = this.state;

		const changedSurvey = {
			id: currentSurvey.id,
			name: surveyNameTemporary,
			thankYou: thankYouTemporary,
		};

		if (!changedSurvey.name || !changedSurvey.thankYou) {
            openNotification('error', 'All fields should be filled');
		} else {
            surveyActions.saveSurvey(changedSurvey, () => {this.setState({ isEditing: false })});
        }
	};

	cancelEditSurvey = () => {
		this.setState({ isEditing: false })
	};

	addSurvey = () => {
		this.setState({ isAdding: true, surveyNameTemporary: 'SurveyName', thankYouTemporary: 'Thank you' })
	};

	confirmAddSurvey = () => {
		const { surveyActions } = this.props;
		const { surveyNameTemporary, thankYouTemporary } = this.state;

		const newSurvey = {
			name: surveyNameTemporary,
			thankYou: thankYouTemporary,
		};

		surveyActions.addSurvey(newSurvey, () => {this.setState({ isAdding: false })});
	};

	cancelAddSurvey = () => {
		this.setState({ isAdding: false })
	};

	exportGoogle = () => {
		const { surveyActions } = this.props;

		surveyActions.exportGoogle();
	}

	sendUnanswered = () => {
		const { surveyActions } = this.props;

		surveyActions.sendUnanswered();
	}
    
    addQuestionForm = (index) => {
		const { currentSurvey, questionActions } = this.props;
		const question = {
			id: index.target ? 2 : 1,
			survey: currentSurvey.id,
			question: "Question",
			index: index.target ? 1 : index + 1,
			answers: [
				{
					id: 1,
					text: "Answer",
				}
			],
			ownAnswer: {
				text: "Own answer",
			},
			type: "ownAndOptions",
			isNew: true,
		};

		questionActions.addQuestionForm(question);
	};
	
    render() {
	    const { isEditing, isAdding, surveyNameTemporary, thankYouTemporary } = this.state;
	    const { questions, surveys, currentSurvey, isFetching } = this.props;

	    return (
		    <Spin className="questions-spinner" size="large" spinning={isFetching}>
	    	    <div className="questions">
				    {currentSurvey ?
					    <div>
						    <Row className="questions-surveys">
							    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
								    <Tooltip
									    placement="topLeft"
									    title='Delete the survey'
									    mouseEnterDelay={1}
								    >
									    <Popconfirm title="Delete the survey?"
									                onConfirm={this.deleteSurvey}
									                okText="Yes"
									                cancelText="No"
									                placement="bottomLeft"
									    >
										    <Button
											    disabled={isAdding}
											    icon="delete"
											    className="modify-button"
										    />
									    </Popconfirm>
								    </Tooltip>
								    <Tooltip
									    placement="topLeft"
									    title='If BLUE the survey is active'
									    mouseEnterDelay={1}
								    >
									    <Button
										    type={currentSurvey.isActiveTelegram ? 'primary' : 'default'}
										    icon="poweroff"
										    className="modify-button"
										    onClick={this.handleActivationTelegram}
										    disabled={isAdding}
									    > T
                      </Button>
								    </Tooltip>
                    <Tooltip
                      placement="topLeft"
                      title='If BLUE the survey is active'
                      mouseEnterDelay={1}
                    >
                      <Button
                        type={currentSurvey.isActiveFacebook ? 'primary' : 'default'}
                        className="modify-button"
                        onClick={this.handleActivationFacebook}
                        disabled={isAdding}
                      > F
                      </Button>
                    </Tooltip>
							    </Col>
							    {isAdding || isEditing ?
								    <Col xs={{ span: 12 }} sm={{ span: 6 }}>
									    <Tooltip
										    placement="top"
										    title='Type in the name of the survey'
										    mouseEnterDelay={1}
									    >
										    <Input
											    value={isAdding || isEditing ? surveyNameTemporary : currentSurvey.name}
											    size="large"
											    className="questions-input questions-input-survey"
											    onChange={this.handleNameChange}
										    />
									    </Tooltip>
								    </Col>
							        :
								    <Col xs={{ span: 12 }} sm={{ span: 6 }}>
									    <Select
										    value={currentSurvey.name}
										    size="large"
										    className="questions-select"
									        onChange={this.handleSelectChange}
									    >
										    {surveys.map((survey, i) => {
											    return <Option value={survey.id} key={i}>{survey.name}</Option>
										    })}
									    </Select>
								    </Col>
							    }
							    {isEditing ?
								    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
									    <Button icon="check" className="modify-button" onClick={this.saveSurvey}/>
									    <Button icon="close" className="modify-button" onClick={this.cancelEditSurvey}/>
								    </Col>
								    : null}
							    {isAdding ?
								    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
									    <Button icon="check" className="modify-button" onClick={this.confirmAddSurvey}/>
									    <Button icon="close" className="modify-button" onClick={this.cancelAddSurvey}/>
								    </Col>
								    : null}
							    {!isAdding && !isEditing ?
								    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
									    <Tooltip
										    placement="topRight"
										    title='Edit the survey'
										    mouseEnterDelay={1}
									    >
										    <Button
											    icon="edit"
											    className="modify-button"
											    onClick={this.editSurvey}
										    />
									    </Tooltip>
									    <Tooltip
										    placement="topRight"
								             title='Add new survey'
								             mouseEnterDelay={1}
									    >
										    <Button
											    icon="plus"
											    className="modify-button"
											    onClick={this.addSurvey}
										    />
									    </Tooltip>
								    </Col>
								    : null}
							    {isAdding || isEditing ?
								    <Col xs={{ span: 12, offset: 6 }} sm={{ span: 6, offset: 0 }} className="modify-button-wrap">
									    <Tooltip
										    placement="top"
										    title='Message at the end of the survey'
										    mouseEnterDelay={1}
									    >
										    <Input
											    size="large"
											    value={isAdding || isEditing ? thankYouTemporary : currentSurvey.thankYou}
											    className="questions-input questions-input-thank-you"
											    onChange={this.handleThankYouChange}
										    />
									    </Tooltip>
								    </Col>
								    :
								    <Col xs={{ span: 12, offset: 6 }} sm={{ span: 6, offset: 0 }} className="modify-button-wrap-thank-you">
									    <Tooltip
										    placement="top"
										    title='Message at the end of the survey'
										    mouseEnterDelay={1}
									    >
								            <p className="questions-text questions-text-thank-you">{currentSurvey.thankYou}</p>
									    </Tooltip>
								    </Col>
							    }
							    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap modify-button-wrap-send">
								    <Tooltip
									    placement="topRight"
									    title='Export to google spreadsheet'
									    mouseEnterDelay={1}
								    >
									    <Popconfirm title="Export to google spread sheet?"
									                onConfirm={this.exportGoogle}
									                okText="Yes"
									                cancelText="No"
									                placement="bottomRight"
									    >
										    <Button
											    className="modify-button"
											    icon="export"
											    disabled={isAdding || isEditing}
										    />
									    </Popconfirm>
								    </Tooltip>
								    <Tooltip
									    placement="topRight"
									    title='Send unanswered questions to users'
									    mouseEnterDelay={1}
								    >
									    <Popconfirm title="Send unanswered questions to users?"
									                onConfirm={this.sendUnanswered}
									                okText="Yes"
									                cancelText="No"
									                placement="bottomRight"
									    >
										    <Button
											    className="modify-button modify-button-send"
											    icon="message"
											    disabled={isAdding || isEditing}
										    />
									    </Popconfirm>
								    </Tooltip>
							    </Col>
						    </Row>
						    <div className="questions-wrapper">
						    {questions.length ?
							    questions.map(question => {
								    return <QuestionCard
												key={question.id}
												question={question}
												isAddingSurvey={isAdding}
												forceExpanded={question.isNew}
												addQuestionForm={this.addQuestionForm}
											/>
							    })
							    :
							    <div className="card card-wrapper">
								    <div className="card-question-wrapper centered">
									    <Button
										    icon="plus"
										    className="modify-button"
										    onClick={this.addQuestionForm}
									    />
								    </div>
							    </div>
						    }
						    </div>
					    </div>

				        : !isFetching ?
						    <Row className="questions-surveys">
							    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
							    <Button
								    disabled={true}
								    icon="delete"
								    className="modify-button"
							    />
							    <Button
								    type={'default'}
								    icon="poweroff"
								    className="modify-button"
								    disabled={true}
							    />
							    </Col>
							    <Col xs={{ span: 12 }} sm={{ span: 6 }}>
								    <Tooltip
									    placement="top"
									    title='Enter name of your first survey'
									    visible={true}
								    >
									    <Input
										    value={surveyNameTemporary}
										    size="large"
										    className="questions-input questions-input-survey"
										    onChange={this.handleNameChange}
									    />
								    </Tooltip>
							    </Col>
							    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap">
								    <Button icon="check" className="modify-button" onClick={this.confirmAddSurvey}/>
								    <Button icon="close" className="modify-button" disabled={true}/>
							    </Col>
							    <Col xs={{ span: 12, offset: 6 }} sm={{ span: 6, offset: 0 }} className="modify-button-wrap">
								    <Tooltip
									    placement="bottom"
									    title='Enter message at the end of the survey'
									    visible={true}
								    >
									    <Input
										    size="large"
										    value={thankYouTemporary}
										    className="questions-input questions-input-thank-you"
										    onChange={this.handleThankYouChange}
									    />
							        </Tooltip>
							    </Col>
							    <Col xs={{ span: 6 }} sm={{ span: 4 }} className="modify-button-wrap modify-button-wrap-send">
								    <Button
									    className="modify-button"
									    icon="export"
									    disabled={true}
								    />
								    <Button
									    className="modify-button"
									    icon="message"
									    disabled={true}
								    />
							    </Col>
						    </Row> : null
			        }
				</div>
		    </Spin>
        );
    }
}

const mapStateToProps = (state) => ({
	isFetching: state.question.isFetching || state.survey.isFetching,
	questions: state.question.questions,
	surveys: state.survey.surveys,
	currentSurvey: state.survey.currentSurvey,
});

const mapDispatchToProps = (dispatch) => ({
	questionActions: bindActionCreators(new QuestionActions, dispatch),
	surveyActions: bindActionCreators(new SurveyActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);