import React, {Component, PropTypes} from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
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
		        {isEditing || question.isNew ?
			        <div className="card-answer-wrapper">
				        <Col xs={{ span: 3 }} sm={{ span: 2 }}>
					        <p className="card-text  card-text-index">Own</p>
				        </Col>
				        <Col xs={{ span: 14 }} sm={{ span: 14 }}>
					        <Input
						        size="large"
						        value={answer.text}
					            className="card-edit-answer"
					            onChange={this.handleInputChange}
					        />
				        </Col>
			        </div>
		            :
			        <div className="card-answer-wrapper card-answer-wrapper-own">
				        <Col xs={{ span: 3 }} sm={{ span: 2 }}>
					        <p className="card-text  card-text-index">Own</p>
				        </Col>
				        <Col xs={{ span: 14 }} sm={{ span: 14 }}>
			                <p className="card-text card-text-answer card-text-answer-own">{answer.text}</p>
				        </Col>
			        </div>
		        }
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