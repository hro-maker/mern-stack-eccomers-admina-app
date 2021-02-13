import { userConstants } from "../actions/constans";

const initialState={
    error:null,
    message:'',
    loading:false
}

const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            
            return    state={
                    ...state,
                    loading:true
                }
        case userConstants.USER_REGISTER_SUCCES:
            return state={
                ...state,
                loading:false,
                message:action.payload.message
            } 
            case userConstants.USER_REGISTER_FAILURE:
            return state={
                ...state,
                loading:false,
                error:action.payload.error
            } 
            
    
        default:
            return state
    }
}
export default userReducer