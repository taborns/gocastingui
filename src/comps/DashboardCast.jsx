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

const {TabPane} = Tabs

export default class DashboardCast extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (<Row gutter={16} >

                    <Col style={{ marginTop : '10px'}} xs={{ span : 22, push : 1}} > 
                        
                        
                    <Tabs defaultActiveKey="basicinfo" type='card' size='large'>
                        
                        <TabPane className="setting-tabpane" tab={<span><Icon type="user" className='casting-icon'/><span className='setting-icon-label'>Basic Info</span></span>} key="basicinfo">
                            {this.props.user && this.props.attributedatas && <BasicInfoForm {...this.props} attributedatas={this.props.attributedatas} user={this.props.user}/> }
                        </TabPane>  

                        <TabPane className="setting-tabpane" tab={<span><Icon type="lock" className='casting-icon' /><span className='setting-icon-label'>Password</span></span>} key="password">
                        {this.props.user && <PasswordForm attributedatas={this.props.attributedatas} user={this.props.user}/> }

                        </TabPane>

                        <TabPane className="setting-tabpane" tab={<span><Icon type="sketch-circle" theme="filled"  className='casting-icon'/><span className='setting-icon-label'>Work</span></span>} key="workhistory">
                        { this.props.user && <WorkHistoryForm {...this.props} user={this.props.user} /> }

                        </TabPane>

                        <TabPane className="setting-tabpane" tab={<span><Icon type="bank" className='casting-icon'/><span className='setting-icon-label'>Education</span></span>} key="educationhistory">
                        { this.props.user && <EducationHistoryForm {...this.props} user={this.props.user} /> }
                        </TabPane>

                        <TabPane className="setting-tabpane" tab={<span><Icon type="camera" className='casting-icon' /> <span className='setting-icon-label'>Gallery</span></span>} key="galler">
                            
                        { this.props.user && <PhotoGallery {...this.props} user={this.props.user} /> }

                        </TabPane>  

                        <TabPane className="setting-tabpane" tab={<span><Icon type="youtube" className='casting-icon' /><span className='setting-icon-label'>Videos</span></span>} key="videos">
                        { this.props.user && <VideoGallery {...this.props} user={this.props.user} /> }

                        </TabPane>

                        

                    </Tabs>
                    
                    </Col>
                </Row>);
    }

}


//export default DashboardCast;