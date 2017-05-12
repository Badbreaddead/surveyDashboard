import React, {Component, PropTypes} from 'react';
import { Collapse } from 'antd';
import QuestionCard from './QuestionCard';

class Questions extends Component {

    render() {

	    return (
	        <div className="questions-wrapper">
				<QuestionCard />
				<QuestionCard />
				<QuestionCard />
	        </div>
        );
    }
}

export default Questions;