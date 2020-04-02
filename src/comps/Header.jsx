import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
  
import {Icon, Menu, Dropdown} from 'antd';
import { Link } from 'react-router-dom';

const menu = (props)=>(
  <Menu>
    <Menu.Item key="1">
      <Link to='/dashboard/'>
        <Icon className='casting-icon' type="dashboard" /> Dashboard
      </Link>

    </Menu.Item>

    <Menu.Divider/>
    <Menu.Item key="1">
      
      <Link onClick={()=>props.logout()}>
        <Icon className='casting-icon' type="user" /> Logout
      </Link>

    </Menu.Item>

    
  </Menu>
);

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className='casting-header' color="dark" light expand="md">
        <NavbarBrand><Link to='/'><img style={{ height: '50px'}} src='/white.png' /></Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        
        <Collapse isOpen={isOpen} navbar>
          
          {!props.user && 
            (<Nav className="mr-auto" navbar>
              <NavItem>
                <Link className='header-link' to='/'><Icon className='casting-icon' type="home" /> Home</Link>
              </NavItem>
              
              <NavItem>
                <Link className='header-link' to='/register/'><Icon className='casting-icon' type="user-add" /> Become A Model</Link>
              </NavItem>
              <NavItem>
                
                <Link className='header-link' to='/book-model/'><Icon className='casting-icon' type="book" /> Book Models</Link>
              </NavItem>

              <NavItem>
                <Link className='header-link' to='/login/'><Icon className='casting-icon' type="login" /> Login</Link>
              </NavItem>

            </Nav>) 
          || 
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className='header-link' to='/'><Icon className='casting-icon' type="home" /> Home</Link>
            </NavItem>
            

          </Nav>
          }

          {props.user && 
          <NavItem style={{ listStyle : "none"}}>

          <Dropdown placement="bottomLeft" overlay={menu(props)}>
            <Button className='casting-user-logged' color="danger">
            <Icon className='casting-icon' type='user'></Icon>{props.user.first_name} {props.user.last_name}  
            <Icon className='casting-icon' type='down'></Icon>
            </Button>
          </Dropdown>

          </NavItem>}

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header; 