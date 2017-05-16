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
	
	//TODO
	handleSelectChange = (value) => {
        const { questionActions, question } = this.props;
        const newQuestion = Object.assign({}, question);
        
        newQuestion.type = value;
        questionActions.updateQuestion(newQuestion);
	};
    
    handleSelectFocus = (event) => {
        event.stopPropagation();
    };
	
	handleInputChange = (event) => {
		const { questionActions, question } = this.props;
		const newQuestion = Object.assign({}, question);
        
        newQuestion.question = event.target.value;
		questionActions.updateQuestion(newQuestion);
	};
    
    handleInputFocus = (event) => {
        event.stopPropagation();
    };
    
	editCard = (event) => {
		this.setState({ isEditing: true, onHover: false, isExpanded: true });
		event.stopPropagation();
	};

	saveCard = (event) => {
		const { question, questionActions } = this.props;

		if (question.answers.some(a => a.text === '') || question.question === '') {
            openNotification('error', 'All fields should be filled')
		} else {
            questionActions.addQuestion(question, () => {this.setState({ isEditing: false, onHover: true })});
        }
		event.stopPropagation();
	};

	cancelEditCard = () => {
		const { question, questionActions } = this.props;
		this.setState({ isEditing: false, onHover: true });

		questionActions.cancelUpdateQuestion(question);
	};

	handleDeleteCard = (event) => {
		event.stopPropagation();
	};

	deleteCard = (event) => {
		const { question, questionActions } = this.props;

		questionActions.deleteQuestion({ id: question.id });
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
        addQuestionForm(question.index + 1);
	};

	moveUp = () => {
        const { question, questionActions, order } = this.props;
		const newOrder = [...order];
        
		if (order.find(item => item.id === question.id).index = 1) {
            newOrder.forEach(item => item.index++);
            newOrder.find(item => item.id === question.id).index = order.length;
		} else {
            const index = order.find(item => item.id === question.id).index;
            newOrder.find(item => item.index === index - 1).index++;
            newOrder.find(item => item.id === question.id).index--;
		}
		
        questionActions.changeOrder(newOrder);
	};

	moveDown = () => {
        const { question, questionActions, order } = this.props;
        const newOrder = [...order];
        
        if (order.find(item => item.id === question.id).index = order.length) {
            newOrder.forEach(item => item.index--);
            newOrder.find(item => item.id === question.id).index = 1;
        } else {
            const index = order.find(item => item.id === question.id).index;
            newOrder.find(item => item.index === index - 1).index--;
            newOrder.find(item => item.id === question.id).index++;
        }
        
        
        
        questionActions.changeOrder(newOrder);
	};

    render() {
	    const { isEditing, isExpanded, onHover } = this.state;
	    const { question, isAdding } = this.props;
		
	    return (
	        <div className="card card-wrapper">
		        {!isAdding ?
		        <div className="card-question-wrapper"
		             onClick={this.expandCard}
		             onMouseEnter={this.onMouseEnterHandler}
		             onMouseLeave={this.onMouseLeaveHandler}
		        >
			        <p className="card-text">{question.item}</p>
			        {isEditing || question.isNew ?
				        <div className="card-edit-wrapper">
					        <Input
						        size="large"
						        value={question.question}
						        className="card-edit-question"
						        onChange={this.handleInputChange}
								onFocus={this.handleInputFocus}
					        />
							<Select
								size="large"
								defaultValue={question.type}
								onChange={this.handleSelectChange}
								className="card-edit-questionType"
								onFocus={this.handleSelectFocus}
							>
								<Option value="own">Own answer</Option>
								<Option value="options">Options</Option>
								<Option value="ownAndOptions">Own answer and options</Option>
							</Select>
							{/*<p className="card-text card-text-questionType">{question.type}</p>*/}
							<Button icon="check" className="card-edit-button" onClick={this.saveCard}/>
							<Button icon="close" className="card-edit-button" onClick={this.cancelEditCard}/>
				        </div>
			            :
				        <div className="card-edit-wrapper">
				            <p className="card-text card-text-question">{question.question}</p>
							<p className="card-text card-text-questionType">{question.type}</p>

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
		        </div> : null}
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
		        {isExpanded ?
			        <div className="answers-wrapper">
				        {question.answers.map((answer, i) => (
							<QuestionCardAnswer
								key={question.id + i}
								question={question}
								answer={answer}
								isEditing
							/>
						))}
					</div>
		            : null}
	        </div>
        );
    }
}

const mapStateToProps = (state) => ({
	// initQuestions: state.question.initQuestions,
	order: state.question.order,
});

const mapDispatchToProps = (dispatch) => ({
	questionActions: bindActionCreators(new QuestionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);