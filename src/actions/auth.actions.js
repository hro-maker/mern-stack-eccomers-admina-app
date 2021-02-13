import { autConstants } from "./constans";
import axioss from "./../helpers/axios";
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: autConstants.LOGIN_REQUEST });

    const res = await axioss.post("/admin/signin", {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: autConstants.LOGIN_SUCCES,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: autConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: autConstants.LOGIN_SUCCES,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: autConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
    dispatch({type:autConstants.LOGOUT_REQUEST})
    const res = await axioss.post("/admin/signout");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: autConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: autConstants.LOGOUT_FAILURE,
        payload:{error:res.data.error}
      });
    }
  };
};
