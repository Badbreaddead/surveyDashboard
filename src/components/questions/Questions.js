import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select, Button, Input, Spin } from 'antd';

import QuestionCard from './QuestionCard';
import QuestionActions from '../../actions/question';
import SurveyActions from '../../actions/survey';

const Option = Select.Option;

class Questions extends Component {
	constructor() {
		super();

		this.state = {
			isEditing: false,
			isAdding: false,
			active: true,
		};
	}

	componentWillMount () {
		const { questionActions, surveyActions } = this.props;

		questionActions.getQuestions();
		surveyActions.getSurveys();
	}

	deleteSurvey = () => {
		const { surveyActions, currentSurvey } = this.props;

		surveyActions.deleteSurvey(currentSurvey, () => {this.setState({ isDeleting: true })});
	}

	handleActivation = () => {
		const { active } = this.state;

		this.setState({ active: !active })
	}

	handleSelectChange = (value) => {
		const { surveyActions, surveys } = this.props;

		surveyActions.chooseSurvey(surveys[value]);
	}

	handleNameChange = (event) => {
		this.setState({ surveyNameTemporary: event.target.value })
	}

	handleThankYouChange = (event) => {
		this.setState({ thankYouTemporary: event.target.value });
	}

	editSurvey = () => {
		this.setState({ isEditing: true })
	}

	saveSurvey = () => {
		const { currentSurvey, surveyActions } = this.props;
		const { surveyNameTemporary, thankYouTemporary } = this.state;

		const changedSurvey = {
			id: currentSurvey.id,
			name: surveyNameTemporary || currentSurvey.name,
			thankYou: thankYouTemporary || currentSurvey.thankYou
		};

		surveyActions.saveSurvey(changedSurvey, () => {this.setState({ isEditing: false })});
	}

	cancelEditSurvey = () => {
		this.setState({ isEditing: false })
	}

	addSurvey = () => {
		this.setState({ isAdding: true })
	}

	confirmAddSurvey = () => {
		const { surveyActions } = this.props;
		const { surveyNameTemporary, thankYouTemporary } = this.state;

		const newSurvey = {
			name: surveyNameTemporary,
			thankYou: thankYouTemporary,
		};

		surveyActions.addSurvey(newSurvey, () => {this.setState({ isAdding: false })});
	}

	cancelAddSurvey = () => {
		this.setState({ isAdding: false })
	}

	exportGoogle = () => {
		this.setState({ google: true })
	}

	sendUnanswered = () => {
		this.setState({ send: true })
	}

    render() {
	    const { isEditing, isAdding, active } = this.state;
	    const { questions, surveys, currentSurvey, isFetching } = this.props;

	    return (
	    	<div className="questions">
			    {!isFetching && currentSurvey ?
				    <div>
					    <div className="questions-surveys">
						    <div className="modify-button-wrap">
							    <Button
								    disabled={isAdding}
								    icon="delete"
								    className="modify-button"
								    onClick={this.deleteSurvey}
							    />
							    <Button
								    type={active ? 'primary' : 'default'}
								    icon="poweroff"
								    className="modify-button"
								    onClick={this.handleActivation}
								    disabled={isAdding}
							    />
						    </div>
						    {isAdding || isEditing ?
							    <Input
								    defaultValue={isEditing ? currentSurvey.name : 'SurveyName'}
								    size="large"
								    className="questions-input questions-input-survey"
								    onChange={this.handleNameChange}
							    />
						        :
							    <Select
								    value={currentSurvey.name}
								    size="large"
								    className="questions-select"
							        onChange={this.handleSelectChange}
							    >
								    {surveys.map((survey, i) => {
									    return <Option key={i}>{survey.name}</Option>
								    })}
							    </Select>
						    }
						    {isEditing ?
							    <div className="modify-button-wrap">
								    <Button icon="check" className="modify-button" onClick={this.saveSurvey}/>
								    <Button icon="close" className="modify-button" onClick={this.cancelEditSurvey}/>
							    </div>
							    : null}
						    {isAdding ?
							    <div className="modify-button-wrap">
								    <Button icon="check" className="modify-button" onClick={this.confirmAddSurvey}/>
								    <Button icon="close" className="modify-button" onClick={this.cancelAddSurvey}/>
							    </div>
							    : null}
						    {!isAdding && !isEditing ?
							    <div className="modify-button-wrap">
								    <Button
									    icon="edit"
									    className="modify-button"
									    onClick={this.editSurvey}
								    />
								    <Button
									    icon="plus"
									    className="modify-button"
									    onClick={this.addSurvey}
								    />
							    </div>
							    : null}
						    {isAdding || isEditing ?
							    <div className="modify-button-wrap modify-button-wrap-thank-you">
								    <Input
									    size="large"
									    defaultValue={isEditing ? currentSurvey.thankYou : 'Thank you'}
									    className="questions-input questions-input-thank-you"
									    onChange={this.handleThankYouChange}
								    />
							    </div>
							    :
							    <div className="modify-button-wrap modify-button-wrap-thank-you">
							        <p className="questions-text questions-text-thank-you">{currentSurvey.thankYou}</p>
							    </div>
						    }
						    <Button
							    className="modify-button float-right"
							    icon="export"
							    onClick={this.exportGoogle}
							    disabled={isAdding || isEditing}
						    />
						    <Button
							    className="modify-button float-right"
							    icon="message"
							    onClick={this.sendUnanswered}
							    disabled={isAdding || isEditing}
						    />
					    </div>
					    <div className="questions-wrapper">
					    {questions.length ? questions.map((question, i) => {
							    if (question.survey === currentSurvey.name) {
								    return <QuestionCard key={i} question={question}/>
							    }
						    }) : null}
					    </div>
				    </div>
				    :
				    <div className="questions-spinner-wrapper">
				        <Spin className="questions-spinner" size="large" />
				    </div>
			    }
		    </div>
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