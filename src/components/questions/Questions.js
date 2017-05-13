import React, {Component, PropTypes} from 'react';
import { Select, Button } from 'antd';
import QuestionCard from './QuestionCard';
const Option = Select.Option;

class Questions extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			deleting: false,
		};
	}

    render() {
	    const { edit, deleting } = this.state;

	    return (
	    	<div className="questions">
			    <div className="questions-surveys">
				    <Select defaultValue="Survey1" size="large" className="questions-select">
					    <Option value="Survey1">Survey1</Option>
					    <Option value="Survey2">Survey2</Option>
					    <Option value="Survey3">Survey3</Option>
				    </Select>
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
		        <div className="questions-wrapper">
					<QuestionCard number="1"/>
					<QuestionCard number="2"/>
					<QuestionCard number="3"/>
		        </div>
		    </div>
        );
    }
}

export default Questions;