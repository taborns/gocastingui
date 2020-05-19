import React from 'react';
import { Form, Modal, Input, Icon, Button, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';

const {confirm} = Modal
let moment = require('moment')
const { Dragger } = Upload;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalPhotoGallery extends React.Component {
    constructor(props) {
        super(props)
        console.log("this.props", props)
        this.state = {
            loading : false,
            created : true, 
            loading : true,  
            err : null,
            photo : null,
            images : this.setImages(this.props.user.photos),
            selectedImages : [],
            removeLoading : false,
        }

    }
    setImages = (photos) => photos.map( photo =>( { id : photo.id, src : `${Api.API_BASE_URL}${photo.photo}`, thumbnail : `${Api.API_BASE_URL}${photo.photo}`, thumbnailHeight : 3,}))

    onSelectImage = (index, image) => {
        var img = image
        let selectedImages = this.state.selectedImages.slice()

        if(img.hasOwnProperty("isSelected")) 
            img.isSelected = !img.isSelected;
        else 
            img.isSelected = true;
        
        if ( img.isSelected) 
            selectedImages.push( img.id )
        
        else if ( selectedImages.indexOf(img.id)!=-1 ) {
            let img_ind = selectedImages.indexOf(img.id)
            selectedImages = selectedImages.slice( 0, img_ind).concat( selectedImages.slice( img_ind+1) )
        }
        console.log("Selected Images", this.state.selectedImages && this.state.selectedImages.length)
        this.setState({
            selectedImages : selectedImages,
        });
    }

    handleUpload = info => {
        const { photo } = this.state;
        const formData = new FormData();
        
        formData.append('photo', photo);

        Api.postData('cast.gallery', formData)
            .then( response => {
                this.setState({ photo : null})
                this.props.getLoggedInUser( (user) => user &&this.setState({ images : this.setImages(user.photos) }))
            })

    }
    
    showConfirm = educationHistoryID => {
        confirm({
            content: `Are you sure you want to delete ${this.state.selectedImages.length} images from your gallery?`,
            onOk : () => {
              this.handleRemove();
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });

    }
    handleRemove = e => {
        this.setState({ removeLoading : true})
        Api.removeData('cast.gallery.remove', {'photos' : this.state.selectedImages})
            .then( response => {
                this.setState({ selectedImages : [], removeLoading : false})
                this.props.getLoggedInUser( (user) => user &&this.setState({ images : this.setImages(user.photos) }))
            } , err => this.setState({removeLoading : false}))
    }

    beforeUpload = photo => {
        this.setState({photo})
        return false;
      }

    componentDidMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let images_selected = !this.state.selectedImages || this.state.selectedImages && this.state.selectedImages.length == 0
        
        
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
                                
                                    <div >
                                    <div className='h3'>Your Photos <Button onClick={this.showConfirm} loading={this.state.removeLoading} disabled={images_selected} type="danger"><Icon type='delete' className='casting-icon' /> Remove ({  this.state.selectedImages.length} images)</Button> </div>
                                    {this.props.user && this.props.user.photos.length > 0 &&
                                    <Gallery 
                                    onSelectImage={this.onSelectImage}
                                    images = {this.state.images} />
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