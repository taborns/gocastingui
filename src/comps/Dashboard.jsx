import React from 'react';
import { Form, Input, Icon, Col, Row, Select, InputNumber, Upload, DatePicker, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import * as Scroll from 'react-scroll';
import DashboardCast from './DashboardCast';
import DashboardAgent from './DashboardAgent';

var scroll     = Scroll.animateScroll;

export default class Dashboard extends React.Component {

    render() {
        return (
            this.props.user && this.props.user.cast && 
        <div><DashboardCast {...this.props} /></div>  || 
        <div>
            < DashboardAgent {...this.props} />
        </div>
        )
    }
}