import React from 'react';
import { Row, Empty, Col, Icon, Pagination } from 'antd';
import MyJobCard from './MyJobCard';

export default class MyJobs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let jobs = this.props.user && this.props.user.jobs || []
        
        if ( jobs.length == 0)
            return (<Row>

                <Col>
                    <Empty description={<span>No Jobs Found. Please come back later.</span>}/>
                </Col>
            </Row>)

        return (
            <Row>
                <div className='h3'><Icon type="tags" className='casting-icon' /> My Jobs</div>
                {jobs.map( job => <MyJobCard {...this.props}  jobs_loading={this.props.jobs_loading} job={job}/>)}

            </Row>
        )

    }
}