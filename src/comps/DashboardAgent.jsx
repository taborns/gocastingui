import React from 'react';
import {  Tabs, Row, Col, Icon } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import EducationHistoryForm from './EducationHistoryForm';
import PhotoGallery from './PhotoGallery';
import VideoGallery from './VideoGallery.jsx';
import WorkHistoryForm from './WorkHistoryForm';
import PasswordForm from './PasswordForm';
import Gallery from 'react-grid-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Api from '../services/api';
import BasicInfoAgentForm from './BasicInfoAgentForm';
import AgentWallet from './AgentWallet';

const {TabPane} = Tabs

export default class DashboardAgent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (<Row gutter={16} >

                    <Col style={{ marginTop : '10px'}} md={{ span : 11,}} > 
                    {this.props.user && <AgentWallet user={this.props.user} /> }

                    {this.props.user  && <BasicInfoAgentForm {...this.props} attributedatas={this.props.attributedatas} user={this.props.user}/> }
                    </Col>

                    <Col style={{ marginTop : '10px'}} md={{ span : 11,}} > 
                    {this.props.user && <PasswordForm span={24} attributedatas={this.props.attributedatas} user={this.props.user}/> }

                    </Col>
                </Row>);
    }

}


//export default DashboardCast;