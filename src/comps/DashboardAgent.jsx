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

const {TabPane} = Tabs

export default class DashboardAgent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (<Row gutter={16} >

                    <Col style={{ marginTop : '10px'}} xs={{ span : 22, push : 1}} > 
                        
                    {this.props.user  && <BasicInfoAgentForm {...this.props} attributedatas={this.props.attributedatas} user={this.props.user}/> }

                    
                    </Col>
                </Row>);
    }

}


//export default DashboardCast;