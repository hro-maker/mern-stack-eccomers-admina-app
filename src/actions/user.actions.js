import { userConstants } from "./constans";
import axioss from "./../helpers/axios";

export const signup = (user) => {
    return async (dispatch) => {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
  
      const res = await axioss.post("/admin/signup", {
        ...user,
      });
      if (res.status === 201) {
        const { message } = res.data;
        dispatch({
          type: userConstants.USER_REGISTER_SUCCES,
          payload: {message}
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: userConstants.USER_REGISTER_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    };
  };