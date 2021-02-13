import { autConstants } from './../actions/constans';
const initialState={
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        pofilePicture:''
    },
    authenticate:false,
    authenticating:false,
    loading:false,
    error:null,
    message:''
}

const authReducer= (state=initialState,action)=>{
    console.log(action)
    switch (action.type) {
        case autConstants.LOGIN_REQUEST:
        return    state={
               ...state,
               authenticating:true
            }
          

        case autConstants.LOGIN_SUCCES:
         return   state= {
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticate:true,
                authenticating:false

            }    
        case autConstants.LOGOUT_REQUEST:  
        return state={
                    ...state,
                    loading:true
        }  
        case autConstants.LOGOUT_SUCCESS:  
        return state={
                    ...initialState
        } 
        case autConstants.LOGOUT_FAILURE:  
        return state={
                    ...state,
                    error:action.payload.error,
                    loading:false
        } 
            default:
                return state
    }
}
export default authReducer