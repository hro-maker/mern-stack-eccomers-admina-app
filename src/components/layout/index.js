import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Header";
import { NavLink } from 'react-router-dom';
import Gun from './4.mp3'
import { Howl, Howler } from "howler";
import './style.scss'
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  const audio = {
    sound: Gun,
  };
  const Soundplay = (src) => {
    const sound = new Howl({
      src,
    });
    sound.play();
  };
  Howler.volume(0.4);
  return (
    <div className="layouut">
      <Header />
      {
        props.sidebar ?
        <Container fluid>
      <Row>
        <Col className="sidebar" md={2}>
          <ul>
           
          <li>  <NavLink onClick={()=>Soundplay(audio.sound)} exact to={'/'}>Home</NavLink> </li>
          <li>  <NavLink onClick={()=>Soundplay(audio.sound)} to={'/page'}>Page</NavLink> </li>
          <li>   <NavLink onClick={()=>Soundplay(audio.sound)} to={'/products'}>products</NavLink></li>
          <li>   <NavLink onClick={()=>Soundplay(audio.sound)} to={'/orders'}>orders</NavLink></li>
          <li>   <NavLink onClick={()=>Soundplay(audio.sound)} to={'/category'}>category</NavLink></li>
          </ul>

        </Col>
        <Col md={10} style={{marginLeft:'auto',paddingTop:'60px'}} > {props.children}</Col>
      </Row>
      </Container>
      : props.children
      
      }
     
    </div>
  );
};

export default Layout;
