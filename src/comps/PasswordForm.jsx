import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert, Modal } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';

let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalPasswordChangeForm extends React.Component {
   
    constructor(props) {
    
        super(props)
    
        this.state = {
            err : null,
            loading : false,
            changed : false,

        }

    }
        
    handleSubmit = e => {

        this.setState({loading : true})

        e.preventDefault();
        this.props.form.validateFields((err, values) => {


        if (!err) {
            Api.updateData('user.changepasswd', values)
            .then( (response)=>{ 
                this.setState({changed : true, loading : true,  err : null })
                scroll.scrollToTop()
            } , (err) => {
                console.log("password Chagne error", err)

                this.setState({ err : err[0], loading : false, changed : false })
            })

        }
        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        const user = this.props.user
        const {languages, disciplines, regions, cities, additional_skills} = this.props.attributedatas || {}
        
        
        return (
        <Row >
            
            <Col>

                <div className='casting-login-wrapper'>


                    <div className='login-area'>
                    
                        <div className='label h3'>Password Information <Icon className='casting-icon' type="lock" /> </div>

                        


                        <Form  className="login-form">
                    
                            <Row>

                                <Col order={2} lg={{ span : this.props.span || 10,}}>
                                    
                                    <p>{ this.state.changed && <div>
                                        <Alert message="Password changed succesfully."
                                            type="success"
                                            closable
                                            showIcon
                                    /></div> || 
                                    
                                    this.state.err && <div>
                                        <Alert message={this.state.err}
                                            type="error"
                                            closable
                                            showIcon
                                        /></div>}
                                    </p>

                                    Old Password
                                    <Form.Item>
                                        {getFieldDecorator('oldpass', {

                                        rules: [{ required: true, message: 'Please input your old password!' }],
                                        })(
                                        <Input.Password
                                            min={1}
                                            max={3}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Old Password"
                                        />,
                                        )}
                                    </Form.Item>

                                    New Password
                                    <Form.Item>
                                        {getFieldDecorator('password', {

                                        rules: [{ required: true, message: 'Please input your New password!' }],
                                        })(
                                        <Input.Password
                                            min={1}
                                            max={3}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="New Password"
                                        />,
                                        )}
                                    </Form.Item>

                                    Confirm New Password
                                    <Form.Item>
                                        {getFieldDecorator('confirm_password', {

                                        rules: [{ required: true, message: 'Please input your new password confirmatin!' }],
                                        })(
                                        <Input.Password
                                            min={1}
                                            max={3}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Confirm New Password"
                                        />,
                                        )}
                                    </Form.Item>

                                    
                                    <Form.Item>
                                        
                                        <Button onClick={this.handleSubmit} size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                                        Change Password <Icon className='casting-icon' type="save" />
                                        </Button>
                                    
                                    </Form.Item>
                                
                                </Col>
                            
                                <Col style={{ display : this.props.span && 'none' || 'block'}} order={1} lg={{ span : 10, offset : 1}}>
                                    <img style={{ maxHeight : "300px"}} src='/lock.png' />
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

const PasswordForm = Form.create({ name: 'normal_register' })(NormalPasswordChangeForm);

export default PasswordForm