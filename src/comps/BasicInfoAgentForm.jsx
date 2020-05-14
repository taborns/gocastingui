import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';

let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalBasicInfoAgent extends React.Component {
   
    constructor(props) {
    
        super(props)
    
        this.state = {
            error : '',
            loading : false,
            registered : false,
            picture_error : false,
            picture : null

        }

        this.basic_info_attrs = [
            'username', 
            'password',
            'first_name',
            'last_name',
            'email'
        ]
    }
        
    handleSubmit = e => {

        this.setState({loading : true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        console.log("error-values", values)
        values['profile_picture'] = this.getUpload( values['profile_picture'] )
        values['birth_date'] = values['birth_date'].format("YYYY-MM-DD")

        values = this.composeRegisterData( values )
        if (!err) {
            Api.updateData(`cast.update`, values)
            .then( (response)=>{ 
                this.setState({registered : true, loading : true,  err : null })
                scroll.scrollToTop()
                this.props.getLoggedInUser()
            } , (respo) => this.setState({ error : respo, loading : false, registered : false }) )

        }
        });
    };

    composeRegisterData = values => {
        let user = {}
        
        for(let param in values) {
        
            if ( this.basic_info_attrs.indexOf(param) >= 0)
                user[param] = values[param]
        
        }

        user['cast'] = values
        return user 
    }

    getUpload = info=> {     
        if (!info)
            return null 
        else if (!info.file)
            return info

        else if ( info.file.status == "error") 
            this.setState({picture_error : true})
        else 
            this.setState({picture_error  : false})
        
        if (info.file.status == "done")
            return info.file.response.pictureName
        return this.state.picture;
    }

    handleUpload = info => {

        if (info.file.status == "done")
            this.setState({ picture : info.file.response.pictureName})

    }

    onRemove = info=> {
        console.log("INFOREMOVE", info)
    }

    componentDidMount(){
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
        <Row >
            
            <Col>

                <div className='casting-login-wrapper'>


                    <div className='login-area'>
                    
                        <div className='label h3'>Account Information <Icon className='casting-icon' type="save" /> </div>
                        
                        { this.state.registered && <div>
                            <Alert message="You have created account successefuly."
                                description="Please login to your account using the credentials you provided."
                                type="success"
                                showIcon
                            /></div>}


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 20}}>
                                Username
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                    initialValue : this.props.user.username,
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="username"
                                    />,
                                    )}
                                </Form.Item>
                                
                                First Name
                                <Form.Item>
                                    {getFieldDecorator('first_name', {
                                    initialValue : this.props.user.first_name,

                                    rules: [{ required: true, message: 'Please input your first name!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="First Name"
                                    />,
                                    )}
                                </Form.Item>
                                
                                Father Name
                                <Form.Item>
                                    {getFieldDecorator('last_name', {
                                    initialValue : this.props.user.last_name,

                                    rules: [{ required: true, message: 'Please input your father name!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Father Name"
                                    />,
                                    )}
                                </Form.Item>
                                
                              
                                    
                                Email
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                    initialValue : this.props.user.email,

                                    rules: [{ required: true, message: 'Please input your Email!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                    />,
                                    )}
                                </Form.Item>
                                
                                Phone
                                <Form.Item>
                                    {getFieldDecorator('phone', {
                                    initialValue : this.props.user.agent.phone,

                                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Phone"
                                    />,
                                    )}
                                </Form.Item>

                                
                                </Col>

                                {/* Second Column */}


                            </Row>

                            <Row>
                                <Col lg={{span : 24}}>
                                        
                                    <Form.Item>
                                        
                                        <Button onClick={this.handleSubmit} size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                                        Update <Icon className='casting-icon' type="save" />
                                        </Button>
                                    
                                    </Form.Item>
                                
                                </Col>
                            </Row>

                        </Form>

                    </div>

                </div>

            </Col>

        </Row>
        )

    }

}

const BasicInfoAgentForm = Form.create({ name: 'normal_basicinfo' })(NormalBasicInfoAgent);

export default BasicInfoAgentForm