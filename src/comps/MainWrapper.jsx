import React from 'react'
import {Row, Icon, Col} from 'antd';
import ModelDetail from './ModelDetail';
import ModelListWrapper from './ModelListWrapper';
import {
    Switch,
    Route,
  } from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import ModelProfile from './ModelProfile';
import JobCreateForm from './JobCreateForm';
import Jobs from './Jobs';
import JobDetail from './JobDetail';
import MyJobs from './MyJobs';
import JobEdit from './JobEdit';
  
export default class MainWrapper extends React.Component {

    constructor(props) { 
        super(props)
    }

    render() {
        return ( 
            <Row className='main-wrapper'>
                
                <Switch>
                    

                    <Route path='/detail/:id/' render={(props) => <ModelDetail {...props} /> } />
                    <Route path='/profile/' render={(props) => <ModelProfile user={this.props.user} /> } />
                    <Route path='/settings/' render={props=><Dashboard {...this.props} attributedatas={this.props.attributedatas} user={this.props.user} {...props} />} />
                    <Route path='/create-job/' render={props=><JobCreateForm {...this.props} attributedatas={this.props.attributedatas} user={this.props.user} {...props} />} />
                    <Route path='/jobs/:id/' render={props=><JobDetail {...props} user={this.props.user} attributedatas={this.props.attributedatas} {...this.props} />} />
                    <Route path='/jobs/' render={props=><Jobs 
                                                                {...props} 
                                                                jobSearch={this.props.jobSearch}
                                                                user={this.props.user} 
                                                                attributedatas={this.props.attributedatas} 
                                                                jobs={this.props.jobs} 
                                                                jobs_loading={this.props.jobs_loading} 
                                                                jobs_current={this.props.jobs_current}
                                                                jobs_count = {this.props.jobs_count} 
                                                                />} />

                    <Route path='/search-jobs/' render={props=><Jobs
                                                                    {...props} 
                                                                    jobSearch={this.props.jobSearch}
                                                                    user={this.props.user} 
                                                                    attributedatas={this.props.attributedatas} 
                                                                    jobs={this.props.searched_jobs} 
                                                                    jobs_loading={this.props.searched_jobs_loading} 
                                                                    jobs_current={this.props.searched_jobs_current}
                                                                    jobs_count = {this.props.searched_jobs_count} 

                                                                    />} />
                    <Route path='/myjobs/:id/' render={props=><JobEdit {...this.props} {...props} user={this.props.user} attributedatas={this.props.attributedatas} {...this.props} />} />

                    <Route path='/myjobs/' render={props=><MyJobs
                                                                    {...props}
                                                                    {...this.props} 
                                                                    user={this.props.user} 
                                                                    attributedatas={this.props.attributedatas} 

                                                                    />} />


                    <Route path='/search/' render={(props) =>  <ModelListWrapper 
                                                                            {...props} 
                                                                            searchData={this.props.searchData}
                                                                            attributedatas = {this.props.attributedatas}
                                                                            setsearchGlobalState={this.props.setsearchGlobalState}
                                                                            searchCasts={this.props.searchCasts} 
                                                                            casts_loading ={this.props.searched_casts_loading} 
                                                                            casts_count={this.props.searched_casts_count} 
                                                                            casts={this.props.searched_casts} 
                                                                            paginate={this.props.paginateSearch} 
                                                                            casts_current={this.props.searched_casts_current} 
                                                                            />}
                    />
                    
                    <Route path='/' render={(props) =>  <ModelListWrapper 
                                                                        {...props} 
                                                                        attributedatas = {this.props.attributedatas}
                                                                        setsearchGlobalState={this.props.setsearchGlobalState}
                                                                        casts_loading ={this.props.casts_loading} 
                                                                        casts_count={this.props.casts_count}
                                                                        searchCasts={this.props.searchCasts} 
                                                                        casts={this.props.casts}  
                                                                        paginate={this.props.paginate}
                                                                        casts_current={this.props.casts_current} />}
                    />

                </Switch>
           
            </Row>
        )
    }
}