import React, { useState } from "react";
import Layout from "./../../components/layout/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "./../../components/ui/input/index";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signup } from './../../actions/user.actions';
import '../Signin/signin.scss'
/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error,seterror]=useState('')

  const dispatch=useDispatch()
  const userSignup =(e)=>{
      e.preventDefault();
    const user={
      firstName,lastName,email,password
    }
    dispatch(signup(user))
  }
  const auth = useSelector((state) => state.auth);
  const user= useSelector(state => state.user);
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  if(user.loading){
    return <p>Loading....!</p>
  }
  return (
    <Layout>
      <div className="container">
        <div className="signin_bc">
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    placeholder="first name"
                    label="first name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    type="text"
                    placeholder="last name"
                    label="last name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Col>
              </Row>
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

              <Button variant="primary" type="submit">
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

export default Signup;
