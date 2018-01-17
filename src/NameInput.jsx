import { Form, Icon, Input, Button, Table } from 'antd';
import React from 'react';
import axios from 'axios';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NameINput extends React.Component {
    state = {
        data: [],
        // editStatus:true,
        // editId:'',
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        this.getAlldata();
    }
    getAlldata = () => {
        axios.get('/getAlldata')
            .then((e) => {
                console.log(e.data.data);
                this.setState({
                    data: e.data.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteOnedata = (id) => {
        axios.post('/deleteOnedata', {
            id: id
        }).then((response) => {
            console.log(response);
            this.getAlldata();
        }).catch((error) => {
            console.log(error);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('/adddata', {
                    userName: values.userName,
                    sex: values.sex,
                    age: values.age,
                })
                    .then((response) => {
                        this.props.form.resetFields();
                        this.getAlldata();
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }

    updateOnedata=(id)=>{
        // this.setState({
        //     editStatus:true,
        //     editId:id,
        // })
    }

    render() {
        const { data } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const columns = [{
            title: 'userName',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: 'sex',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                console.log(record)
                return (
                    <div>
                        <a href="#" onClick={() => { this.deleteOnedata(record._id) }}>删除</a>
                        <a href="#" onClick={() => { this.updateOnedata(record._id) }}>编辑</a>
                    </div>
                )
            },
        }];
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const sexError = isFieldTouched('sex') && getFieldError('sex');
        const ageError = isFieldTouched('age') && getFieldError('age');
        return (
            <div>
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
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        );
    }
}


export default Form.create()(NameINput);
