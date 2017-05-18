import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Select, Button, Popconfirm } from 'antd';

import QuestionCardAnswer from './QuestionCardAnswer';
import QuestionCardDefaultAnswer from './QuestionCardDefaultAnswer';
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
	};
	
	handleSelectChange = (value) => {
        const { questionActions, question } = this.props;
        const newQuestion = Object.assign({}, question);

		if (value === 'own') {
			newQuestion.answers = [];
			newQuestion.ownAnswer.text = 'Own answer';
		} else if (value === 'options') {
			newQuestion.answers = [
				{
					id: 1,
					text: "Answer",
				}
			];
			newQuestion.ownAnswer.text = '';
		} else {
			newQuestion.answers = [
				{
					id: 1,
					text: "Answer",
				}
			];
			newQuestion.ownAnswer.text = 'Own answer';
		}
        newQuestion.type = value;

        questionActions.updateQuestion(newQuestion);
	};
	
	handleInputChange = (event) => {
		const { questionActions, question } = this.props;
		const newQuestion = Object.assign({}, question);
        
        newQuestion.question = event.target.value;
		questionActions.updateQuestion(newQuestion);
	};
    
	editCard = (event) => {
		this.setState({ isEditing: true, onHover: false, isExpanded: true });
		event.stopPropagation();
	};

	saveCard = (event) => {
		const { question, questionActions } = this.props;

		if (question.type !== 'own' && question.answers.some(a => a.text === '') ||
			question.question === '' ||
			(question.type !== 'options' && question.ownAnswer.text === '')) {
            openNotification('error', 'All fields should be filled')
		} else {
			if (question.isNew) {
				let order = [...this.props.order];
				const removed = order.splice(question.index - 1, order.length, { id: 1, index: question.index });
				removed.forEach(q => q.index++);
				order = order.concat(removed);
				questionActions.addQuestion(question, order, () => {this.setState({ isEditing: false, onHover: true })});
			} else {
				questionActions.saveQuestion(question, () => {this.setState({ isEditing: false, onHover: true })});
			}
        }
		event.stopPropagation();
	};

	cancelEditCard = (event) => {
		const { question, questionActions } = this.props;
		this.setState({ isEditing: false, onHover: true });

		questionActions.cancelUpdateQuestion(question);
		event.stopPropagation();
	};

	handleDeleteCard = (event) => {
		event.stopPropagation();
	};

	deleteCard = (event) => {
		const { question, questionActions, order } = this.props;
		let newOrder = [...order];

		const index = newOrder.find(q => q.id === question.id).index;
		newOrder.splice(index - 1, 1);
		const newOrderRight = newOrder.splice(index - 1, newOrder.length);
		newOrderRight.forEach(item => item.index--);
		newOrder = newOrder.concat(newOrderRight);

		questionActions.deleteQuestion({ id: question.id }, newOrder);
		event.stopPropagation();
	};

	onMouseEnterHandler = () => {
		this.setState({ onHover: true });
	};

	onMouseLeaveHandler = () => {
		this.setState({ onHover: false });
	};
	
	addCard = () => {
        const { addQuestionForm, question } = this.props;

        addQuestionForm(question.index);
	};

	moveUp = () => {
        const { question, questionActions, order } = this.props;
		const newOrder = [...order];

		if (order.find(item => item.id === question.id).index === 1) {
            newOrder.forEach(item => item.index--);
            newOrder.find(item => item.id === question.id).index = order.length;
		} else {
            const index = order.find(item => item.id === question.id).index;
            newOrder.find(item => item.index === index - 1).index++;
            newOrder.find(item => item.id === question.id).index--;
		}
		newOrder.sort(function (a, b) {
			if (a.index > b.index) {
				return 1;
			}
			if (a.index < b.index) {
				return -1;
			}
		});

        questionActions.changeOrder(newOrder, true);
	};

	moveDown = () => {
        const { question, questionActions, order } = this.props;
        const newOrder = [...order];

        if (order.find(item => item.id === question.id).index === order.length) {
            newOrder.forEach(item => item.index++);
            newOrder.find(item => item.id === question.id).index = 1;
        } else {
            const index = order.find(item => item.id === question.id).index;
            newOrder.find(item => item.index === index + 1).index--;
            newOrder.find(item => item.id === question.id).index++;
        }
		newOrder.sort(function (a, b) {
			if (a.index > b.index) {
				return 1;
			}
			if (a.index < b.index) {
				return -1;
			}
		});

        questionActions.changeOrder(newOrder, true);
	};

    render() {
	    const { isEditing, isExpanded, onHover } = this.state;
	    const { question, isAddingSurvey, forceExpanded, isAddingQuestion } = this.props;
	    let questionType;

	    if (question.type === 'own') {
		    questionType = 'Own answer';
	    } else if (question.type === 'options'){
		    questionType = 'Options';
	    } else {
		    questionType = 'Own answer and options';
	    }

	    return (
	        <div className="card card-wrapper">
		        {!isAddingSurvey ?
		        <div className="card-question-wrapper"
		             onClick={this.expandCard}
		             onMouseEnter={this.onMouseEnterHandler}
		             onMouseLeave={this.onMouseLeaveHandler}
		        >
			        <p className="card-text">{question.index}</p>
			        {isEditing || question.isNew ?
				        <div className="card-edit-wrapper">
					        <Input
						        size="large"
						        value={question.question}
						        className="card-edit-question"
						        onChange={this.handleInputChange}
					        />
					        {question.isNew ?
							<Select
								size="large"
								defaultValue={question.type}
								onChange={this.handleSelectChange}
								className="card-edit-questionType"
							>
								<Option value="own">Own answer</Option>
								<Option value="options">Options</Option>
								<Option value="ownAndOptions">Own answer and options</Option>
							</Select>
								:
						        <p className="card-text card-text-questionType">{questionType}</p>}
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
						        disabled={isAddingQuestion}
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
					                disabled={isAddingQuestion}
					            />
					        </Popconfirm>
		                </div>}
		        </div> : null}
		        {onHover && !isAddingQuestion ?
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
		        {(isExpanded || forceExpanded) && !isAddingSurvey ?
			        <div className="answers-wrapper">
				        {question.answers.map((answer, i) => (
							<QuestionCardAnswer
								key={question.id + i}
								question={question}
								answer={answer}
								isEditing={isEditing}
							/>
						))}
				        {question.type === 'ownAndOptions' || question.type === 'own' ?
				        <QuestionCardDefaultAnswer
					        key={question.id}
					        question={question}
					        answer={question.ownAnswer}
					        isEditing={isEditing}
				        /> : null}
					</div>
		            : null}
	        </div>
        );
    }
}

const mapStateToProps = (state) => ({
	order: state.question.order,
	isAddingQuestion: state.question.isAddingQuestion,
});

const mapDispatchToProps = (dispatch) => ({
	questionActions: bindActionCreators(new QuestionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(QuestionCard);