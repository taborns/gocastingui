import React from 'react';
import { Card, Row, Col, Button } from 'antd';

export default class JobCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        return (<Row>
            <Col>
                <Card title={this.props.job.title} extra={<span>Open</span>}>
                    <div>Location : {this.props.job.address} {this.props.job.region.name}</div>
                    <div>Closes On : {this.props.job.closes_on} </div>
                    <div><Button type="danger">Read More</Button></div>
                </Card>
            </Col>
        </Row>)

    }
}