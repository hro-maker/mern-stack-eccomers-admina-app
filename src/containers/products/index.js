import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "./../../components/ui/input/index";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct,deleteProductById } from "./../../actions/product.action";
import {  TiInfoLarge } from "react-icons/ti";
import { IoArchive } from "react-icons/io5";
import Modall from "../../components/ui/input/modal";
import Gun from './2.mp3'
import './style.scss'
import { generatepublicurl } from "../../urlConfig";
import { IoIosAdd } from "react-icons/io";
import { Howl, Howler } from 'howler';
/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [categoryid, setcategoryid] = useState("");
  const [productPictures, setproductPictures] = useState([]);
  const category = useSelector((state) => state.category);
  const [productshow, setproductShow] = useState(false);
  const [productdetail, setproductdetail] = useState(null);
  const product =useSelector(state=>state.product)
  const dispatch = useDispatch();
  const audio={
    sound : Gun
}
const Soundplay = src =>{
    const sound= new Howl({
        src
    })
    sound.play()
}
Howler.volume(1.0)


  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("category", categoryid);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    console.log(form);
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleClosee = () => setShow(false);
  const handleShow = () => setShow(true);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setproductPictures([...productPictures, e.target.files[0]]);
  };
  console.log(categoryid);
  // console.log(productPictures)
  const detaill =(pro)=>{
    Soundplay(audio.sound)
    showproductDetailModal(pro)
  }
 
  const renderProducts=()=>{
    return(
      <Table className="product-text" style={{fontSize:15}} >
              <thead>
                <tr className="list_header">
                  <th>#</th>
                  <th>Name</th>
                  <th className="for_nonn">Price</th>
                  <th className="for_nonn">Quantity</th>
                  <th className="for_nonn">Category</th>
                  <th style={{color:"white",fontSize:"20px",paddingLeft:"40px",textTransform:"uppercase"}}>actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.products.length>0 ?
                   product.products.map((pro,i) => 
                    <tr   key={pro._id}>
                    <td>{i+1}</td>
                    <td >{pro.name}</td>     
                    <td className="for_nonn">{pro.price}</td>
                    <td className="for_nonn">{pro.quantity}</td>
                    <td className="for_nonn">{pro.category.name}</td>
                    <td>
                    <button
                    style={{
                      marginRight:"10px",
                      
                    }}
                    className="edit_btn"
                    onClick={()=>detaill(pro)}>
                    < TiInfoLarge style={{color:"white"}}/>  info
                    </button>
                    <button

                      className="delete_btn for_nonn"
                      onClick={() => {
                        const payload = {
                          productId: pro._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                     <IoArchive/> del
                    </button>
                  </td>
                  </tr>   
                   ): <tr><td>you dont have any product</td></tr>
                  }
                 
               
              </tbody>
            </Table>
      
    )
  }
  const renderAddProducts=()=>{
    return (
      <Modall
      handleClose={handleClose}
      handleClosee={handleClosee}
      modalTitle={"Add New Category"}
      show={show}
    >
      <Input
        label="Name"
        value={name}
        placeholder={"pruduct name"}
        onChange={(e) => setname(e.target.value)}
      />
      <Input
        label="Quantity"
        value={quantity}
        placeholder={"quantity"}
        onChange={(e) => setquantity(e.target.value)}
      />
      <Input
        label="price"
        value={price}
        placeholder={"price"}
        onChange={(e) => setprice(e.target.value)}
      />
      <Input
        label="decsription"
        value={description}
        placeholder={"description"}
        onChange={(e) => setdescription(e.target.value)}
      />
      <select
        value={categoryid}
        className="form-control"
        onChange={(e) => setcategoryid(e.target.value)}
      >
        <option>select category</option>
        {createCategoryList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {productPictures.length > 0
        ? productPictures.map((pic, i) => <div key={i}>{pic.name}</div>)
        : null}

      <input
        type="file"
        name="productPicture"
        onChange={handleProductPictures}
      />
    </Modall>

    )
  }

  const handleCloseProductDetails=()=>{
    setproductShow(false)
  }
  const showproductDetailModal=(product)=>{
  
    setproductdetail(product)
    setproductShow(true)
  }
  const renderProductDetailModal=()=>{
    if(!productdetail){
      return null
    }

    return(
      <Modall
      handleClosee={handleCloseProductDetails}
      modalTitle={"Product details"}
      show={productshow}
      size='lg'
      btncl={true}
    >
        <Row className="detail__text">
          <Col md='6'>
            <label className='key' >Name</label>
            <p className='value' >{productdetail.name}</p>
          </Col>
          <Col md='6'>
            <label className='key' >Price</label>
            <p className='value' >{productdetail.price}</p>
          </Col>
        </Row>
        <Row className="detail__text">
          <Col md='6'>
            <label className='key' >Quantity</label>
            <p className='value' >{productdetail.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key' >Category</label>
            <p className='value' >{productdetail.category.name}</p>
          </Col>
        </Row>
        <Row className="detail__text">
          <Col md='12'>
            <label className='key' >Description</label>
            <p className='value' >{productdetail.description}</p>
          </Col>
        </Row>
        <Row>
          
          <Col>
          <label>Product Pictures</label>
          <div style={{display:'flex'}}>
          {productdetail.productPictures.map(picture =>
              <div key={picture._id} className="productImageContainer">
                <img className="product_detail_img" src={picture.img} alt={`${picture._id}`}/>
              </div>
              )}
          </div>
            
             </Col>
        </Row>

    </Modall>
    )
  }

  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button className="add_product" onClick={handleShow}> <IoIosAdd className="add_icon"/> Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          {renderProducts()}
                </Col>
        </Row>
      </Container>
      {renderAddProducts()}
      {renderProductDetailModal()}
       </Layout>
  );
};

export default Products;
