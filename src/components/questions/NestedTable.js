import React, {Component, PropTypes} from 'react';
import { Table, Popconfirm, Button } from 'antd';
import EditableCell from './Cell';

export default class NestedTable extends React.Component {

	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'Answer options',
				dataIndex: 'answer',
				key: 'answer',
				width: '80%',
				render: (text, record, index) => this.renderColumns(this.state.data, index, 'answer', text),
			},
			{
				title: 'Operations',
				dataIndex: 'operations',
				render: (text, record, index) => {
					const { editable } = this.state.data[index].answer;
					return (
						<div className="editable-row-operations">
							{
								editable ?
									<span>
	                                    <a onClick={() => this.editDone(index, 'save')}>Save</a>
		                                <Popconfirm
			                                title="Sure to cancel?"
			                                onConfirm={() => this.editDone(index, 'cancel')}
			                                okText="OK"
			                                cancelText="NO"
		                                >
		                                    <a>Cancel</a>
		                                </Popconfirm>
                                     </span>
									:
									<span>
										<a onClick={() => this.edit(index)}>Edit</a>
                                    </span>
							}
						</div>
					);
				},
			},
		];
		this.state = {
			data: [{
				key: 1,
				answer: {
					editable: false,
					value: 'good',
				},
			},{
				key: 2,
				answer: {
					editable: false,
					value: 'so so',
				},
			},{
				key: 3,
				answer: {
					editable: false,
					value: 'bad',
				},
			}],
		};
	}

	renderColumns(data, index, key, text) {
		const { editable, status } = data[index][key];
		if (typeof editable === 'undefined') {
			return text;
		}
		return (<EditableCell
			editable={editable}
			value={text}
			onChange={value => this.handleChange(key, index, value)}
			status={status}
		/>);
	}

	handleChange(key, index, value) {
		const { data } = this.state;
		data[index][key].value = value;
		this.setState({ data });
	}

	edit(index) {
		const { data } = this.state;
		Object.keys(data[index]).forEach((item) => {
			if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
				data[index][item].editable = true;
			}
		});
		this.setState({ data });
	}

	editDone(index, type) {
		const { data } = this.state;
		Object.keys(data[index]).forEach((item) => {
			if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
				data[index][item].editable = false;
				data[index][item].status = type;
			}
		});
		this.setState({ data }, () => {
			Object.keys(data[index]).forEach((item) => {
				if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
					delete data[index][item].status;
				}
			});
		});
	}

	render() {
		const { data } = this.state;
		const dataSource = data.map((item) => {
			const obj = {};
			Object.keys(item).forEach((key) => {
				obj[key] = key === 'key' ? item[key] : item[key].value;
			});
			return obj;
		});
		const columns = this.columns;
		return <Table
			className="components-table-demo-nested"
			bordered
			dataSource={dataSource}
			columns={columns}
			pagination={false}
		/>;
	}
}