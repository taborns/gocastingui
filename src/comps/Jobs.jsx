import React from 'react';
import JobCard from './JobCard';
import { Row, Pagination } from 'antd';

export default class Jobs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let jobs = this.props.jobs || []
        console.log("ALLPROPS", this.props)
        return (
            <Row>

                {jobs.map( job => <JobCard job={job}/>)}

                <Pagination defaultCurrent={this.props.jobs_current} total={this.props.jobs_count} />
            </Row>
        )

    }
}