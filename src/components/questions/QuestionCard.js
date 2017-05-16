import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Select, Button, Popconfirm } from 'antd';

import QuestionCardAnswer from './QuestionCardAnswer';
import QuestionActions from '../../actions/question';
import { openNotification } from '../../actions/notification';

const Option = Select.Option;

class QuestionCard extends Component {
	constructor() {
		super();

		this.state = {
			isEditing: false,
			onHover: false,
			isExpanded: false,
		};
	}

	expandCard = () => {
		const { isExpanded, isEditing } = this.state;

		if (!isEditing) {
			this.setState({ isExpanded: !isExpanded });
		}
	}

	handleSelectChange = (value) => {

	}

	handleInputChange = (event) => {
		const { questionActions, initQuestions, question } = this.props;
		const initQuestion = JSON.parse(JSON.stringify(initQuestions.find(q => q.id === question.id)));

		initQuestion.question = event.target.value;
		questionActions.updateQuestion(initQuestion);
	}

	editCard = (event) => {
		this.setState({ isEditing: true, onHover: false, isExpanded: true });
		event.stopPropagation();
	}

	saveCard = (event) => {
		const { question, initQuestions, questionActions } = this.props;
		const changingQuestion = initQuestions.find(q => q.id === question.id);

		if (changingQuestion.answers.some(a => a.text === '') || changingQuestion.question === '')
		openNotification('error', 'All fields should be filled')
		else
		questionActions.saveQuestion(changingQuestion, () => {this.setState({ isEditing: false, onHover: true })});

		event.stopPropagation();
	}

	cancelEditCard = () => {
		const { question, questionActions } = this.props;
		this.setState({ isEditing: false, onHover: true });

		questionActions.updateQuestion(question);
	}

	handleDeleteCard = (event) => {
		event.stopPropagation();
	}

	deleteCard = (event) => {
		const { question, questionActions } = this.props;

		const questionId = { id: question.id };
		questionActions.deleteQuestion(questionId);
		event.stopPropagation();
	}

	onMouseEnterHandler = () => {
		this.setState({ onHover: true });
	}

	onMouseLeaveHandler = () => {
		this.setState({ onHover: false });
	}

	addCard = () => {
		console.log('addCard');
	}

	moveUp = () => {
		console.log('moveUp');
	}

	moveDown = () => {
		console.log('moveDown');
	}

    render() {
	    const { isEditing, isExpanded, onHover } = this.state;
	    const { question, item, initQuestions } = this.props;
	    const initQuestion = initQuestions.find(q => q.id === question.id);

		let questionType;
		if (question.ownAnswer.text === '')
			questionType = 'Options';
		else if (question.answers.length)
			questionType = 'Own answer and options';
		else
			questionType = 'Own answer';

	    return (
	        <div className="card card-wrapper">
		        <div className="card-question-wrapper"
		             onClick={this.expandCard}
		             onMouseEnter={this.onMouseEnterHandler}
		             onMouseLeave={this.onMouseLeaveHandler}
		        >
					<p className="card-text">{item + 1}</p>
			        {isEditing || question.isNew ?
				        <div className="card-edit-wrapper">
					        <Input
						        size="large"
						        value={initQuestion.question}
						        className="card-edit-question"
						        onChange={this.handleInputChange}
					        />
					        {question.isNew ?
						        <Select
							        size="large"
							        defaultValue={questionType}
							        onChange={this.handleSelectChange}
							        className="card-edit-questionType"
						        >
							        <Option value="Own answer">Own answer</Option>
							        <Option value="Options">Options</Option>
							        <Option value="Own answer and options">Own answer and options</Option>
						        </Select>
						        :
						        <p className="card-text card-text-questionType">{questionType}</p>
					        }
						        <Button icon="check" className="card-edit-button" onClick={this.saveCard}/>
						        <Button icon="close" className="card-edit-button" onClick={this.cancelEditCard}/>
				        </div>
			            :
				        <div className="card-edit-wrapper">
				            <p className="card-text card-text-question">{question.question}</p>
							<p className="card-text card-text-questionType">{questionType}</p>
					        <Button
						        icon="edit"
						        className="card-edit-button"
						        onClick={this.editCard}
					        />
					        <Popconfirm title="Delete this question?"
					                    onConfirm={this.deleteCard}
					                    okText="Yes"
					                    cancelText="No"
					        >
					            <Button
						            icon="delete"
						            className="card-delete-button"
						            onClick={this.handleDeleteCard}
					            />
					        </Popconfirm>
		                </div>}
		        </div>
		        {onHover ?
			        <div>
				        <div className="card-up-down-wrapper">
					        <Button
						        className="card-up-button"
						        icon="arrow-up"
						        onClick={this.moveUp}
						        onMouseEnter={this.onMouseEnterHandler}
						        onMouseLeave={this.onMouseLeaveHandler}
					        />
					        <Button
						        className="card-down-button"
						        icon="arrow-down"
						        onClick={this.moveDown}
						        onMouseEnter={this.onMouseEnterHandler}
						        onMouseLeave={this.onMouseLeaveHandler}
					        />
				        </div>
				        <Button
					        className="card-add-button"
					        icon="plus"
					        onClick={this.addCard}
					        onMouseEnter={this.onMouseEnterHandler}
					        onMouseLeave={this.onMouseLeaveHandler}
				        />
			        </div>
		            : null}
		        {isExpanded && question.answers.length ?
			        <div className="answers-wrapper">
				        {initQuestion.answers.map((answer, i) => {
					        if (answer) {
						        return <QuestionCardAnswer
							        key={question.id + i}
							        question={initQuestion}
							        answer={answer}
							        isEditing={isEditing}
						        />
					        }
				        })}
					</div>
		            : null}
	        </div>
        );
    }
}

const mapStateToProps = (state) => ({
	initQuestions: state.question.initQuestions,
});

const mapDispatchToProps = (dispatch) => ({
	questionActions: bindActionCreators(new QuestionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);