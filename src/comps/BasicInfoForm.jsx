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

class NormalBasicInfo extends React.Component {
   
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
        const user = this.props.user
        const {languages, disciplines, regions, cities, additional_skills} = this.props.attributedatas || {}
        const profile_picture = this.state.picture || this.props.user.cast.profile_picture
        
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
                                <Col lg={{ span : 10}}>
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
                                
                                Gender
                                <Form.Item>
                                    {getFieldDecorator('gender', {
                                    initialValue : this.props.user.cast.gender,

                                    rules: [{ required: true, message: 'Please select your gender!' }],
                                    })(
                                    <Select placeholder="Select Gender" defaultValue="male" >
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                    </Select>,
                                    )}
                                </Form.Item>
                                
                                Birth Date
                                <Form.Item>
                                    {getFieldDecorator('birth_date', {
                                    initialValue : moment(this.props.user.cast.birth_date),

                                    rules: [{ required: true, message: 'Please input your birth date!' }],
                                    })(
                                    <DatePicker format="YYYY-MM-DD" />,
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
                                    initialValue : this.props.user.cast.phone,

                                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Phone"
                                    />,
                                    )}
                                </Form.Item>

                                Facebook
                                <Form.Item>
                                    {getFieldDecorator('facebook', {
                                    initialValue : this.props.user.cast.facebook,
                                    
                                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Facebook"
                                    />,
                                    )}
                                </Form.Item>

                                Instagram
                                <Form.Item>
                                    {getFieldDecorator('instagram', {
                                    initialValue : this.props.user.cast.instagram,

                                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="instagram" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Instagram adress"
                                    />,
                                    )}
                                </Form.Item>

                                Twitter
                                <Form.Item>
                                    {getFieldDecorator('twitter', {
                                    initialValue : this.props.user.cast.twitter,
                                    
                                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Twitter Addrss"
                                    />,
                                    )}
                                </Form.Item>
                                
                                </Col>

                                {/* Second Column */}

                                <Col lg={{ span : 10, offset : 2}}>
                                    
                                    Region
                                    <Form.Item>
                                        {getFieldDecorator('region', {
                                        initialValue : this.props.user.cast.region.id,

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
                                        initialValue : this.props.user.cast.city.id,
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
                                    
                                    Height(M)
                                    <Form.Item>
                                        {getFieldDecorator('height', {
                                        initialValue : this.props.user.cast.height,

                                        rules: [{ required: true, message: 'Please input your height!' }],
                                        })(
                                        <InputNumber
                                            min={1}
                                            max={3}
                                            prefix={<Icon type="column-height" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Height"
                                        />,
                                        )}
                                    </Form.Item>

                                    Weight(KG)
                                    <Form.Item>
                                        {getFieldDecorator('weight', {
                                        initialValue : this.props.user.cast.weight,
                                        
                                        rules: [{ required: true, message: 'Please input your weight!' }],
                                        })(
                                        <InputNumber
                                            max={300}
                                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Weight"
                                        />,
                                        )}
                                    </Form.Item>

                                    Languages
                                    <Form.Item>
                                        {getFieldDecorator('languages', {
                                        initialValue : this.props.user.cast.languages.map( language => language.id),
                                        
                                        rules: [{ required: true, message: 'Please choose your languages!' }],
                                        })(
                                        <Select placeholder="Select languages" mode="multiple" >
                                            {(languages || []).map( language => <Option value={language.id}>{language.name}</Option>)}
                                            
                                        </Select>,
                                        )}
                                    </Form.Item>
                                    
                                    Disciplines
                                    <Form.Item>
                                        {getFieldDecorator('intersted_in', {
                                        initialValue : this.props.user.cast.intersted_in.map( discipline => discipline.id),

                                        rules: [{ required: true, message: 'Please choose your disciplines!' }],
                                        })(
                                        <Select placeholder="Select Disciplines" mode="multiple" >
                                            {(disciplines || []).map( discipline => <Option value={discipline.id}>{discipline.name}</Option>)}
                                            
                                        </Select>,
                                        )}
                                    </Form.Item>
                                    
                                    Additional Skills
                                    <Form.Item>
                                        {getFieldDecorator('additional_skills', {
                                        initialValue : this.props.user.cast.additional_skills.map( additional_skill => additional_skill.id),

                                        rules: [{ required: true, message: 'Please choose your skills!' }],
                                        })(
                                        <Select placeholder="Select Addtional Skills" mode="multiple" defaultValue="male" >
                                            {(additional_skills || []).map( additional_skill => <Option value={additional_skill.id}>{additional_skill.name}</Option>)}
                                            
                                            
                                        </Select>,
                                        )}
                                    </Form.Item> 
                                    
                                    Profile Picture
                                    {this.state.picture_error && <Alert message="Please upload your profile picture here." type="error" /> }
                                    <Form.Item>
                                        {getFieldDecorator('profile_picture', {
                                        initialValue : profile_picture,

                                        rules: [{ required: true, message: 'Please upload a profile picture!' }],
                                        })(
                                            <Dragger  
                                                name = 'picture'
                                                multiple={false}
                                                onChange={this.handleUpload}
                                                action = {`${Api.API_BASE_URL}/upload.picture/`}>
                                                <p className="ant-upload-drag-icon">
                                                    {profile_picture && <img className='image-upload-preview' src={`${Api.API_BASE_URL}/media/${profile_picture}`} /> || <Icon type="inbox" />}
                                                </p>
                                                <p className="ant-upload-text">Click or drag your profile picture to this area to upload</p>
                                                <p className="ant-upload-hint">
                                                    Please make sure to upload a picture that shows your face fully.
                                                </p>
                                            </Dragger>,
                                        )}
                                    </Form.Item>

                                    
                            
                                </Col>

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

const BasicInfoForm = Form.create({ name: 'normal_basicinfo' })(NormalBasicInfo);

export default BasicInfoForm