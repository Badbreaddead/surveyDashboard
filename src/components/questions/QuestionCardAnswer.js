import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionActions from '../../actions/question';

const Option = Select.Option;

class QuestionCardAnswers extends Component {
	constructor() {
		super();

		this.state = {
			onHover: false,
		};
	}

	handleInputChange = (event) => {
		const { questionActions, answer } = this.props;
		let question = JSON.parse(JSON.stringify(this.props.question));
		let index;

		question.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});
		question.answers[index].text = event.target.value;
		questionActions.updateQuestion(question);
	}

	deleteCardAnswers = () => {
		const { questionActions, answer } = this.props;
		let question = JSON.parse(JSON.stringify(this.props.question));
		let index;

		question.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});
		question.answers.splice(index, 1);

		let answersLeft = question.answers.slice(0, index);
		let answersRight = question.answers.slice(index);
		answersRight.forEach(a => a.id--);
		question.answers = answersLeft.concat(answersRight);

		questionActions.saveQuestion(question);
	}

	onMouseEnterHandler = () => {
		this.setState({ onHover: true })
	}

	onMouseLeaveHandler = () => {
		this.setState({ onHover: false })
	}

	addAnswer = () => {
		const { questionActions, answer } = this.props;
		let question = JSON.parse(JSON.stringify(this.props.question));
		let index;

		question.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

		const answersRight = question.answers.splice(index);
		answersRight.forEach(a => a.id++);
		question.answers.push({ id: index + 1, text: 'Default answer' })
		question.answers.push(answersRight);

		questionActions.saveQuestion(question);
	}

	moveUp = () => {
		const { questionActions, answer } = this.props;
		let question = JSON.parse(JSON.stringify(this.props.question));
		let index;

		question.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

		if (index !== 0) {
			question.answers[index].id--;
			question.answers[index - 1].id++;
			const removed = question.answers.splice(index, 1);
			question.answers.splice(index - 1, 0, removed[0]);
		} else {
			question.answers[index].id = question.answers.length;
			const removedFirst = question.answers.splice(index, 1);
			question.answers.forEach(a => a.id--);
			question.answers.push(removedFirst[0]);
		}
		debugger

		questionActions.saveQuestion(question);
	}

	moveDown = () => {
		const { questionActions, answer } = this.props;
		let question = JSON.parse(JSON.stringify(this.props.question));
		let index;

		question.answers.forEach((a, i) => {
			if (a.id === answer.id) {
				index = i;
			}
		});

		if (index !== question.answers.length - 1) {
			question.answers[index].id++;
			question.answers[index + 1].id--;
			const removed = question.answers.splice(index, 1);
			question.answers.splice(index + 1, 0, removed[0]);
		} else {
			question.answers[index].id = 1;
			const removedLast = question.answers.pop();
			question.answers.forEach(a => a.id++);
			question.answers.splice(0, 0, removedLast[0]);
		}
		debugger

		questionActions.saveQuestion(question);
	}

    render() {
	    const { onHover } = this.state;
	    const { isEditing, answer } = this.props;

	    return (
	        <div className="card-answer">
		        <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
					<p className="card-text">{answer.id}</p>
			        {isEditing ?
				        <Input
					        size="large"
					        defaultValue={answer.text}
				            className="card-edit-answer"
				            onChange={this.handleInputChange}
				        />
			            :
				        <p className="card-text card-text-answer">{answer.text}</p>
			        }
			        <div className="modify-button-wrap">
				        <Button icon="delete" className="card-delete-button" onClick={this.deleteCardAnswers}/>
			        </div>
		        </div>
		        {onHover ?
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