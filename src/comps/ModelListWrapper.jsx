import React from 'react';
import ModelFilter from './ModelFilter';
import ModelList from './ModelList';
import {Row, Icon, Col} from 'antd';


export default class ModelListWrapper extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Col xs={{ span : 24 }} lg={{ span : 6}}>
                    <ModelFilter {...this.props} searched_casts={this.searched_casts}/>
                </Col>

                <Col xs={{ span : 24}} lg={{ span : 18}} className='wrapper-body'>
                    
                    <ModelList {...this.props} />
                </Col>
            </div>
        );
    }
}