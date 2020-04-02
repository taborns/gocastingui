import React from 'react'
import { Spin, Icon } from 'antd'

export default  class Loading extends React.Component { 

    render() {
        return <div className='content-loading'>
            <Icon style={{ fontSize : 32, color : "red"}} type="loading" />
            </div>
    }
}