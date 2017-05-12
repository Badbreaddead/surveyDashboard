import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
const Option = Select.Option;
import QuestionCardAnswers from './QuestionCardAnswers';

class QuestionCard extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			question: 'How are you?',
			questionTemporary: 'How are you?',
			questionTypeTemporary: 'Options',
			questionType: 'Options',
			expand: false,
			expandActive: true,
		};
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.expandCard = this.expandCard.bind(this);
		this.editCard = this.editCard.bind(this);
		this.saveCard = this.saveCard.bind(this);
		this.cancelEditCard = this.cancelEditCard.bind(this);
	}

	expandCard() {
		const { expand, expandActive } = this.state;
		if (expandActive) {
			this.setState({ expand: !expand })
		}
	}

	handleSelectChange(value) {
		this.setState({ questionTypeTemporary: value });
	}

	handleInputChange(event) {
		this.setState({ questionTemporary: event.target.value });
	}

	editCard() {
		const { edit, question, questionType } = this.state;
		this.setState({ edit: !edit, questionTemporary: question, questionTypeTemporary: questionType, expandActive: false })
	}

	saveCard() {
		const { questionTemporary, questionTypeTemporary, expand } = this.state;
		this.setState({ question: questionTemporary, questionType: questionTypeTemporary, edit: false, expandActive: true, expand: !expand })
	}

	cancelEditCard() {
		const { expand, edit } = this.state;
		this.setState({ edit: !edit, expand: !expand, expandActive: true })
	}

    render() {
	    const { edit, question, questionType, questionTemporary, expand } = this.state;
	    return (
	        <div className="card card-wrapper">
		        <div className="card-question-wrapper" onClick={this.expandCard}>
					<p className="card-text">1</p>
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
			        :
				        <Button icon="edit" onClick={this.editCard}/>}
		        </div>
		        {expand && (questionType === "Options" || questionType === "Own answer and options") && !edit ?
			        <div className="answers-wrapper">
						<QuestionCardAnswers />
						<QuestionCardAnswers />
					</div>
		        : null}
	        </div>
        );
    }
}

export default QuestionCard;