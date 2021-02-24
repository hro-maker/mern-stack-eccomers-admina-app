import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { addCategory } from "./../../actions";
import { useSelector } from "react-redux";
import { useState } from "react";
import Input from "../../components/ui/input";
import Modall from "./../../components/ui/input/modal/index";
import CheckboxTree from "react-checkbox-tree";
import './category.scss'
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosTrash,
  IoIosSettings,
  IoIosAdd,
  
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { updateCategories,deleteCategories as deleteCategoriesaction } from './../../actions/category.action';

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [parentCategoryid, setParentCategoryid] = useState("");
  const [show, setShow] = useState(false);
  const [expanded, setExpendet] = useState([]);
  const [checktArray, setChecktArray] = useState([]);
  const [expandetArray, setExpandetArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [checked, setChecket] = useState([]);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryid);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryid("");

    setShow(false);
  };
  const handleClosee = () => setShow(false);
  const handleShow = () => setShow(true);
  const renderCategories = (categoryes) => {
    let categories = [];
    for (let category of categoryes) {
      categories.push({
        className:"hi",
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type:category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const hendlCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateChektendExpandedCategories()
    setUpdateCategoryModal(true);
    };

    const updateChektendExpandedCategories = ()=>{
      const categories = createCategoryList(category.categories);
      const chektArry = [];
      const expandetArry = [];
      checked.length > 0 &&
        checked.forEach((categoryId, index) => {
          const category = categories.find(
            (category, i) => categoryId == category.value
          );
          category && chektArry.push(category);
        });
      expanded.length > 0 &&
        expanded.forEach((categoryId, index) => {
          const category = categories.find(
            (category, i) => categoryId == category.value
          );
          category && expandetArry.push(category);
        });
        setChecktArray(chektArry)
        setExpandetArray(expandetArry)
     
    }

  const handleCategoryInput=(key,value,index,type)=>{
    if(type == "checked"){
      const updatedchektArray= checktArray.map((item,_index)=> index == _index ? {...item,[key]:value} : item)
        setChecktArray(updatedchektArray)
    }else if(type==="expanded"){
      const updatedexpandetArray= expandetArray.map((item,_index)=> index == _index ? {...item,[key]:value} : item)
      setExpandetArray(updatedexpandetArray)
    }
  }
  const updateCategoriesForm = () =>{
      const form = new FormData()

      expandetArray.forEach((item,index)=>{
          form.append('_id',item.value)
          form.append('name',item.name)
          form.append('parentId',item.parentId ? item.parentId : "")
          form.append('type',item.type)
        })
      checktArray.forEach((item,index)=>{
        form.append('_id',item.value)
        form.append('name',item.name)
        form.append('parentId',item.parentId ? item.parentId : "")
        form.append('type',item.type)
      })
    dispatch(updateCategories(form))
   
    setUpdateCategoryModal(false)
  }
  

  const renderUpdatetCategoriesModal = ()=>{
    console.log({expandetArray,checktArray})
    return (
      <Modall
      show={updateCategoryModal}
      modalTitle={"Update Categories"}
      handleClose={updateCategoriesForm}
      handleClosee={() => setUpdateCategoryModal(false)}
      size="lg"
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandetArray.length > 0 &&
        expandetArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Category name"}
                onChange={(e)=>handleCategoryInput('name',e.target.value,index,"expanded")}
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control select_order"
                onChange={(e)=>handleCategoryInput('parentId',e.target.value,index,"expanded")}
              >
                <option>select category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select 
              className="form-control select_order"
              value={item.type}
              onChange={(e)=>handleCategoryInput('type',e.target.value,index,"expanded")}
              >
                <option value=""> Select Type</option>
                <option value="store"> Store</option>
                <option value="product"> Product</option>
                <option value="page"> Page</option>
              </select>
            </Col>
          </Row>
        ))}
        <h6>Checkt Categoriess</h6>
          {checktArray.length > 0 &&
            checktArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Category name"}
                onChange={(e)=>handleCategoryInput('name',e.target.value,index,"checked")}
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control select_order"
                onChange={(e)=>handleCategoryInput('parentId',e.target.value,index,"checked")}
              >
                <option>select category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
              className="form-control select_order"
              onChange={(e)=>handleCategoryInput('type',e.target.value,index,"checked")}
               value={item.type}
               >
                <option value=""> Select Type</option>
                <option value="store"> Store</option>
                <option value="product"> Product</option>
                <option value="page"> Page</option>
              </select>
            </Col>
          </Row>
        ))}
      {/* <input type="file" name="categoryImage" onChange={hendlCategoryImage} /> */}
    </Modall>

    )
  }
  const renderAddcategory = ()=>{
    return(
      <Modall
        show={show}
        modalTitle={"Add new category"}
        handleClose={handleClose}
        handleClosee={handleClosee}
      >
        <Input
          value={categoryName}
          placeholder={"Category name"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          value={parentCategoryid}
          className="form-control select_order"
          onChange={(e) => setParentCategoryid(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input type="file" name="categoryImage" onChange={hendlCategoryImage} />
      </Modall>
     
    )
  }
  const deleteCategory =() =>{
    updateChektendExpandedCategories()
        setDeleteCategoryModal(true)
  }
  const deleteCategories =()=>{
     const chektIdsarray=  checktArray.map((item,index)=>({_id:item.value}))
    //  const expandedidsArray=  expandetArray.map((item,index)=>({_id:item.value}))
    //  const idsArray =expandedidsArray.concat(chektIdsarray)
        if(chektIdsarray.length > 0){
          dispatch(deleteCategoriesaction(chektIdsarray))
          .then(res =>{
            if(res){
          
             setDeleteCategoryModal(false)
            }
          })
        }
        setDeleteCategoryModal(false)
  }
  const renderDeleteCategoryModal = () =>{
    return (
      <Modall
      show={deleteCategoryModal}
      modalTitle={"Conform"}
      handleClosee={() => setDeleteCategoryModal(false)}
      buttons={[
        {
          label:'no',
          color:'primary',
          onClick: () =>{
            alert('no')
          }
        },
        {
          label:'Yes',
          color:'danger',
          onClick: deleteCategories
        }
      ]}
      >
        <h5>Expanded</h5>
        {expandetArray.map((item,index)=> <span className="delete_text" key={index}>{item.name}</span> )}
        <h5>Checked</h5>
        {checktArray.map((item,index)=> <span className="delete_text" key={index}>{item.name}</span> )}
      </Modall>
    )
}

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button className="add_cat" onClick={handleShow}> <IoIosAdd className="add_icon"/> Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="btn-wraper btn-wraper_cat">
          <div className="actions">actions :</div>
            <button className="delete_btn" onClick={deleteCategory} > <IoIosTrash className="delete_trash"/> Delete</button>
            <button className="edit_btn" onClick={updateCategory}> <IoIosSettings className='edit_icon' /> Edit</button>
          </Col>
        </Row>
        <Row className="chek">
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree 
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecket(checked)}
              onExpand={(expanded) => setExpendet(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
       
      </Container>
     
       {renderDeleteCategoryModal()}
       {renderAddcategory()}
      {
        renderUpdatetCategoriesModal()
      }
      </Layout>
  );
};

export default Category;
