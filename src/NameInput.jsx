import { Form, Icon, Input, Button, Table } from 'antd';
import React from 'react';
import axios from 'axios';
import _ from 'lodash';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NameINput extends React.Component {
    state = {
        data: [],
        editStatus: true,
        editId: '',
        editOneData: {
            'userName': '',
            'sex': '',
            'age': ''
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        this.getAlldata();
    }
    getAlldata = () => {
        axios.get('/getAlldata')
            .then((e) => {

                const data = e.data.data.map((item) => {
                    const temp = { ...item }
                    temp.key = temp._id
                    return temp
                })
                this.setState({
                    data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteOnedata = (_id) => {
        axios.post('/deleteOnedata', {
            _id,
        }).then((response) => {
            this.getAlldata();
        }).catch((error) => {
            console.log(error);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/adddata', {
                    userName: values.userName,
                    sex: values.sex,
                    age: values.age,
                })
                    .then((response) => {
                        this.props.form.resetFields();
                        this.getAlldata();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }

    updateOnedata = (id) => {
        const { data } = this.state;
        const editOneData = _.cloneDeep(data.filter((item) => {
            return item._id === id
        })[0])
        this.setState({
            editStatus: true,
            editId: id,
            editOneData,
        })
    }


    editSubmit = (id) => {
        const { editOneData } = this.state;
        axios.post('/updateOnedata',
            editOneData)
            .then((response) => {
                this.props.form.resetFields();
                this.getAlldata();
                this.setState({
                    editStatus: false,
                    editId: '',
                    editOneData: {
                        'userName': '',
                        'sex': '',
                        'age': ''
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    editCancle = (id) => {
        this.setState({
            editStatus: false,
            editId: '',
            editOneData: {
                'userName': '',
                'sex': '',
                'age': ''
            }
        })
    }

    editChange = (key, value) => {
        const { data, editStatus, editId } = this.state;
        const editOneData = _.cloneDeep(data.filter((item) => {
            return item._id === editId
        })[0])
        editOneData[key] = value;
        this.setState({
            editOneData,
        })
    }

    render() {
        const { data, editStatus, editId, editOneData } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const columns = [{
            title: 'userName',
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record) => {
                if (record._id === editId) {
                    return <Input
                        onChange={(e) => { this.editChange('userName', e.target.value) }}
                        value={editOneData.userName}
                    />
                }
                return text
            }
        }, {
            title: 'sex',
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => {
                if (record._id === editId) {
                    return <Input
                        onChange={(e) => { this.editChange('sex', e.target.value) }}
                        value={editOneData.sex}
                    />
                }
                return text
            }
        }, {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => {
                if (record._id === editId) {
                    return <Input
                        onChange={(e) => { this.editChange('age', e.target.value) }}
                        value={editOneData.age}
                    />
                }
                return text
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                if (record._id === editId) {
                    return (
                        <div>
                            <a href="#" onClick={() => { this.editSubmit(record._id) }}>确定</a>
                            <a href="#" onClick={() => { this.editCancle(record._id) }}>取消</a>
                        </div>
                    )
                }
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
                <div>啦啦啦</div>
            </div>
        );
    }
}


export default Form.create()(NameINput);
