import axios from "axios";
import {
  GET_OPENINGSTOCK_DATA,
  GET_ERRORS,
} from "./type";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import { message } from "antd";




export const getOpeningStcok = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.post(`${backend_uri_server}/api/v1/openingStock `, obj);
  console.log("response", response);
  try {
    dispatch({
      type: GET_OPENINGSTOCK_DATA,
      payload: response.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const updateStcok = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    const response = await axios.post(`${backend_uri_server}/api/v1/updateStock`, obj);
    console.log("response", response);

    if (response.status === 200) {
      // message.success(response.data);
      setTimeout(() => window.location.reload(true), 1000);
    }

    dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch(hideProgressBar());

    const backendError =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message ||
      "Something went wrong!";

    return backendError;
  }
};

