import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';
import TextArea from 'antd/lib/input/TextArea';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalJobCreate extends React.Component {
   
    constructor(props) {
    
        super(props)
    
        this.state = {
            error : '',
            loading : false,
            registered : false,
            requirement : "",
            closes_on : null
        }

    }
    
    dateChange = (date, dateString) => this.setState({closes_on : dateString})
    handleSubmit = e => {

        this.setState({loading : true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {


        values = this.composeRegisterData( values )
        if (!err) {
            Api.postData(`job.create`, values, null, true)
            .then( (response)=>{ 
                this.setState({registered : true, loading : true,  err : null })
                scroll.scrollToTop()
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
        values['requirement'] = this.state.requirement
        values['closes_on'] = this.state.closes_on
        return values
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
                                
                                Job Title
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please the job title!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="title"
                                    />,
                                    )}
                                </Form.Item>
                                {
                                    ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) )

                                }
                                Job Requirement
                                <Form.Item>
                                    
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        config={{
                                            toolbar: [ 'heading', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', ],
                                        }}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            this.setState({requirement : data})
                                        } }
                                    />
                                </Form.Item>

                                Applicant Youngest Age
                                <Form.Item>
                                    {getFieldDecorator('start_age', {

                                    rules: [{ required: true, message: 'Please input the applicant youngest age!' }],
                                    })(
                                    <InputNumber
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Youngest Age"
                                    />,
                                    )}
                                </Form.Item>
                                Applicant Oldest Age
                                <Form.Item>
                                    {getFieldDecorator('end_age', {

                                    rules: [{ required: true, message: 'Please input the applicant oldest age!' }],
                                    })(
                                    <InputNumber
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Oldest Age"
                                    />,
                                    )}
                                </Form.Item>

                                Address
                                <Form.Item>
                                    {getFieldDecorator('address', {

                                    rules: [{ required: true, message: 'Please input the adress of the job!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Adress"
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

                                Region
                                <Form.Item>
                                    {getFieldDecorator('gender', {
                                    
                                    rules: [{ required: true, message: 'Please select job gender requirement!' }],
                                    })(
                                    <Select 
                                        showSearch 
                                        placeholder="Select Gender" 
                                        defaultValue="all" 
                                        >

                                        <Option value='all'>All Genders</Option>
                                        <Option value='female'>Female</Option>
                                        <Option value='male'>Male</Option>
                                        
                                    </Select>,
                                    )}
                                </Form.Item>


                                Payment
                                <Form.Item>
                                    {getFieldDecorator('payment', {

                                    rules: [{ required: true, message: 'Please provide payment information!' }],
                                    })(
                                    <Input
                                        prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Payment Information "
                                    />,
                                    )}
                                </Form.Item>
                                
                                Closes On
                                <Form.Item>
                                    {getFieldDecorator('closes_on', {
                                    rules: [{ required: true, message: 'Please input job close date!' }],
                                    })(
                                    <DatePicker onChange={this.dateChange} format="YYYY-MM-DD" />,
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

const JobCreateForm = Form.create({ name: 'normal_basicinfo' })(NormalJobCreate);

export default JobCreateForm