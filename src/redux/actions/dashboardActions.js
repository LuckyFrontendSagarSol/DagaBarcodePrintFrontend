import axios from "axios";
import { GET_DASHBOARD_DATA, GET_ERRORS, GET_GROSSPROFIT_DATA } from "./type";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { message } from "antd";

export const getDashboardDetails = (obj) => async (dispatch) => {
  let response = await axios.post(` ${backend_uri_server}/api/v1/dashboard`, obj);
  try {
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getGrossProfit = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(` ${backend_uri_server}/api/v1/grossProfitReport`, obj);
    dispatch({
      type: GET_GROSSPROFIT_DATA,
      payload: response.data,
    });
  } catch (error) {
    console.log("check my data", error.response)
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
