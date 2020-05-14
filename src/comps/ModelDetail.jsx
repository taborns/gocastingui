import React from 'react'; 
import {Row, Col, Tabs, Button, Icon, Spin, Modal} from 'antd';
import Gallery from 'react-grid-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Api from '../services/api';
import Loading from './Loading';
import ReactPlayer from 'react-player';

const { TabPane } = Tabs;

export default class ModelDetail extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            cast : null,
            loading : true
        }
    }


    getMatch = (id) => {
        this.setState({ loading : true})
        Api.getData(`casts/${id}`)
            .then( cast=>this.setState({cast, loading : false}), err=>this.setState({ loading : false}))
    }

    componentDidMount(){
        this.getMatch(this.props.match.params.id)
    }

    revealAdress = () => {
        Api.postData('cast.address.reveal', {cast : this.state.cast.user.id})
        .then( cast=>this.setState({cast}), err => {
            
            Modal.error({
                title: 'Task Failed.',
                content: (
                  <div>
                        {err}
                  </div>
                ),
                onOk() {},
              });

        } )
    }
    

    render() {
        console.log("detailprops", this.props)
         const images = [
            {
              src: 'http://kayapati.com/demos/lavan/wp-content/uploads/sites/157/2018/05/dancer-5-1.jpg',
              thumbnail: 'http://kayapati.com/demos/lavan/wp-content/uploads/sites/157/2018/05/dancer-5-1.jpg',
                thumbnailHeight: 200,
                caption: "After Rain (Jeshu John - designerspics.com)"
            }
          ];


          
        
        if ( this.state.loading)
          return (
            <Col xs={{ span : 24}} lg={{ span : 24}} className='wrapper-body'>
                <Loading />
            </Col>
          )
        return (
            <Col xs={{ span : 24}} lg={{ span : 24}} className='wrapper-body'>

            <Row>
            
                <Col xs={{ span : 24}} lg={{span : 6}}>
                    <div className='h2'>{this.state.cast.user.first_name} {this.state.cast.user.last_name}</div>
                    <div style={{textAlign : "center"}}>
                        <img style={{width : '90%'}} src={ `${Api.API_BASE_URL}/media/${this.state.cast.profile_picture}`} />
                    </div>
                    {this.state.cast.access_level && this.state.cast.access_level == "private" &&
                    <div className='social-media'>
                        <div  className='h6'> CONTACT INFO</div>
                        
                        {this.state.cast.phone && <div className='phone-number'>
                        <Icon className='casting-icon' type='phone' /> {this.state.cast.phone}
                        </div>}
                        
                        {this.state.cast.user.email && <div className='phone-number'>
                        <Icon className='casting-icon' type='mail' /> {this.state.cast.user.email}
                        </div>}

                        {this.state.cast.facebook && <a href={this.state.cast.facebook}><Icon type="facebook" /></a>}
                        {this.state.cast.instagram && <a href={this.state.cast.instagram}><Icon type="instagram" /></a>}
                        {this.state.cast.twitter &&<a href={this.state.cast.twitter}><Icon type="twitter" /></a>}
                    </div> || <div className='reveal-adress'>
                        <Button block size="large" onClick={this.revealAdress} type="danger"> <Icon type='eye' className='casting-icon'></Icon> View Contact</Button>
                    </div> }
                    <div style={{marginTop : 5}}>
                        <div className='h6'>DISCIPLINES</div>

                        {this.state.cast.intersted_in.map( interst => <span className='model-tag'>{interst.name}</span>)}
                        
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
                            <tr> <th>Age </th><td>{this.state.cast.age}</td></tr>
                            <tr> <th>Height </th><td>{this.state.cast.height} M</td></tr>
                            <tr> <th>Weight </th><td>{this.state.cast.weight} KG</td></tr>
                            <tr> <th>Gender </th><td>{this.state.cast.gender}</td></tr>
                            <tr> 
                                <th>Languages Known </th>
                                <td>{ this.state.cast.languages.map( language => <span>{language.name}, </span>)}</td>
                            </tr>
                            
                            <tr> 
                                <th>Additional Skills </th>
                                <td> { this.state.cast.additional_skills.map( additional_skill => <span>{additional_skill.name}, </span>)}</td>
                            </tr>

                            <tr> <th>Address </th><td>{this.state.cast.city.name}, {this.state.cast.region.name}</td></tr>
                            {/* <tr> <th>Mobile Number </th><td>{this.state.cast.phone}</td></tr> */}


                        </table>
                        </Row>

                        
                        <Row>
                        
                            <div class="section-title">
                                <span></span>
                                <ul class="timeline col-md-12 top_45">
                                    <li> <Icon type="sketch-circle" theme="filled" className='casting-icon' /> <h2 class="timeline-title">Working History</h2></li>
                                    {this.state.cast.user.work_histories.length > 0 && this.state.cast.user.work_histories.map( work_history => (
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
                                    
                                    {this.state.cast.user.education_histories.length > 0 && this.state.cast.user.education_histories.map( education_history => (
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
                    {this.state.cast.user.photos.length > 0 &&
                    <Gallery 
                        images={this.state.cast.user.photos.map( photo =>( {src : `${Api.API_BASE_URL}${photo.photo}`, thumbnail : `${Api.API_BASE_URL}${photo.photo}`, thumbnailHeight: 3,}))} />
                    ||  <div>No photos are uploaded yet.</div>}
                    </TabPane>
                    <TabPane tab="Videos" key="3">
                        <Row gutter={[8, 8]}>
                            
                        <div className='h3'>Videos ({this.state.cast.user.videos.length})</div>
                        
                        {this.state.cast.user.videos.length > 0 && this.state.cast.user.videos.map( video=> (
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