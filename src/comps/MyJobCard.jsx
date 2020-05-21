import React from 'react';
import { Card, Row, Col,Modal, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Api from '../services/api';
import * as Scroll from 'react-scroll';

const { confirm } = Modal;
var scroll     = Scroll.animateScroll;

export default class MyJobCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            removing : false
        }
    }


    remove = jobID => {

        Api.removeData(`job.remove/${jobID}`)
            .then( response => {
                scroll.scrollToTop()
                this.props.getLoggedInUser()
                this.setState({ removing : false})
                Modal.success({
                    title : "Job removed! "
                })

            }, err => {
                Modal.error({
                    title : "Failed to remove the job. Please try again."
                })
                this.setState({ removing : false})
            })
    }


    showConfirm = jobID => {
        confirm({
            content: "Are you sure you want to remove this job?",
            onOk : () => {
              this.setState({ removing : true})
              this.remove(jobID);
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });

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
                    <div>
                        <Link to={`/myjobs/${job.id}/`} className='myjob-btn myjob-btn-edit' ><Icon className='casting-icon' type="edit" /> Edit </Link>
                        <a onClick={() => this.showConfirm(job.id)}  className='myjob-btn' ><Icon className='casting-icon' type="delete" /> Remove </a>
                        <Link to={`/myjobs/${job.id}/`} className='myjob-btn myjob-btn-edit' ><Icon className='casting-icon' type="bars" /> Applications </Link>
                    </div>
                </Card>
            </Col>
        </Row>)

    }
}