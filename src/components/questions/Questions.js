import React, {Component, PropTypes} from 'react';
import { Select, Button, Input } from 'antd';
import QuestionCard from './QuestionCard';
const Option = Select.Option;

class Questions extends Component {
	constructor() {
		super();

		this.state = {
			edit: false,
			deleting: false,
			add: false,
			active: true,
			survey: 'Survey1',
			google: false,
			send: false,
			thankYouToogle: false,
			thankYou: "Thank you",
			thankYouTemporary: "Thank you",
		};
	}

	editSurvey = () => {
		this.setState({ edit: true })
	}

	saveSurvey = () => {
		this.setState({ edit: false })
	}

	cancelEditSurvey = () => {
		this.setState({ edit: false })
	}

	editThankYou = () => {
		const { thankYou } = this.state;
		this.setState({ thankYouToogle: true, thankYouTemporary: thankYou })
	}

	handleThankYouChange = (event) => {
		this.setState({ thankYouTemporary: event.target.value });
	}

	saveThankYou = () => {
		const { thankYouTemporary } = this.state;
		this.setState({ thankYouToogle: false, thankYou: thankYouTemporary })
	}

	cancelEditThankYou = () => {
		this.setState({ thankYouToogle: false })
	}

	deleteSurvey = () => {
		this.setState({ deleting: true })
	}

	confirmDeleteSurvey = () => {
		this.setState({ deleting: false })
	}

	cancelDeleteSurvey = () => {
		this.setState({ deleting: false })
	}

	addSurvey = () => {
		this.setState({ add: true })
	}

	confirmAddSurvey = () => {
		this.setState({ add: false })
	}

	cancelAddSurvey = () => {
		this.setState({ add: false })
	}

	handleActivation = () => {
		const { active } = this.state;
		this.setState({ active: !active })
	}

	handleSurveyChange = (event) => {
		this.setState({ survey: event.target.value })
	}

	exportGoogle = () => {
		this.setState({ google: true })
	}

	confirmExportGoogle = () => {
		this.setState({ google: false })
	}

	cancelExportGoogle = () => {
		this.setState({ google: false })
	}

	sendUnanswered = () => {
		this.setState({ send: true })
	}

	confirmSendUnanswered = () => {
		this.setState({ send: false })
	}

	cancelSendUnanswered = () => {
		this.setState({ send: false })
	}

    render() {
	    const { edit, deleting, add, active, survey, google, send, thankYou, thankYouToogle, thankYouTemporary } = this.state;

	    return (
	    	<div className="questions">
			    <div className="questions-surveys">
				    {add ?
					    <div className="modify-button-wrap">
						    <Button icon="check" className="modify-button" onClick={this.confirmAddSurvey}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelAddSurvey}/>
					    </div>
					    :
					    <div className="modify-button-wrap">
						    <Button
							    icon="plus"
							    className="modify-button"
							    onClick={this.addSurvey}
							    disabled={edit || deleting || google || send || thankYouToogle}
						    />
						    <Button
							    type={active ? 'primary' : 'default'}
							    icon="poweroff"
							    className="modify-button"
							    onClick={this.handleActivation}
							    disabled={edit || deleting || google || send || thankYouToogle}
						    />
					    </div>
				    }
				    {add || edit ?
					    <Input
						    size="large"
						    value={survey}
						    className="questions-input questions-input-survey"
						    onChange={this.handleSurveyChange}
					    />
				        :
					    <Select
						    defaultValue={survey}
						    size="large"
						    className="questions-select"
						    disabled={deleting || google || send || thankYouToogle}
					    >
						    <Option key='1'>{survey}</Option>
						    <Option key='2'>{survey}</Option>
						    <Option key='3'>{survey}</Option>
					    </Select>
				    }
				    {edit ?
					    <div className="modify-button-wrap">
						    <Button icon="check" className="modify-button" onClick={this.saveSurvey}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelEditSurvey}/>
					    </div>
					    : null}
				    {!deleting && !edit ?
					    <div className="modify-button-wrap">
						    <Button
							    icon="edit"
							    className="modify-button"
							    onClick={this.editSurvey}
							    disabled={add || google || send || thankYouToogle}
						    />
						    <Button
							    disabled={add || google || send || thankYouToogle}
							    icon="delete"
							    className="modify-button"
							    onClick={this.deleteSurvey}
						    />
					    </div>
					    : null}
				    {deleting ?
					    <div className="modify-button-wrap">
						    <Button icon="check" className="modify-button" onClick={this.confirmDeleteSurvey}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelDeleteSurvey}/>
					    </div>
					    : null}
				    {thankYouToogle ?
					    <div className="modify-button-wrap modify-button-wrap-thank-you">
						    <Input
							    size="large"
							    value={thankYouTemporary}
							    className="questions-input questions-input-thank-you"
							    onChange={this.handleThankYouChange}
						    />
						    <Button icon="check" className="modify-button" onClick={this.saveThankYou}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelEditThankYou}/>
					    </div>
					    :
					    <div className="modify-button-wrap modify-button-wrap-thank-you">
					        <p className="questions-text questions-text-thank-you">{thankYou}</p>
						    <Button
							    icon="edit"
							    className="modify-button"
							    onClick={this.editThankYou}
							    disabled={add || google || send || edit || deleting}
						    />
					    </div>
				    }
				    {google ?
					    <div className="modify-button-wrap float-right">
						    <Button icon="check" className="modify-button" onClick={this.confirmExportGoogle}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelExportGoogle}/>
					    </div> : null}
				    {!google && !send ?
					    <Button
						    className="modify-button float-right"
						    icon="export"
						    onClick={this.exportGoogle}
						    disabled={add || edit || deleting || send || thankYouToogle}
					    /> : null}
				    {send ?
					    <div className="modify-button-wrap float-right">
						    <Button icon="check" className="modify-button" onClick={this.confirmSendUnanswered}/>
						    <Button icon="close" className="modify-button" onClick={this.cancelSendUnanswered}/>
					    </div> : null}
				    {!google && !send ?
					    <Button
						    className="modify-button float-right"
						    icon="message"
						    onClick={this.sendUnanswered}
						    disabled={add || edit || deleting || google || thankYouToogle}
					    /> : null}
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