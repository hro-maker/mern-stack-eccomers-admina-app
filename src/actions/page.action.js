import axioss from "../helpers/axios"
import { pageConstans } from "./constans"

export const createPage=(form)=>{
    return async dispatch =>{
        dispatch({type: pageConstans.CREATE_PAGE_REQUEST})
        try {
            const res = await axioss.post('/page/create',form)
            if(res.status === 201){
                dispatch({
                    type:pageConstans.CREATE_PAGE_SUCCES,
                    payload:{page:res.data.page}
                })
            }else{
                dispatch({
                    type:pageConstans.CREATE_PAGE_FAILURE,
                    payload:{error: res.data.error}
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}