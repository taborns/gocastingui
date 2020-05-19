import React from 'react';
import { Form, Input, Icon, Col, Row, Alert } from 'antd';
import Api from '../services/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
    
        super(props)
    
        this.state = {
            error : '',
            loading : false
        }
    
    }
        
  handleSubmit = e => {
    this.setState({
      loading : true
    })

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.login(values)
          .then( (response)=>{ 
            this.props.getLoggedInUser()
            this.props.history.push('/')
            this.setState({suc : 'You have succefully logged in.', loading : true,  err : null })
          } , (respo) => this.setState({ error : "Invalid username/password.", loading : false, suc : null }) )

      }
    });
  };

    componentDidMount(){
        if( this.props.user)
            this.props.history.push('/')
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
        <Row gutter={[10,10]}>
            
            <Col lg={{ span : 10, offset : 7 }}>
                <div className='casting-login-wrapper'>
                    <div>
                        <img style={{ width : '100%'}} src='/loginbanner.jpg' />
                    </div>

                    <div className='login-area'>
                    <div className='label h3'>Login <Icon className='casting-icon' type="user" /> </div>
                    <div className='login-reg-note'>New member? Please <Link style={{fontWeight : "bolder"}} to='/register'>Create an Account</Link></div>
                    {this.state.error && <div>
                            <Alert message={this.state.error}                                
                                type="error"
                                showIcon
                            /></div>}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    
                        <Form.Item>
                            {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email or Phone"
                            />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                            )}
                        </Form.Item>
                        
                        <Form.Item>
                            
                            <Button size='large' block  loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                            Log in <Icon className='casting-icon' type="login" />
                            </Button>
                        
                        </Form.Item>

                    </Form>
                    </div>
                </div>
            </Col>

        </Row>
        )
    }
}

const Login = Form.create({ name: 'normal_login' })(LoginPage);

export default Login