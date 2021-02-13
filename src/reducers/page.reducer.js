import { pageConstans } from "../actions/constans";

const initialState={
    error:null,
    loading:false,
    page:{}
}
const pageReducer=(state=initialState,action)=>{
    switch (action.type) {
        case pageConstans.CREATE_PAGE_REQUEST:
            return state ={
                ...state,
                loading:true
            }
        case pageConstans.CREATE_PAGE_SUCCES:
                return state ={
                      ...state,
                      loading:false  
                }
        case pageConstans.CREATE_PAGE_FAILURE:
            return state={
                ...state,
                loading:false,
                error:action.payload.error
            }
        default:
            return state
    }
}
export default pageReducer