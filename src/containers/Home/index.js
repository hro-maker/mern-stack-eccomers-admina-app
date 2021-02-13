import React from "react";
import Layout from "./../../components/layout/index";
import './style.scss'
import { Link } from 'react-router-dom';

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const user= JSON.parse(localStorage.getItem('user'))
  console.log(user)
  return (
    <Layout>
          <div className="disp_fl">
            <div>
            You are logged in how <span>{user.fullName}</span>
            </div>
          
           <Link to="/page">
           <button className="edit_btn" >create Page</button>
           </Link> 
           <Link to="/products">
           <button className="add_cat">products</button>
           </Link>
           <Link to="/orders">
           <button className="edit_btn">Orders</button>
           </Link>
           <Link to="/category">
           <button className="delete_btn">Categories</button>
           </Link>
          </div>
    </Layout>
  );
};

export default Home;
