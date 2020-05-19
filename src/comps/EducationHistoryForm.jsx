import React from 'react';
import { Form,Button, Input, Icon, Col, Row, Select, Modal, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';

const {confirm} = Modal
let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalEducationHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            created : false, 
            loading : false,  
            err : null,
            removingEducationHistory : null,
        }
    }

    handleSubmit = e => { 
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                Api.postData(`cast.educations`, values)
                .then( (response)=>{ 
                    this.setState({created : true, loading : false,  err : null })
                    scroll.scrollToTop()
                    this.props.getLoggedInUser()
                } , (respo) => this.setState({ err : respo, loading : false, created : false }) )

            }

        });
    }

    remove = educationHistoryID => {
        console.log("removing ID", this.state.removing)
        Api.removeData(`cast.educations.remove/${educationHistoryID}`)
            .then( response => {
                scroll.scrollToTop()
                this.props.getLoggedInUser()
                this.setState({ removingEducationHistory : null})

            }, err => {
                Modal.error({
                    title : "Failed to remove work history"
                })
                this.setState({ removingEducationHistory : null})
            })
    }

    showConfirm = educationHistoryID => {
        confirm({
            content: "Are you sure you want to remove your work historoy?",
            onOk : () => {
              this.setState({ removingEducationHistory : educationHistoryID})
              this.remove(educationHistoryID);
            },
            onCancel: () => {
              console.log('Cancel');
            },
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
                    
                        <div className='label h3'>Education History <Icon className='casting-icon' type="save" /> </div>
                        
                        


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 10}}>
                                    
                                    <p>{ this.state.created && <div>
                                        <Alert message="Education History Succesfully Added."
                                            type="success"
                                            
                                            showIcon
                                    /></div> || 
                                    
                                    this.state.err && <div>
                                        <Alert message={this.state.err}
                                            type="error"
                                            
                                            showIcon
                                        /></div>}
                                    </p>

                                Education Title
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please input your Education title!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Education Title"
                                    />,
                                    )}
                                </Form.Item>
                                
                                School
                                <Form.Item>
                                    {getFieldDecorator('school', {

                                    rules: [{ required: true, message: 'Please input your school name!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="School Name"
                                    />,
                                    )}
                                </Form.Item>
                                
                                Start Year
                                <Form.Item>
                                    {getFieldDecorator('start_year', {

                                    rules: [{ required: true, message: 'Please input the year you started the education!' }],
                                    })(
                                    <InputNumber
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Start Year"
                                    />,
                                    )}
                                </Form.Item>

                                End Year
                                <Form.Item>
                                    {getFieldDecorator('end_year', {

                                    })(
                                    <InputNumber
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
                                            <li> <Icon type="bank" theme="filled" className='casting-icon' /> <h2 class="timeline-title">Education History</h2></li>
                                            
                                            {this.props.user.education_histories.length > 0 && this.props.user.education_histories.map( education_history => (
                                            <li>
                                                <div>
                                                    <h3 class="line-title">{education_history.title} - {education_history.school}</h3>
                                                </div>
                                                <span>{education_history.start_year} - {education_history.end_year ||  'Present'}</span>
                                                {education_history.description && <p class="little-text">{education_history.description}</p>}
                                                <div>
                                                    <Button size="large" disabled={this.state.removingEducationHistory == education_history.id} onClick={() => this.showConfirm(education_history.id)} type="danger">
                                                        {this.state.removingEducationHistory == education_history.id && 'Removing' ||  <span><Icon type="delete" className='casting-icon' /> REMOVE</span>  }
                                                    </Button>

                                                </div>


                                            </li>
                                            )) || <li>No education histories found.</li> }
                                            
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

const EducationHistoryForm = Form.create({ name: 'normal_register' })(NormalEducationHistory);

export default EducationHistoryForm