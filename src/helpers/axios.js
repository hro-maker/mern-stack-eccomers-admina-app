import axios from 'axios'
import { api } from './../urlConfig';
import store from './../store/index';
import { autConstants } from '../actions/constans';
const token= window.localStorage.getItem('token')
const axioss= axios.create({
   baseURL:api,
   headers:{
     'Authorization':token?`Bearer ${token}`:''
   }
})
axioss.interceptors.request.use((req)=>{
  const {auth} =store.getState()
  if(auth.token){
    req.headers.Authorization=`Bearer ${auth.token}`
  }
  return req
})
axioss.interceptors.response.use((res)=>{
   return  res
},(error)=>{
  console.log(error.response)
  const {status}=error.response
  if(status  == 500 ){
      localStorage.clear()
      store.dispatch({type: autConstants.LOGOUT_SUCCESS})
  }
  return Promise.reject(error)
})
export default axioss