import React, {Component, PropTypes} from 'react';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

class Questions extends Component {

    render() {
	    const text = `
		  A dog is a type of domesticated animal.
		  Known for its loyalty and faithfulness,
		  it can be found as a welcome guest in many households across the world.
		`;

	    const customPanelStyle = {
		    background: '#f7f7f7',
		    borderRadius: 4,
		    marginBottom: 24,
		    border: 0,
	    };

	    function callback(key) {
		    console.log(key);
	    }

	    return (
	        <Collapse defaultActiveKey={['1']} onChange={callback}>
		        <Panel header="This is panel header 1" key="1">
			        <p>{text}</p>
		        </Panel>
		        <Panel header="This is panel header 2" key="2">
			        <p>{text}</p>
		        </Panel>
		        <Panel header="This is panel header 3" key="3">
			        <p>{text}</p>
		        </Panel>
	        </Collapse>
        );
    }
}

export default Questions;