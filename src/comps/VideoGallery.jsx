import React from 'react';
import { Form, Modal, Input, Icon,Button, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-grid-gallery';
import ReactPlayer from 'react-player';

let moment = require('moment')
const { Dragger } = Upload;
const { confirm } = Modal;
var scroll     = Scroll.animateScroll;
const { Option } = Select;

class NormalVideoGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            created : true, 
            err : null,
            photo : null,
            removingVideo : null
        }
    }

    handleSubmit = e => {

        this.setState({loading : true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            Api.postData(`cast.video`, values)
            .then( (response)=>{ 
                this.setState({created : true, loading : true,  err : null })
                scroll.scrollToTop()
                this.props.getLoggedInUser()
            } , (respo) => this.setState({ error : respo, loading : false, registered : false }) )

        }
        });
    };

    remove = videoID => {
        console.log("removing ID", this.state.removing)
        Api.removeData(`cast.video.remove/${videoID}`)
            .then( response => {
                scroll.scrollToTop()
                this.props.getLoggedInUser()
                this.setState({ removingVideo : null})

            }, err => {
                Modal.error({
                    title : "Failed to remove the video"
                })
                this.setState({ removingVideo : null})
            })
    }

    showConfirm = videoID => {
        confirm({
            content: "Are you sure you want to remove this video?",
            onOk : () => {
              this.setState({ removingVideo : videoID})
              this.remove(videoID);
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });

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
                    
                        <div className='label h3'> <Icon className='casting-icon' type="youtube" /> Video URL  </div>
                        
                        


                        <Form  className="login-form">
                    
                            <Row>

                                {/* First Column */}
                                <Col lg={{ span : 24}}>
                               
                                    Video URL

                                    {this.state.picture_error && <Alert message="Please upload your profile picture here." type="error" /> }
                                    <Form.Item>
                                        {getFieldDecorator('video', {
                                        
                                        rules: [{ required: true, message: 'Please input Link to your!' }],
                                        })(
                                        <Input
                                            prefix={<Icon type="youtube" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Video URL"
                                        />,
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        
                                        <Button onClick={this.handleSubmit} size='large' block type="primary" htmlType="submit" className="login-form-button">
                                        Add <Icon className='casting-icon' type="plus" />
                                        </Button>
                                    
                                    </Form.Item>
                                
                         
                            
                                </Col>

                                <Col lg={{ span : 24,}}>
                                
                                    <div >
                                    <div className='h3'>Your Videos</div>
                                    {this.props.user && this.props.user.videos.length > 0 &&
                                       this.props.user.videos.map(video => 
                                       <div style={{marginBottom : '5px'}}>
                                            <ReactPlayer 
                                                playIcon={<Icon style={{fontSize : 72, color:"red"}} 
                                                theme="filled"  type="play-circle" />} 
                                                light="https://www.geirangerfjord.no/upload/images/2018_general/film-and-vid.jpg" 
                                                controls url={video.video} />
                                                <Button loading={this.state.removingVideo == video.id} onClick={() => this.showConfirm(video.id)} size='large' type='danger'><Icon className='casting-icon' type="delete" /> Remove</Button>
                                        </div>) ||  <div>No videos uploaded yet.</div>}

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

const VideoGallery = Form.create({ name: 'normal_register' })(NormalVideoGallery);

export default VideoGallery