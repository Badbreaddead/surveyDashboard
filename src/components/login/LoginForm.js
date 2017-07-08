import React, {Component, PropTypes} from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
	        this.props.login(values);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
	        <Form onSubmit={this.handleSubmit} className="login-form">
		        <FormItem>
			        {getFieldDecorator('email', {
				        rules: [{ required: true, message: 'Please input your email!' }],
			        })(
				        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
			        )}
		        </FormItem>
		        <FormItem>
			        {getFieldDecorator('password', {
				        rules: [{ required: true, message: 'Please input your password!' }],
			        })(
				        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
			        )}
		        </FormItem>
		        <FormItem>
			        <Button htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
				        Log in
			        </Button>
		        </FormItem>
	        </Form>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;

