import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';

var scroll     = Scroll.animateScroll;
const Option = {Select}
class NormalBookModel extends React.Component {
   
    constructor(props) {
    
        super(props)
    
        this.state = {
            error : '',
            loading : false,
            registered : false,

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
            Api.postData('agent.register', values)
            .then( (response)=>{ 
                this.setState({registered : true, loading : true,  err : null })
                scroll.scrollToTop()
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

        values['user'] = user
        return values 
    }

    
    
    componentDidMount(){
        if( this.props.user)
            this.props.history.push('/')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {languages, disciplines, regions, cities, additional_skills} = this.props.attributedatas
        
        
        return (
        <Row gutter={[10,10]}>
            
            <Col lg={{ span : 12, offset : 6 }}>

                <div className='casting-login-wrapper'>

                    <div>
                        <img style={{ width : '100%'}} src='/bookmodelbanner.jpg' />
                    </div>

                    <div className='login-area'>
                    
                        <div className='label h3'> <Icon className='casting-icon' type="book" /> Book A Model  </div>
                        <div className='login-reg-note'>Already a member? Please <Link style={{fontWeight : "bolder"}} to='/login/'>Login</Link></div>
                        
                        { this.state.registered && <div>
                            <Alert message="You have created account successefuly."
                                description="Please login to your account using the credentials you provided."
                                type="success"
                                showIcon
                            /></div>}


                        <Form  className="login-form">
                                Username
                                <Form.Item>
                                    {getFieldDecorator('username', {
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

                                
                                Password
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                        )}
                                    </Form.Item>
                            
                                
                                <Form.Item>
                                    
                                    <Button onClick={this.handleSubmit} size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                                    Register <Icon className='casting-icon' type="user-add" />
                                    </Button>
                                
                                </Form.Item>
                            

                        </Form>

                    </div>

                </div>

            </Col>

        </Row>
        )

    }

}

const BooKModel = Form.create({ name: 'normal_register' })(NormalBookModel);

export default BooKModel