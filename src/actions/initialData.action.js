import { categoryConstans, productConstans ,orderConstants,adressConstants} from "./constans";
import axioss from "./../helpers/axios";

export const getinitialData = () => {
  return async (dispatch) => {
    const res = await axioss.post(`/initialData`);
    if (res.status === 200) {
      const { categories, products, orders, adress } = res.data;
      console.log("initialllll",res.data)
      dispatch({
        type: categoryConstans.GETT_ALL_CATEGORIES_SUCCES,
        payload: { categories },
      });
      dispatch({
        type: productConstans.GET_ALL_Products_SUCCES,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: adressConstants.GETT_ALL_ADRES_SUCCES,
        payload: { adress },
      });
    }
    console.log(res);
  };
};
