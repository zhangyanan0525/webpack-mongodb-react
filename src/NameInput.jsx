import { Form, Icon, Input, Button } from 'antd';
import React from 'react';
import axios from 'axios';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NameINput extends React.Component {

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.get('/getAlldata')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const sexError = isFieldTouched('sex') && getFieldError('sex');
        const ageError = isFieldTouched('age') && getFieldError('age');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="Username" />
                        )}
                </FormItem>
                <FormItem
                    validateStatus={sexError ? 'error' : ''}
                    help={sexError || ''}
                >
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: 'Please input your sex!' }],
                    })(
                        <Input placeholder="sex" />
                        )}
                </FormItem>
                <FormItem
                    validateStatus={ageError ? 'error' : ''}
                    help={ageError || ''}
                >
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: 'Please input your age!' }],
                    })(
                        <Input placeholder="age" />
                        )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
          </Button>
                </FormItem>
            </Form>
        );
    }
}


export default Form.create()(NameINput);
