import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
const Option = Select.Option;

class QuestionCardAnswers extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			answer: 'Option1',
			answerTemporary: 'Option1',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.editCardAnswers = this.editCardAnswers.bind(this);
		this.saveCardAnswers = this.saveCardAnswers.bind(this);
	}

	handleInputChange(event) {
		this.setState({ answerTemporary: event.target.value });
	}

	editCardAnswers() {
		const { edit, answer } = this.state;
		this.setState({ edit: !edit, answerTemporary: answer })
	}

	saveCardAnswers() {
		const { answerTemporary } = this.state;
		this.setState({ answer: answerTemporary, edit: false })
	}

    render() {
	    const { edit, answer, answerTemporary } = this.state;
	    return (
	        <div className="card-answer">
				<p className="card-text">1</p>
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
				        <Button icon="close" className="card-edit-button" onClick={this.editCardAnswers}/>
			        </div>
		        :
			        <Button icon="edit" onClick={this.editCardAnswers}/>}
	        </div>
        );
    }
}

export default QuestionCardAnswers;