import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Api from '../services/api';

export default class ModelCard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let cast = this.props.cast
        return (
            <div className='my-card'>
                
                <div>
                <img className='cast-profile-pic' src={ `${Api.API_BASE_URL}/media/${cast.profile_picture}`} />
                
                <div className='model-name'><Link to={`/detail/${cast.id}/`}>{cast.user.first_name} {cast.user.last_name}</Link></div>
                
                </div>

                

            </div>
        );
    }
}