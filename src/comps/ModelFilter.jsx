import React from 'react';
import {Row, Col} from 'antd'
import { Form,Slider, Icon, Input, Button, Select } from 'antd';
const { Option } = Select;

export default class ModelFilter extends React.Component { 
    
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            age : [0,150],
            gender : "all",
            height : [1,3.0], 
            weight : [20,300],
            discipline : -1
        }

        this.heightMarks = {
            1 : '1',
            3: '3' 
        }

        this.ageMarks = {
            0 : '0',
            150 : '150'
        }

        this.weightMarks = {
            20 : '0',
            300 : '300'
        }
    }


    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        this.props.setsearchGlobalState(event.target.name, event.target.value)
    }

    handleAgeChange = (ageRange) => {
        this.setState({age : ageRange})
        this.props.setsearchGlobalState('age', ageRange)
    }

    handleHeightChange = (heightRange) => {
        this.setState({height : heightRange})
        this.props.setsearchGlobalState('height', heightRange)

    }

    handleWeightChange = (weightRange) => {
        this.setState({weight : weightRange})
        this.props.setsearchGlobalState('weight', weightRange)

    }

    handleGenderChange = (gender) => {
        this.setState({ gender : gender})
        this.props.setsearchGlobalState('gender', gender)
    }

    handleDiscipleChange = (discipline) => {
        this.setState({ discipline : discipline})
        this.props.setsearchGlobalState('discipline', discipline)

    }

    doSearch = () => {
        this.props.history.push('/search')
        this.props.searchCasts()
    }

    clearSearch = () => {
        this.props.history.push('/')
    }

    componentDidMount() {
    }
    
    render() {

        let disciplines = this.props.attributedatas && this.props.attributedatas.disciplines || []
        return (
            <Col className='models-filter'>
                    <Form layout='vertical'>
                        <Form.Item label='Name '>
                            <Input
                            name='name'
                            onChange={this.handleChange}
                            value={this.state.name}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0)' }} />}
                            placeholder="Cast name"
                            />
                        </Form.Item>
                        <Form.Item label='Age Range'>
                            <Slider marks={this.ageMarks} min={0} max={150} onChange={this.handleAgeChange} name='age' value={this.state.age} range defaultValue={[0,149]}  />
                        </Form.Item>

                        <Form.Item label='Sex'>
                            <Select onChange={this.handleGenderChange} name='gender' value={this.state.gender} placeholder='All Genders' style={{ width: '100%' }}>
                                <Option value="all">All Genders</Option>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label='Height Range'>
                            <Slider marks={this.heightMarks} step={0.01} min={1} max={3} onChange={this.handleHeightChange} name='height' value={this.state.height} range defaultValue={[1,3]}  />
                        </Form.Item>

                        <Form.Item label='Weight Range'>
                            <Slider marks={this.weightMarks} min={20} max={300} onChange={this.handleWeightChange} name='weight' value={this.state.weight} range defaultValue={[20,300]}  />
                        </Form.Item>

                        <Form.Item label='Disciplines'>
                            <Select onChange={this.handleDiscipleChange} name='discipline' value={this.state.discipline} placeholder='All Genders' style={{ width: '100%' }}>
                                <Option value={-1}>All Disciplines</Option>
                                {disciplines.map(discipline=> <Option value={discipline.id}>{discipline.name}</Option>)}
                                
                            </Select>
                        </Form.Item>
                        
                        <Button onClick={this.doSearch}>Search </Button>
                        <Button style={{ marginLeft : 5}} onClick={this.clearSearch}>Clear </Button>
                        
                    </Form>

                </Col>
        )
    }
}