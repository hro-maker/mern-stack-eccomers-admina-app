import { orderConstants,adressConstants } from "../actions/constans";



const initState = {
  orders: [],
  addres:[]
};

 const orderReduecer=(state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
      case adressConstants.GETT_ALL_ADRES_SUCCES:
      state = {
        ...state,
        addres: action.payload.adress,
      };
      break;
      default:
        return state
  }

  return state;
};
export default orderReduecer