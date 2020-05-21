import React from 'react'; 
import { Row, Col, Icon } from 'antd';

class AgentWallet extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row >
        
            <Col>

                <div className='wallet-area'>

                        <div className='label h3'>Wallet  <Icon className='casting-icon' type="dollar" /> </div>

                        <div>Your current Balance <span className='wallet-balance'>{this.props.user.agent.balance} ETB</span></div>
                </div>
            </Col>
            </Row>
        )
    }
}

export default AgentWallet;