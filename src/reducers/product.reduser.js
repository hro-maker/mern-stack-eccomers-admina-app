import { productConstans } from "../actions/constans";

const initialState={
    products:[]
}
const productReducer=(state=initialState,action)=>{
   switch (action.type) {
       case productConstans.GET_ALL_Products_SUCCES:
           return state={
                ...state,
                products:action.payload.products
           }
   
       default:
           return state
   }
}
export default productReducer