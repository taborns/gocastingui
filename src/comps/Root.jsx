import React from 'react'
import Header from './Header';
import MainWrapper from './MainWrapper';
import Api from '../services/api';
import * as Scroll from 'react-scroll';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ClientSession from '../services/client-session';
import BooKModel from './BookModel';
import Jobs from './Jobs';
var scroll     = Scroll.animateScroll;

export default class Root extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jobs : [],
            jobs_count : [],
            jobs_loading : true,
            jobs_current : 1,


            casts : [],
            casts_count : [],
            casts_loading : true,
            casts_current : 1,

            searched_casts : [],
            searched_casts_count : [],
            searched_casts_loading : true,
            searched_casts_current : 1,

            attributedatas : [],
            searchData :  {
                name : '',
                age : [0,150],
                gender : "all",
                height : [1,3.0], 
                weight : [20,300],
                discipline : -1
            },

            user : null

        }
    }

    getAttributeData = () => {
        console.log("WHAT IS HAPPENIG BABYGIRL")
        Api.getData('attributedatas')
            .then( attributedatas => this.setState({attributedatas}))
    }

    getLoggedInUser = (callback) => {
        Api.getData('user.info')
            .then( user =>{ 
                
                callback && callback(user)
                this.setState({ user })
            })
    }

    setsearchGlobalState = (name, value) => {
        this.state.searchData[name] = value

        this.setState( prevstate=> {
            prevstate.searchData[name] = value
            return prevstate.searchData
        })
    }

    paginateScroll = () => {
        scroll.scrollToTop()
    }

    paginate = (page) => {
        this.getcasts(page)
        this.paginateScroll()
    }

    jobPaginate = (page) => {
        this.getjobs(page)
        this.paginateScroll()
    }

    paginateSearch = (page) => {
        this.searchCasts(page)
        this.paginateScroll()
    }

    getjobs = (page) => {
        if( !page)
            page = 1
        
        this.setState({ jobs_loading : true})

        Api.getData('jobs', `?page=${page}`)
        .then( 
            response => this.setState({ jobs : response.results, jobs_count : response.count, jobs_loading : false, jobs_current : page }), 
            err => this.setState({ jobs_loading : false})
        )
    }

    getcasts = (page) => {
        
        if ( !page )
            page = 1

        this.setState({ casts_loading : true})

        Api.getData(`casts`, `?page=${page}`)
            .then(
                casts => this.setState({casts : casts.results, casts_count : casts.count, casts_loading: false, casts_current : page}),
                err => this.setState({ casts_loading : false})
            )
    }

    searchCasts = (page)=>{

        if ( !page )
            page = 1

        Api.postData(`casts.search`, this.state.searchData, `?page=${page}`)
            .then(searched_casts=> this.setState({searched_casts : searched_casts.results, searched_casts_count : searched_casts.count, searched_casts_loading: false, searched_casts_current : page}) )
    }

    logout = () => {

        this.setState({user : null }) 
        ClientSession.logout()        
        Api.getData('logout')
    }
    componentDidMount() {
        this.getjobs()
        this.getcasts()
        this.getAttributeData() 
        this.getLoggedInUser()
    }

    render() {
        console.log("History props", this.props)
        return (
            <div>
            <Header logout={this.logout} {...this.props} user={this.state.user} />
            <Switch>
            <Route path='/login/' render={props=><Login user={this.state.user} getLoggedInUser={this.getLoggedInUser} {...props} />} />
            <Route path='/register/' render={props=><Register {...props} user={this.state.user} attributedatas={this.state.attributedatas} />} />
            <Route path='/book-model/' render={props=><BooKModel {...props} user={this.state.user} attributedatas={this.state.attributedatas} />} />
            <Route path='/'>
                <MainWrapper 
                    {...this.props} 
                    {...this.state}
                    getLoggedInUser = {this.getLoggedInUser}
                    setsearchGlobalState={this.setsearchGlobalState}
                    searchCasts={this.searchCasts}
                    paginateSearch={this.paginateSearch}
                    paginate={this.paginate}
                />
            </Route>
            </Switch>
            
            </div>
        )
    }
}