import React from 'react';
import JobCard from './JobCard';
import { Row, Empty, Col, Pagination } from 'antd';
import JobSearch from './JobSearch';

export default class Jobs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let jobs = this.props.jobs || []
        if ( this.props.jobs_loading)
            return (<Row>
                <JobSearch {...this.props}  attributedatas={this.props.attributedatas}/>
                <JobCard loading={true} />
                </Row>)
        
        if ( this.props.jobs.length == 0)
            return (<Row>
                    <JobSearch {...this.props}  attributedatas={this.props.attributedatas}/>

                <Col>
                    <Empty description={<span>No Jobs Found. Please come back later.</span>}/>
                </Col>
            </Row>)

        return (
            <Row>
                <JobSearch {...this.props}  attributedatas={this.props.attributedatas}/>
                {jobs.map( job => <JobCard jobs_loading={this.props.jobs_loading} job={job}/>)}

                <Pagination defaultCurrent={this.props.jobs_current} total={this.props.jobs_count} />
            </Row>
        )

    }
}