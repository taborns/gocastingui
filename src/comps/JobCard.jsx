import React from 'react';
import { Card, Row, Col, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class JobCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let job = this.props.job

        if ( this.props.loading) 
            return (<Row className='job-card'>
                <Col>
                    <Card loading={this.props.loading} />
                </Col>
            </Row>)
        
        return (<Row className='job-card'>
            <Col>
                <Card loading={this.props.loading} title={job.title}>
                    <div><Icon className='casting-icon' type="compass" /> <span className='job-attribute-title'> Location </span>: {job.address}, {job.region.name}</div>
                    {job.is_open && <div><Icon className='casting-icon' type="calendar" /> <span className='job-attribute-title'> Closes On </span>: {job.closes_on} </div>}
                    <div><Icon className='casting-icon' type="thunderbolt" /> <span className='job-attribute-title'> Gender </span>: {job.gender.toUpperCase()} </div>
                    <div className={job.is_open && `job-status-open` || `job-status-close`}><Icon className='casting-icon' type={job.is_open && `folder-open` || `folder`} /> Job {job.is_open && 'Open' || 'Closed'}</div>
                    <hr />
                    <div><Link to={`/jobs/${job.id}/`} className='job-view-more' >Read More<Icon className='casting-icon' type="right" /></Link></div>
                </Card>
            </Col>
        </Row>)

    }
}