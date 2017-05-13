import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
	        <div className="login">
		        <h1 className="login-title">Survey dashboard</h1>
		        <Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
				        {getFieldDecorator('userName', {
					        rules: [{ required: true, message: 'Please input your username!' }],
				        })(
					        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
				        )}
			        </FormItem>
			        <FormItem>
				        {getFieldDecorator('password', {
					        rules: [{ required: true, message: 'Please input your Password!' }],
				        })(
					        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
				        )}
			        </FormItem>
			        <FormItem>
				        <Button htmlType="submit" className="login-form-button" onClick={() => browserHistory.push('/')}>
					        Log in
				        </Button>
			        </FormItem>
		        </Form>
	        </div>
        );
    }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;