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

class NormalWorkHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            registered : false,
            err : null
        }
    }

    handleSubmit = e => { 
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                Api.postData(`cast.workhistory`, values)
                .then( (response)=>{ 
                    this.setState({registered : true, loading : true,  err : null })
                    scroll.scrollToTop()
                    this.props.getLoggedInUser()
                } , (respo) => this.setState({ err : respo, loading : false, registered : false }) )

            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const user = this.props.user
        //const {languages, disciplines, regions, cities, additional_skills} = this.props.attributedatas || {}
        
        
        return (
        <Row >
            
            <Col>

                <div className='casting-login-wrapper'>


                    <div className='login-area'>
                    
                        <div className='label h3'>Working History <Icon className='casting-icon' type="save" /> </div>
                        
                        


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 10}}>
                                Title
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please input your Job title!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Job Title"
                                    />,
                                    )}
                                </Form.Item>
                                
                                Company
                                <Form.Item>
                                    {getFieldDecorator('company', {

                                    rules: [{ required: true, message: 'Please input your company name!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Company Name"
                                    />,
                                    )}
                                </Form.Item>
                                
                                Start Year
                                <Form.Item>
                                    {getFieldDecorator('start_year', {

                                    rules: [{ required: true, message: 'Please input the year you started the education!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Start Year"
                                    />,
                                    )}
                                </Form.Item>

                                End Year
                                <Form.Item>
                                    {getFieldDecorator('end_year', {

                                    rules: [{ required: true, message: 'Please input the year you finished the education!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="End Year"
                                    />,
                                    )}
                                </Form.Item>

                                Description
                                <Form.Item>
                                    {getFieldDecorator('description', {
                                    })(
                                    <Input.TextArea
                                        
                                        placeholder="Brief Description about your education"
                                    />,
                                    )}
                                </Form.Item>
                                
                         
                                <Form.Item>
                                        
                                        <Button onClick={this.handleSubmit} size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                                        Add <Icon className='casting-icon' type="plus" />
                                        </Button>
                                    
                                    </Form.Item>
                            
                                </Col>

                                <Col lg={{ span : 10, push : 1}}>
                                    <div class="section-title">
                                        <span></span>
                                        <ul class="timeline col-md-12">
                                            <li> <Icon type="sketch-circle" theme="filled" className='casting-icon' /> <h2 class="timeline-title">Working History</h2></li>
                                            
                                            {this.props.user.work_histories.length > 0 && this.props.user.work_histories.map( working_history => (
                                            <li><h3 class="line-title">{working_history.title} - {working_history.company}</h3>

                                                <span>{working_history.start_year} - {working_history.end_year ||  'Present'}</span>
                                                {working_history.description && <p class="little-text">{working_history.description}</p>}

                                            </li>
                                            )) || <li>No Working histories found.</li> }
                                            
                                        </ul>

                                    </div>
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

const WorkHistoryForm = Form.create({ name: 'normal_workhistory' })(NormalWorkHistory);

export default WorkHistoryForm