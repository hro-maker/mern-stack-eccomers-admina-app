import React from "react";
import Layout from "../../components/layout";
import Modall from "../../components/ui/input/modal";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Input from "../../components/ui/input";
import { useEffect } from "react";
import linerCategories from "./../../helpers/linerCategories";
import { useSelector } from "react-redux";
import Gun from "./1.mp3";
import { createPage } from "./../../actions/page.action";
import { useDispatch } from "react-redux";
import { Howl, Howler } from "howler";
import "./page.scss";
import Loader from "./../../components/loader/Loader";

/**
 * @author
 * @function NewPage
 **/

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, settitle] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setbanners] = useState([]);
  const [products, setProducts] = useState([]);
  const page = useSelector((state) => state.page);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    setcategories(linerCategories(category.categories));
  }, [category]);
  useEffect(() => {
    if (page.loading) {
      return <div>loading........</div>;
    }
  }, [page]);
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
  const handlebannersImages = (e) => {
    console.log(e);
    setbanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    console.log(e.target.value);
    setProducts([...products, e.target.files[0]]);
  };
  const submitPageForm = (e) => {
    e.preventDefault();
    if (title === "") {
      setCreateModal(false);
      alert("Title is reqired");

      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
    setCreateModal(false);
  };
  const onCategorychenge = (e) => {
    const category = categories.find(
      (categor) => categor._id == e.target.value
    );
    setcategoryId(e.target.value);
    setType(category.type);
  };
  const renderCreatePageModal = () => {
    return (
      <Modall
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={submitPageForm}
        handleClosee={() => setCreateModal(false)}
        size="lg"
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategorychenge}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder={"Page Title"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Description"}
              />
            </Col>
          </Row>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <input
                className="form-control "
                type="file"
                name="banners"
                onChange={handlebannersImages}
              />
            </Col>
          </Row>
          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <input
                className="form-control "
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modall>
    );
  };
  const modalcoll = () => {
    Soundplay(audio.sound);
    setCreateModal(true);
  };
  if (page.loading) {
    return (
      <div>
        <Layout sidebar>
          <Loader />
        </Layout>
      </div>
    );
  }
  return (
    <Layout sidebar>
      <button className="create_page_btn" onClick={modalcoll}>
        {" "}
        Create Page
      </button>
      {renderCreatePageModal()}
    </Layout>
  );
};

export default NewPage;
