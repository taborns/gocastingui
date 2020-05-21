import React from 'react';
import { Form, Input, Button, Card, Empty, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert, PageHeader } from 'antd';
import Api from '../services/api';
import * as Scroll from 'react-scroll';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class JobEditForm extends React.Component {
   
    constructor(props) {
    
        super(props)
    
        this.state = {
            error : '',
            loading_job : false,
            loading : false,
            registered : false,
            requirement : "",
            closes_on : null,
            job : null
        }

    }
    
    getJob = () => {

        this.setState({loading_job : true})

        Api.getData(`jobs/${this.props.match.params.id}`)
            .then( 
                job => this.setState({ job, closes_on : moment(job.closes_on).format('YYYY-MM-DD'), requirement : job.requirement, loading_job : false }),
                err => this.setState({loading_job : false})
                )
    }


    dateChange = (date, dateString) => this.setState({closes_on : dateString})
    
    handleSubmit = e => {

        this.setState({loading : true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {


        values = this.composeRegisterData( values )
        if (!err) {
            Api.updateData(`job.update/${this.props.match.params.id}`, values, null, true)
            .then( (response)=>{ 
                this.setState({registered : true, loading : false,  err : null })
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
        values['requirement'] = this.state.requirement
        values['closes_on'] = this.state.closes_on
        return values
    }



    componentDidMount(){
        this.getJob()
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { regions,} = this.props.attributedatas || {}
        let job = this.state.job

        if ( this.state.loading_job) 
            return (<Row className='job-card'>
                <Col>
                    <Card loading={this.state.loading_job} />
                </Col>
            </Row>)
        
        if ( !job )
            return (<Row className='job-card'>
                    <Col>
                        <Empty description={<span>No Job Found. Please come back later.</span>}/>
                    </Col>
                </Row>)


        return (
        <Row >
            
            <Col>
                
                
                <div className='casting-login-wrapper'>

                    <div className='job-edit-area login-area'>
                        
                            
                        <div className='label h4'><Icon className='casting-icon' type="edit" /> UPDATE JOB Detail </div>
                        
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
                                    initialValue : job.title,
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
                                        data={job.requirement}
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
                                    initialValue : job.start_age,

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
                                    initialValue : job.end_age,

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
                                    initialValue : job.address,

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
                                    initialValue : job.region.id,
                                    
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

                                Gender
                                <Form.Item>
                                    {getFieldDecorator('gender', {
                                    initialValue : job.gender,
                                    
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
                                    initialValue : job.payment,
                                    
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
                                    initialValue : moment(job.closes_on),
                                    rules: [{ required: true, message: 'Please input job close date!' }],
                                    })(
                                    <DatePicker onChange={this.dateChange} format="YYYY-MM-DD" />,
                                    )}
                                </Form.Item>


                                <Form.Item>
                                    
                                    <Button type="success" onClick={this.handleSubmit} size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                                    Update Job <Icon className='casting-icon' type="save" />
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

const JobEdit = Form.create({ name: 'normal_basicinfo' })(JobEditForm);

export default JobEdit