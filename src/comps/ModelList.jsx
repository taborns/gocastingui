import React from 'react';
import {Row, Col, Pagination, Spin} from 'antd';
import ModelCard from './ModelCard';
import { Button } from 'reactstrap';
import Loading from './Loading';

export default class ModelList extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        if( this.props.casts_loading) 
            return <Loading />
            
        return (
            <div className='models-list'>
            {this.props.searchData && 
                <Row gutter={[16, 16]}>
                    <Col xs={{span : 24}} >
                    {this.props.searchData.gender && <span className='search-filter-tag'>Gender : {this.props.searchData.gender}</span>}
                    {this.props.searchData.age && this.props.searchData.age.length >0 && <span className='search-filter-tag'>Age : {`${this.props.searchData.age[0]} - ${this.props.searchData.age[1]}` }</span>}
                    {this.props.searchData.age && this.props.searchData.age.length >0 && <span className='search-filter-tag'>Height : {`${this.props.searchData.height[0]}M - ${this.props.searchData.height[1]}M` }</span>}
                    {this.props.searchData.age && this.props.searchData.age.length >0 && <span className='search-filter-tag'>Weight : {`${this.props.searchData.weight[0]} - ${this.props.searchData.weight[1]}` }</span>}
                    </Col>
                </Row>
                }
                
            <Row gutter={[16, 16]}>
            {this.props.casts.map( cast => (

                <Col xs={{span : 24}} lg={{span : 8}} sm={{ span : 12}} >
                    <ModelCard cast={cast} />
                </Col>

            ))}
            
            </Row>
            <Row gutter={[16, 16]}>
                
                <Col xs={{span : 24}} >
                <Pagination onChange={this.props.paginate} pageSize={18} current={this.props.casts_current} defaultCurrent={1} total={this.props.casts_count} />
                </Col>

            </Row>
            </div>
        )
    }
}