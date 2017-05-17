import React, {Component, PropTypes} from 'react';
import { Input, Select, Button } from 'antd';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import QuestionActions from '../../actions/question';

const Option = Select.Option;

class QuestionCardAnswers extends Component {

	handleInputChange = (event) => {
		const { questionActions, question } = this.props;
		let newQuestion = Object.assign({}, question);

        newQuestion.ownAnswer.text = event.target.value;
	
		questionActions.updateQuestion(newQuestion);
	};

    render() {
	    const { isEditing, answer, question } = this.props;

	    return (
	        <div className="card-answer">
		        <div>
					<p className="card-text card-text-own">Own</p>
			        {isEditing || question.isNew ?
				        <div className="card-answer-wrapper">
					        <Input
						        size="large"
						        value={answer.text}
					            className="card-edit-answer-own"
					            onChange={this.handleInputChange}
					        />
				        </div>
			            :
				        <div className="card-answer-wrapper card-answer-wrapper-own">
				            <p className="card-text card-text-answer card-text-answer-own">{answer.text}</p>
				        </div>
			        }
		        </div>
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