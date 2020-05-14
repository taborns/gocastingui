import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';

let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalPhotoGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            created : true, 
            loading : true,  
            err : null,
            photo : null
        }
    }

    handleUpload = info => {
        const { photo } = this.state;
        const formData = new FormData();
        
        formData.append('photo', photo);

        Api.postData('cast.gallery', formData)
            .then( response => {
                this.setState({ photo : null})
                this.props.getLoggedInUser()
            })

    }
    
    beforeUpload = photo => {
        this.setState({photo})
        return false;
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        const user = this.props.user
        const profile_picture = this.state.picture || user.cast.profile_picture
        
        
        return (
        <Row >
            
            <Col>

                <div className='casting-login-wrapper'>


                    <div className='login-area'>
                    
                        <div className='label h3'>Upload New Picture <Icon className='casting-icon' type="camera" /> </div>
                        
                        


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 24}}>
                               
                                Profile Picture
                                    {this.state.picture_error && <Alert message="Please upload your profile picture here." type="error" /> }
                                    <Form.Item>
                                        {getFieldDecorator('photo', {

                                        rules: [{ required: true, message: 'Please upload a profile picture!' }],
                                        })(
                                            <Dragger  
                                                name = 'photo'
                                                multiple={false}
                                                accept={['.png', '.jpg', '.jpeg']}
                                                beforeUpload={this.beforeUpload}>
                                                
                                                <p className="ant-upload-text">Click or drag your profile picture to this area to upload</p>
                                                <p className="ant-upload-hint">
                                                    Please make sure to upload a picture that shows your face fully.
                                                </p>
                                            </Dragger>,
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        
                                        <Button onClick={this.handleUpload} size='large' block type="primary" htmlType="submit" className="login-form-button">
                                        Add <Icon className='casting-icon' type="plus" />
                                        </Button>
                                    
                                    </Form.Item>
                                
                         
                            
                                </Col>

                                <Col lg={{ span : 24,}}>
                                
                                    {console.log("photogallerylist", this.props.user.photos )}
                                    <div >
                                    <div className='h3'>Your Photos</div>
                                    {this.props.user && this.props.user.photos.length > 0 &&
                                    <Gallery 
                                    images={this.props.user.photos.map( photo =>( {src : `${Api.API_BASE_URL}${photo.photo}`, thumbnail : `${Api.API_BASE_URL}${photo.photo}`, thumbnailHeight : 3,}))} />
                                ||  <div>No photos are uploaded yet.</div>}

                                    </div>
                                </Col>

                            </Row>

                        </Form>

                    </div>

                </div>

            </Col>

        </Row>
        )

    }

}

const PhotoGallery = Form.create({ name: 'normal_register' })(NormalPhotoGallery);

export default PhotoGallery