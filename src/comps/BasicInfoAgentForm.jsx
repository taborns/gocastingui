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


        values = this.composeRegisterData( values )
        if (!err) {
            Api.updateData(`agent.update`, values, null, true)
            .then( (response)=>{ 
                this.setState({registered : true, loading : true,  err : null })
                scroll.scrollToTop()
                this.props.getLoggedInUser()
            } , (respo) => this.setState({ error : this.composeError(respo), loading : false, registered : false }) )

        }
        });
    };

    composeError = (error) => {

        if ( error.agent)
            return Api.formatError(error.agent)
        

        return Api.formatError(error)
        
        
    }

    composeRegisterData = values => {
        let user = {}
        
        for(let param in values) {
        
            if ( this.basic_info_attrs.indexOf(param) >= 0)
                user[param] = values[param]
        
        }

        user['agent'] = values
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
        const {languages, disciplines, regions, cities, additional_skills} = this.props.attributedatas || {}
        
        return (
        <Row >
            
            <Col>

                <div className='casting-login-wrapper'>


                    <div className='login-area'>
                    
                        <div className='label h3'>Account Information <Icon className='casting-icon' type="save" /> </div>
                        
                        


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 20}}>
                                { this.state.registered && <div>
                                <Alert message="You have created account successefuly."
                                    description="Please login to your account using the credentials you provided."
                                    type="success"
                                    showIcon
                                /></div> || this.state.error && <div>
                                <Alert message={this.state.error}
                                    type="error"
                                    showIcon
                                /></div> }
                                
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

                                Comopany
                                <Form.Item>
                                    {getFieldDecorator('company', {
                                    initialValue : this.props.user.agent.company,
                                    
                                    rules: [{ required: true, message: 'Please input your company name!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="company"
                                    />,
                                    )}
                                </Form.Item>


                                    Region
                                    <Form.Item>
                                        {getFieldDecorator('region', {
                                        initialValue : this.props.user.agent.region.id,
                                        
                                        rules: [{ required: true, message: 'Please select your region!' }],
                                        })(
                                        <Select 
                                            showSearch 
                                            placeholder="Select Region" 
                                            defaultValue="male" 
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>

                                            {(regions || []).map( region => <Option value={region.id}>{region.name}</Option>)}
                                            
                                        </Select>,
                                        )}
                                    </Form.Item>
                                    
                                    City
                                    <Form.Item>
                                        {getFieldDecorator('city', {
                                        initialValue : this.props.user.agent.city.id,
                                        
                                        rules: [{ required: true, message: 'Please select your city!' }],
                                        })(
                                        <Select 
                                            showSearch 
                                            placeholder="Select City" 
                                            defaultValue="male"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>
                                            {(cities || []).map( city => <Option value={city.id}>{city.name}</Option>)}
                                            
                                        </Select>,
                                        )}
                                    </Form.Item>


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