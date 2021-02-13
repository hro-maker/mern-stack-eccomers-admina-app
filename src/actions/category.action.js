import axioss from './../helpers/axios';
import { categoryConstans } from './constans';
const getAllCategory=()=>{
    return async dispatch =>{
        dispatch({type:categoryConstans.GETT_ALL_CATEGORIES_REQUEST})
        const res= await axioss.get('category/getcategory')
          
            if(res.status===200){
                const {categoriList}=res.data
                dispatch({
                    type: categoryConstans.GETT_ALL_CATEGORIES_SUCCES,
                    payload:{categories:categoriList}
                })
            }else{
                dispatch({
                    type:categoryConstans.GETT_ALL_CATEGORIES_FAILURE,
                    payload:{error:res.data.error}
                })
            }
    }
}
export const addCategory=(form)=>{
   
    return async dispatch =>{
        dispatch({type:categoryConstans.ADD_NEW_CATEGORY_REQUEST})
        try {
            const res = await axioss.post('category/create',form)
        if(res.status===201){
            dispatch({type:categoryConstans.ADD_NEW_CATEGORY_SUCCES,
                payload:{category:res.data.category}
            })
            
        }else{
            dispatch({type:categoryConstans.ADD_NEW_CATEGORY_FAILURE,
                payload:res.data.error
            })

        }
        } catch (error) {
            
        }
       
    }
}
export const updateCategories=(form)=>{
    return async dispatch =>{
        dispatch({type: categoryConstans.UPDATE_CATEGORIES_REQUEST})
        const res = await axioss.post('category/update',form)
        if(res.status===201){
            dispatch({type:categoryConstans.UPDATE_CATEGORIES_SUCCES})
            dispatch(getAllCategory())      
        }else{
            const {error}=res.data
            dispatch({
                type:categoryConstans.ADD_NEW_CATEGORY_FAILURE,
                payload:{error}
            })
        }
        
    }
}
export const deleteCategories=(ids)=>{
    return async dispatch =>{
        dispatch({type:categoryConstans.DELETE_CATEGORIES_REQUEST})
        const res = await axioss.post('category/delete',{
            payload:{
                ids
            }
        })
        if(res.status == 200){
            dispatch(getAllCategory())
            dispatch({type:categoryConstans.DELETE_CATEGORIES_SUCCES})
        }else{
            const {error}=res.data
            dispatch({
                type:categoryConstans.DELETE_CATEGORIES_FAILURE,
                payload:{error}
            })
        }
        
    }
}
export {
    getAllCategory
}