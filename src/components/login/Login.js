import React, {Component, PropTypes} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
        debugger
        const { getFieldDecorator } = this.props.form;
        return (
	        <div>
		        <h1>Survey dashboard</h1>
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
				        {getFieldDecorator('remember', {
					        valuePropName: 'checked',
					        initialValue: true,
				        })(
					        <Checkbox>Remember me</Checkbox>
				        )}
				        <Button type="primary" htmlType="submit" className="login-form-button">
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