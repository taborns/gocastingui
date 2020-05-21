import React from 'react';
import { Form, Icon, Select, Input, Button} from 'antd';
import Api from '../services/api';

class JobSearchForm extends React.Component {
    
    constructor(props) {
        super(props)
    }

    doSearch = () => {
        
        this.props.history.push('/search-jobs')

        this.props.form.validateFields((err, values) => {
            this.props.jobSearch(values)     
        })

    }
    render() {
        const { regions} = this.props.attributedatas || {}
        const { getFieldDecorator } = this.props.form;

        return (
        <div className='search-area'>
        <Form layout='inline'>
            <Form.Item>
                {getFieldDecorator('title')(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Job Title"
                />)}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('status')(
                <Select style={{ width : 130 }} placeholder="Select Status" defaultValue="all" >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="open">Open</Select.Option>
                    <Select.Option value="closed">Closed</Select.Option>
                </Select>)}

            </Form.Item>

            <Form.Item>
                {getFieldDecorator('gender')(
                <Select style={{ width : 170 }} placeholder="Select Gender" defaultValue="all" >
                    <Select.Option value="all">Both Genders</Select.Option>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                </Select>)}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('region')(
                <Select 
                    style={{ width : 170 }}
                    showSearch 
                    placeholder="Select Region" 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>

                    {(regions || []).map( region => <Select.Option value={region.id}>{region.name}</Select.Option>)}
                    
                </Select>)}

            </Form.Item>


            <Form.Item>
                <Button onClick={this.doSearch} type='danger'><Icon type="search" className='casting-icon' /> Search </Button>
            </Form.Item>

        </Form>
        </div>)
    }

}


const JobSearch = Form.create({ name: 'normal_basicinfo' })(JobSearchForm);

export default JobSearch