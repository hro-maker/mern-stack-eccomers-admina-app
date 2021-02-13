import React, { useState } from "react";
import Layout from "../../components/layout/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/ui/input/index";
import { login } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import './signin.scss'
/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const auth = useSelector((state) => state.auth);
  // const [error,seterror]=useState('')
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
    setemail("");
    setpassword("");
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
     
      <div className="container ">
  
      <div className="signin_bc">
        
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form  className="formaa" onSubmit={userLogin}>
              <Input
                type="email"
                placeholder="email"
                label="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="password"
                label="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />

              <Button className="signin-btn" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        </div>
        </div>
         
    </Layout>
    
  
  
  );
};

export default Signin;
