import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionActions from '../../actions/question';
import { openNotification } from '../../actions/notification';

const Option = Select.Option;

class QuestionCardAnswers extends Component {
	constructor() {
		super();

		this.state = {
			onHover: false,
		};
	}

	handleInputChange = (event) => {
		const { questionActions, answer, question } = this.props;
		let newQuestion = Object.assign({}, question);

        newQuestion.answers.find(a => a.id === answer.id).text = event.target.value;
	
		questionActions.updateQuestion(newQuestion);
	};

	deleteCardAnswers = () => {
		const { questionActions, answer, question } = this.props;
        let newQuestion = JSON.parse(JSON.stringify(question));
		let index;
        
        newQuestion.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

        if (question.answers.length > 1) {
	        newQuestion.answers.splice(index, 1);
	        let answersRight = newQuestion.answers.splice(index, newQuestion.answers.length);
	        answersRight.forEach(a => a.id--);
	        newQuestion.answers = newQuestion.answers.concat(answersRight);
	        questionActions.updateQuestion(newQuestion);
        } else {
	        openNotification('error', "Can't delete the only one answer option")
        }
	};

	onMouseEnterHandler = () => {
		this.setState({ onHover: true })
	};

	onMouseLeaveHandler = () => {
		this.setState({ onHover: false })
	};

	addAnswer = () => {
		const { questionActions, answer, question } = this.props;
        let newQuestion = JSON.parse(JSON.stringify(question));
		let index;
        
        newQuestion.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});
		const answersRight = newQuestion.answers.splice(index + 1, newQuestion.answers.length);
		answersRight.forEach(a => a.id++);
        newQuestion.answers.push({ id: index + 2, text: 'Answer' });
        newQuestion.answers = newQuestion.answers.concat(answersRight);

		questionActions.updateQuestion(newQuestion);
	};

	moveUp = () => {
		const { questionActions, answer, question } = this.props;
        let newQuestion = JSON.parse(JSON.stringify(question));
		let index;
        
        newQuestion.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

		if (index !== 0) {
            newQuestion.answers[index].id--;
            newQuestion.answers[index - 1].id++;
			const removed = newQuestion.answers.splice(index, 1);
            newQuestion.answers.splice(index - 1, 0, removed[0]);
		} else {
            newQuestion.answers[index].id = newQuestion.answers.length;
			const removedFirst = newQuestion.answers.splice(index, 1);
            newQuestion.answers.forEach(a => a.id--);
            newQuestion.answers.push(removedFirst[0]);
		}

		questionActions.updateQuestion(newQuestion);
	};

	moveDown = () => {
		const { questionActions, answer, question } = this.props;
        let newQuestion = JSON.parse(JSON.stringify(question));
		let index;
        
        newQuestion.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

		if (index !== newQuestion.answers.length - 1) {
            newQuestion.answers[index].id++;
            newQuestion.answers[index + 1].id--;
			const removed = newQuestion.answers.splice(index, 1);
            newQuestion.answers.splice(index + 1, 0, removed[0]);
		} else {
            newQuestion.answers[index].id = 1;
			const removedLast = newQuestion.answers.pop();
            newQuestion.answers.forEach(a => a.id++);
            newQuestion.answers.splice(0, 0, removedLast);
		}

		questionActions.updateQuestion(newQuestion);
	};

    render() {
	    const { onHover } = this.state;
	    const { isEditing, answer, question } = this.props;

	    return (
	        <div className="card-answer">
		        <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
					<p className="card-text card-text-index">{answer.id}</p>
			        {isEditing || question.isNew ?
				        <div className="card-answer-wrapper">
					        <Input
						        size="large"
						        value={answer.text}
					            className="card-edit-answer"
					            onChange={this.handleInputChange}
					        />
					        <div className="modify-button-wrap">
						        <Button icon="delete" className="card-delete-button" onClick={this.deleteCardAnswers}/>
					        </div>
				        </div>
			            :
				        <div className="card-answer-wrapper">
				            <p className="card-text card-text-answer">{answer.text}</p>
				        </div>
			        }
		        </div>
		        {onHover &&  isEditing ?
			        <div>
				        <div className="card-up-down-wrapper">
					        <Button
						        className="card-up-button card-up-button-answers"
						        icon="arrow-up"
						        onClick={this.moveUp}
						        onMouseEnter={this.onMouseEnterHandler}
						        onMouseLeave={this.onMouseLeaveHandler}
					        />
					        <Button
						        className="card-down-button card-down-button-answer"
						        icon="arrow-down"
						        onClick={this.moveDown}
						        onMouseEnter={this.onMouseEnterHandler}
						        onMouseLeave={this.onMouseLeaveHandler}
					        />
				        </div>
				        <Button
					        className="card-add-button card-add-button-answer"
					        icon="plus"
					        onClick={this.addAnswer}
					        onMouseEnter={this.onMouseEnterHandler}
					        onMouseLeave={this.onMouseLeaveHandler}
				        />
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCardAnswers);