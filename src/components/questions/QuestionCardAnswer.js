import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';

const Option = Select.Option;

class QuestionCardAnswers extends Component {
	constructor() {
		super();

		this.state = {
			onHover: false,
			answer: 'Option1',
			answerTemporary: 'Option1',
			expandActive: true,
		};
	}

	componentWillMount() {
		this.setState({ answer: this.props.answer })
	}

	handleInputChange = (event) => {
		this.setState({ answerTemporary: event.target.value });
	}

	editCardAnswers = () => {
		const { answer } = this.state;

		this.setState({ isEditing: true, answerTemporary: answer, expandActive: false, onHover: false })
	}

	saveCardAnswers = () =>     {
		const { answerTemporary, expand } = this.state;

		this.setState({ answer: answerTemporary, isEditing: false, expandActive: true, isExpanded: !expand, onHover: true })
	}

	cancelEditCardAnswers = () => {
		const { expand, isEditing } = this.state;

		this.setState({ isEditing: !isEditing, isExpanded: !expand, expandActive: true, onHover: true })
	}

	deleteCardAnswers = () => {
		this.setState({ isDeleting: true, expandActive: false, onHover: false })
	}

	onMouseEnterHandler = () => {
		this.setState({ onHover: true })
	}

	onMouseLeaveHandler = () => {
		this.setState({ onHover: false })
	}

	addAnswer = () => {
		console.log('addAnswer');
	}

	moveUp = () => {
		console.log('moveUpAnswer');
	}

	moveDown = () => {
		console.log('moveDownAnswer');
	}

    render() {
	    const { onHover } = this.state;
	    const { isEditing, text } = this.props;

	    return (
	        <div className="card-answer">
		        <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
					<p className="card-text">1</p>
			        {isEditing ?
				        <Input
					        size="large"
					        value={text}
				            className="card-edit-answer"
				            onChange={this.handleInputChange}
				        />
			            :
				        <p className="card-text card-text-answer">{text}</p>
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

export default QuestionCardAnswers;