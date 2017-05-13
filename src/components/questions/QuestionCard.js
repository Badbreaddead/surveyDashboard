import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
const Option = Select.Option;
import QuestionCardAnswers from './QuestionCardAnswers';

class QuestionCard extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			active: false,
			question: 'How are you?',
			questionTemporary: 'How are you?',
			questionTypeTemporary: 'Options',
			questionType: 'Options',
			expand: false,
			expandActive: true,
			deleting: false,
		};
	}

	expandCard = () => {
		const { expand, expandActive } = this.state;
		if (expandActive) {
			this.setState({ expand: !expand })
		}
	}

	handleSelectChange = (value) => {
		this.setState({ questionTypeTemporary: value });
	}

	handleInputChange = (event) => {
		this.setState({ questionTemporary: event.target.value });
	}

	editCard = () => {
		const { question, questionType } = this.state;
		this.setState({ edit: true, questionTemporary: question, questionTypeTemporary: questionType, expandActive: false, active: false })
	}

	saveCard = () => {
		const { questionTemporary, questionTypeTemporary, expand } = this.state;
		this.setState({ question: questionTemporary, questionType: questionTypeTemporary, edit: false, expandActive: true, expand: !expand, active: true })
	}

	cancelEditCard = () => {
		const { expand, edit } = this.state;
		this.setState({ edit: !edit, expand: !expand, expandActive: true, active: true })
	}

	deleteCard = () => {
		this.setState({ deleting: true, expandActive: false, active: false })
	}

	confirmDeleteCard = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand, expandActive: true, deleting: false, active: true })
	}

	cancelDeleteCard = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand, expandActive: true, deleting: false, active: true })
	}

	onMouseEnterHandler = () => {
		this.setState({ active: true })
	}

	onMouseLeaveHandler = () => {
		this.setState({ active: false })
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
	    const { edit, question, questionType, questionTemporary, expand, active, deleting } = this.state;
	    return (
	        <div className="card card-wrapper">
		        <div className="card-question-wrapper"
		             onClick={this.expandCard}
		             onMouseEnter={this.onMouseEnterHandler}
		             onMouseLeave={this.onMouseLeaveHandler}
		        >
					<p className="card-text">{this.props.number}</p>
			        {edit ?
				        <Input
					        size="large"
					        value={questionTemporary}
				            className="card-edit-question"
				            onChange={this.handleInputChange}
				        />
			            :
				        <p className="card-text card-text-question">{question}</p>}
			        {edit ?
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
			            <p className="card-text card-text-questionType">{questionType}</p>}
			        {edit ?
				        <div className="card-edit-button-wrap">
					        <Button icon="check" className="card-edit-button" onClick={this.saveCard}/>
					        <Button icon="close" className="card-edit-button" onClick={this.cancelEditCard}/>
				        </div>
			        : null}
			        {!deleting && !edit ?
				        <Button icon="edit" className="card-edit-button" onClick={this.editCard}/>
			            : null}
			        {deleting ?
				        <div className="card-delete-button-wrap">
					        <Button icon="check" className="card-delete-button" onClick={this.confirmDeleteCard}/>
					        <Button icon="close" className="card-delete-button" onClick={this.cancelDeleteCard}/>
				        </div>
				        : null}
			        {!edit && !deleting ? <Button icon="delete" className="card-delete-button" onClick={this.deleteCard}/> : null}
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
					        onClick={this.addCard}
					        onMouseEnter={this.onMouseEnterHandler}
					        onMouseLeave={this.onMouseLeaveHandler}
				        />
			        </div>
		            : null}
		        {expand && (questionType === "Options" || questionType === "Own answer and options") && !edit && !deleting ?
			        <div className="answers-wrapper">
						<QuestionCardAnswers number="1"/>
						<QuestionCardAnswers number="2"/>
						<QuestionCardAnswers number="3"/>
					</div>
		            : null}
	        </div>
        );
    }
}

export default QuestionCard;