import React from 'react';
import { Card, Row, Col, Button, Icon, Empty, Modal, message, Spin } from 'antd';
import Api from '../services/api';
import { Link } from 'react-router-dom';

export default class JobDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            job : null,
            applying : false,
            applied : false
        }
        
    }

    getJob = () => {

        this.setState({loading : true})

        Api.getData(`jobs/${this.props.match.params.id}`)
            .then( 
                job => this.setState({ job, loading : false }),
                err => this.setState({loading : false})
                )
    }

    apply = () => {
        
        if ( this.state.applying)
            return

        this.setState({ applying : true})
        Api.postData('job.apply', {job : this.props.match.params.id})
            .then( 
                resp => {
                    this.setState({ applying : false, applied : true})
                },
                err => {
                    Modal.error({title : err})
                    this.setState({ applying : false})
                    
                },
            )
    }

    componentDidMount() {
        this.getJob()
    }

    render() {
        let job = this.state.job
        const can_apply = this.props.user && this.props.user.cast

        if ( this.state.loading) 
            return (<Row className='job-card'>
                <Col>
                    <Card loading={this.state.loading} />
                </Col>
            </Row>)
        
        if ( !job )
            return (<Row className='job-card'>
                    <Col>
                        <Empty description={<span>No Job Found. Please come back later.</span>}/>
                    </Col>
                </Row>)
        
        return (<Row className='job-card'>
            <Col>
                
                <Card loading={this.props.loading} title={<Link className='' to={'/jobs'}><Icon className='casting-icon' type="arrow-left" /> Back</Link>}>
                    
                    <div className='job-meta-data'>
                    <div className='job-title'>{job.title}</div>
                    <div className='job-attributes'><Icon className='casting-icon' type="compass" /> <span className='job-attribute-title'> Location </span>: {job.address}, {job.region.name}</div>
                    <div className='job-attributes'><Icon className='casting-icon' type="number" /> <span className='job-attribute-title'> Age Range </span>: {job.start_age} to {job.end_age}</div>
                    {job.is_open && <div><Icon className='casting-icon' type="calendar" /> <span className='job-attribute-title'> Closes On </span>: {job.closes_on} </div>}
                    <div className='job-attributes'><Icon className='casting-icon' type="thunderbolt" /> <span className='job-attribute-title'> Gender </span>: {job.gender.toUpperCase()} </div>
                    <div className='job-attributes'><Icon className='casting-icon' type="dollar" /> <span className='job-attribute-title'> Payment </span>: {job.payment}</div>
                    <div className={job.is_open && `job-attributes job-status-open` || `job-attributes job-status-close`}><Icon className='casting-icon' type={job.is_open && `folder-open` || `folder`} /> Job {job.is_open && 'Open' || 'Closed'}</div>
            
                    </div>                    
                    <div className='job-title'>Requirements</div>
                    <div dangerouslySetInnerHTML={  { __html: job.requirement} } />

                    {can_apply && <div className='apply-now-wrapper'> 
                        {(job.applied || this.state.applied) && <span className='job-applied'>
                            <Icon className='casting-icon' type="check-circle" /> Applied</span> || <a  onClick={this.apply} className='job-apply'>
                            {this.state.applying && 'Applying' || 'Apply Now'} 
                            {this.state.applying && <Icon type='loading' className='casting-icon' />}
                        </a>}

                    </div>}
                
                </Card>

            </Col>
        </Row>)

    }
}