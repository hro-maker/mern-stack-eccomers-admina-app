import axios from './../helpers/axios';
import { productConstans } from './constans';

const getProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: productConstans.GET_ALL_Products_REQUEST });
        const res = await axios.post(`product/getProducts`);
        if (res.status === 200) {
          const { products } = res.data;
          dispatch({
            type: productConstans.GET_ALL_Products_SUCCES,
            payload: { products },
          });
        } else {
          dispatch({ type: productConstans.GET_ALL_Products_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  
  export const addProduct = (form) => {
    return async (dispatch) => {
      console.log("formmmmmmmmmmmmmmmmmmmmmmm",form)
      try {
        dispatch({ type: productConstans.ADD_PRODUCT_REQUEST });
        const res = await axios.post(`product/create`, form);
        if (res.status === 201) {
          dispatch({ type: productConstans.ADD_PRODUCT_SUCCESS });
          dispatch(getProducts());
        } else {
          dispatch({ type: productConstans.ADD_PRODUCT_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
 
  export const deleteProductById = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`product/deleteProductById`, {
          data: { payload },
        });
        dispatch({ type: productConstans.DELETE_PRODUCT_BY_ID_REQUEST });
        if (res.status === 202) {
          dispatch({ type: productConstans.DELETE_PRODUCT_BY_ID_SUCCESS });
          dispatch(getProducts());
        } else {
          const { error } = res.data;
          dispatch({
            type: productConstans.DELETE_PRODUCT_BY_ID_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };