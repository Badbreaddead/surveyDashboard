import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
const Option = Select.Option;

class QuestionCardAnswers extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			active: false,
			answer: 'Option1',
			answerTemporary: 'Option1',
			expand: false,
			expandActive: true,
			deleting: false,
		};
	}

	handleInputChange = (event) => {
		this.setState({ answerTemporary: event.target.value });
	}

	editCardAnswers = () => {
		const { answer } = this.state;
		this.setState({ edit: true, answerTemporary: answer, expandActive: false, active: false })
	}

	saveCardAnswers = () =>     {
		const { answerTemporary, expand } = this.state;
		this.setState({ answer: answerTemporary, edit: false, expandActive: true, expand: !expand, active: true })
	}

	cancelEditCardAnswers = () => {
		const { expand, edit } = this.state;
		this.setState({ edit: !edit, expand: !expand, expandActive: true, active: true })
	}

	deleteCardAnswers = () => {
		this.setState({ deleting: true, expandActive: false, active: false })
	}

	confirmDeleteCardAnswers = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand, expandActive: true, deleting: false, active: true })
	}

	cancelDeleteCardAnswers = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand, expandActive: true, deleting: false, active: true })
	}

	onMouseEnterHandler = () => {
		this.setState({ active: true })
	}

	onMouseLeaveHandler = () => {
		this.setState({ active: false })
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
	    const { edit, answer, answerTemporary, expand, active, deleting } = this.state;
	    return (
	        <div className="card-answer">
		        <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
					<p className="card-text">{this.props.number}</p>
			        {edit ?
				        <Input
					        size="large"
					        value={answerTemporary}
				            className="card-edit-answer"
				            onChange={this.handleInputChange}
				        />
			        :
				        <p className="card-text card-text-question">{answer}</p>}
			        {edit ?
				        <div className="card-edit-button-wrap">
					        <Button icon="check" className="card-edit-button" onClick={this.saveCardAnswers}/>
					        <Button icon="close" className="card-edit-button" onClick={this.cancelEditCardAnswers}/>
				        </div>
				        : null}
			        {!deleting && !edit ?
				        <Button icon="edit" className="card-edit-button" onClick={this.editCardAnswers}/>
				        : null}
			        {deleting ?
				        <div className="card-delete-button-wrap">
					        <Button icon="check" className="card-delete-button" onClick={this.confirmDeleteCardAnswers}/>
					        <Button icon="close" className="card-delete-button" onClick={this.cancelDeleteCardAnswers}/>
				        </div>
				        : null}
			        {!edit && !deleting ? <Button icon="delete" className="card-delete-button" onClick={this.deleteCardAnswers}/> : null}
		        </div>
		        {active ?
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