import React from 'react'; 
import {Row, Col, Tabs, Button, Icon, Spin, Modal} from 'antd';
import Gallery from 'react-grid-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Api from '../services/api';
import Loading from './Loading';
import ReactPlayer from 'react-player';

const { TabPane } = Tabs;

export default class ModelProfile extends React.Component {
    
    constructor(props) {
        super(props)
    }


   

    

    render() {
       
        
        if ( !this.props.user)
            return <Col xs={{ span : 24}} lg={{ span : 24}} className='wrapper-body'><Spin /></Col>

        return (
            <Col xs={{ span : 24}} lg={{ span : 24}} className='wrapper-body'>

            <Row>
            
                <Col xs={{ span : 24}} lg={{span : 6}}>
                    <div className='h2'>{this.props.user.first_name} {this.props.user.last_name}</div>
                    <div style={{textAlign : "center"}}>
                        <img style={{width : '90%'}} src={ `${Api.API_BASE_URL}/media/${this.props.user.cast.profile_picture}`} />
                    </div>
                    
                    <div className='social-media'>
                        <div  className='h6'> CONTACT INFO</div>
                        
                        {this.props.user.cast.phone && <div className='phone-number'>
                        <Icon className='casting-icon' type='phone' /> {this.props.user.cast.phone}
                        </div>}
                        
                        {this.props.user.email && <div className='phone-number'>
                        <Icon className='casting-icon' type='mail' /> {this.props.user.email}
                        </div>}

                        {this.props.user.cast.facebook && <a href={this.props.user.cast.facebook}><Icon type="facebook" /></a>}
                        {this.props.user.cast.instagram && <a href={this.props.user.cast.instagram}><Icon type="instagram" /></a>}
                        {this.props.user.cast.twitter &&<a href={this.props.user.cast.twitter}><Icon type="twitter" /></a>}
                    </div>  
                    <div style={{marginTop : 5}}>
                        <div className='h6'>DISCIPLINES</div>

                        {this.props.user.cast.intersted_in.map( interst => <span className='model-tag'>{interst.name}</span>)}
                        
                    </div>
                </Col>

                <Col xs={{ span : 24}} lg={{ span : 18}}>
                
                <Tabs type="card" className='model-detail' defaultActiveKey="1" >
                    <TabPane tab="Profile Information" key="1">
                        <Row>
                        <div className='profile-info-title'>
                        <Icon style={{ color : 'red'}} type="profile"  className='casting-icon' /> <div style={{ display: 'inline-block'}} className='timeline-title'>Brief Information</div>
                        </div>

                        <table className='table table-brief table-bordered table-striped'>
                            <tr> <th>Age </th><td>{this.props.user.cast.age}</td></tr>
                            <tr> <th>Height </th><td>{this.props.user.cast.height} M</td></tr>
                            <tr> <th>Weight </th><td>{this.props.user.cast.weight} KG</td></tr>
                            <tr> <th>Gender </th><td>{this.props.user.cast.gender}</td></tr>
                            <tr> 
                                <th>Languages Known </th>
                                <td>{ this.props.user.cast.languages.map( language => <span>{language.name}, </span>)}</td>
                            </tr>
                            
                            <tr> 
                                <th>Additional Skills </th>
                                <td> { this.props.user.cast.additional_skills.map( additional_skill => <span>{additional_skill.name}, </span>)}</td>
                            </tr>

                            <tr> <th>Address </th><td>{this.props.user.cast.city.name}, {this.props.user.cast.region.name}</td></tr>
                            {/* <tr> <th>Mobile Number </th><td>{this.props.user.cast.phone}</td></tr> */}


                        </table>
                        </Row>

                        
                        <Row>
                        
                            <div class="section-title">
                                <span></span>
                                <ul class="timeline col-md-12 top_45">
                                    <li> <Icon type="sketch-circle" theme="filled" className='casting-icon' /> <h2 class="timeline-title">Working History</h2></li>
                                    {this.props.user.work_histories.length > 0 && this.props.user.work_histories.map( work_history => (
                                        <li><h3 class="line-title">{work_history.title} - {work_history.company}</h3>
                                            <span>{work_history.start_year} - {work_history.end_year ||  'Present'}</span>
                                            {work_history.description && <p class="little-text">{work_history.description}</p>}
                                        </li>
                                    )) || <li>No working histories found.</li>}
                                    
                                </ul>

                            </div>

                        </Row>

                        <Row>
                        
                            <div class="section-title">
                                <span></span>
                                <ul class="timeline col-md-12 top_45">
                                    <li> <Icon type="bank" theme="filled" className='casting-icon' /> <h2 class="timeline-title">Education History</h2></li>
                                    
                                    {this.props.user.education_histories.length > 0 && this.props.user.education_histories.map( education_history => (
                                    <li><h3 class="line-title">{education_history.title} - {education_history.school}</h3>

                                        <span>{education_history.start_year} - {education_history.end_year ||  'Present'}</span>
                                        {education_history.description && <p class="little-text">{education_history.description}</p>}

                                    </li>
                                    )) || <li>No education histories found.</li> }
                                    
                                </ul>

                            </div>

                        </Row>
                    </TabPane>
                    <TabPane tab="Gallery" key="2">
                    {this.props.user && this.props.user.photos.length > 0 &&
                                    <Gallery 
                                    images={this.props.user.photos.map( photo =>( {src : `${Api.API_BASE_URL}${photo.photo}`, thumbnail : `${Api.API_BASE_URL}${photo.photo}`, thumbnailHeight: 3,}))} />
                                ||  <div>No photos are uploaded yet.</div>}
                    </TabPane>
                    <TabPane tab="Videos" key="3">
                        <Row gutter={[8, 8]}>
                                <div className='h3'>Videos ({this.props.user.videos.length})</div>
                                {this.props.user.videos.length > 0 && this.props.user.videos.map( video=> (
                                    <Col>
                                <ReactPlayer playIcon={<Icon style={{fontSize : 72, color:"red"}} theme="filled"  type="play-circle" />} light="https://www.geirangerfjord.no/upload/images/2018_general/film-and-vid.jpg" controls url={video.video} />
                                    </Col>
                                    
                                )) || 
                                <Col>
                                    <div>No videos are uploaded yet.</div>
                                </Col>
                                }
                            

                        </Row>
                    </TabPane>
                </Tabs>
                    
                </Col>
            
            </Row>
            </Col>
        )
    }

}