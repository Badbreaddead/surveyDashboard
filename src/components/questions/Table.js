import React, {Component, PropTypes} from 'react';
import { Table, Popconfirm, Button } from 'antd';
import EditableCell from './Cell';
import NestedTable from './NestedTable';

export default class EditableTable extends React.Component {

	constructor(props) {
		super(props);
		this.columns = [{
			title: 'ID',
			dataIndex: 'id',
			width: '10%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'id', text),
		}, {
			title: 'Question',
			dataIndex: 'question',
			width: '35%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'question', text),
		}, {
			title: 'Question type',
			dataIndex: 'questionType',
			width: '12%',
			render: (text, record, index) => this.renderColumns(this.state.data, index, 'questionType', text),
		}, {
			title: 'Operations',
			dataIndex: 'operations',
			render: (text, record, index) => {
				const { editable } = this.state.data[index].question;
				const { data } = this.state;
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
						{
						data.length > 1 ?
							<Popconfirm
								title="Sure to delete?"
								onConfirm={() => this.onDelete(index)}
								okText="OK"
								cancelText="NO"
							>
								<a href="#">Delete</a>
							</Popconfirm>
						:
							null
						}
						<Button className="editable-add-btn" onClick={() => this.handleAdd(index)}>Add</Button>
					</div>
				);
			},
		}];
		this.state = {
			data: [{
				key: '0',
				id: {
					value: '123321123',
				},
				question: {
					editable: false,
					value: 'How are you?1',
				},
				questionType: {
					editable: false,
					value: 'Own answer and options',
				},
			}, {
				key: '1',
				id: {
					value: '123321123',
				},
				question: {
					editable: false,
					value: 'How are you?2',
				},
				questionType: {
					editable: false,
					value: 'Own answer and options',
				},
			}, {
				key: '2',
				id: {
					value: '123321123',
				},
				question: {
					editable: false,
					value: 'How are you?3',
				},
				questionType: {
					editable: false,
					value: 'Own answer and options',
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

	onDelete = (index) => {
		const data = [...this.state.data];
		data.splice(index, 1);
		this.setState({ data });
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

	handleAdd(index) {
		const { data } = this.state;
		const dataCopyLeft = JSON.parse(JSON.stringify(data)).slice(0, index + 1);
		const dataCopyRight = JSON.parse(JSON.stringify(data)).slice(index + 1);
		const addingElem = {
			key: (index + 1).toString(),
			id: {
				value: '123321123',
			},
			question: {
				editable: true,
				value: 'How are you?new',
			},
			questionType: {
				editable: true,
				value: 'Own answer and options',
			},
		};
		dataCopyLeft.push(addingElem);
		dataCopyRight.map(elem => elem.key = (parseInt(elem.key) + 1).toString());
		const newData = dataCopyLeft.concat(dataCopyRight);
		this.setState({
			data: newData,
		});
	}

	expandedRowRender() {
		return (
			<NestedTable />
		);
	};

	render() {
		const { data } = this.state;
		const dataSource = data.map((item) => {
			const obj = {};
			Object.keys(item).forEach((key) => {
				obj[key] = key === 'key' ? item[key] : item[key].value;
			});
			return obj;
		});
		debugger
		const columns = this.columns;
		return <Table
			expandedRowRender={this.expandedRowRender}
			bordered
			dataSource={dataSource}
			columns={columns}
		/>;
	}
}