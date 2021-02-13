import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from './../../actions/auth.actions';
import './header.scss'
/**
 * @author
 * @function Header
 **/

const Header = () => {

  const auth= useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const logout =()=>{
        dispatch(signout())
  }
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span style={{cursor:'pointer'}} onClick={logout} className="nav-link">Signout</span>
        </li>
        <li  className="nav-link link_navv">   <NavLink style={{color:"white"}}  exact to={'/'}>Home</NavLink> </li>
          <li className="nav-link link_navv">  <NavLink style={{color:"white"}} to={'/page'}>Page</NavLink> </li>
          <li className="nav-link link_navv">   <NavLink style={{color:"white"}}  to={'/products'}>products</NavLink></li>
          <li className="nav-link link_navv">   <NavLink style={{color:"white"}} to={'/orders'}>orders</NavLink></li>
          <li className="nav-link link_navv">   <NavLink style={{color:"white"}} to={'/category'}>category</NavLink></li>
      </Nav>
    );
  };
  const renderNotLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      style={{ zIndex: 1 }}
      collapseOnSelect
      fixed="top"
      expand="lg"
      className="header"
      variant="dark"
    >
      <Container fluid>
        <Link className="navbar-brand" to="/">
          {" "}
          Admin dashbord{" "}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
          </Nav>

          {auth.authenticate?renderLoggedInLinks():renderNotLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
