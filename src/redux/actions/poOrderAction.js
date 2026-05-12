import axios from "axios";
import {
  GET_PO_LIST,
  GET_PO_DATABYID,
  GET_ERRORS,
  ADD_PO,
  GET_POCREDENTIALS
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';

export const getPOdatabyId = (obj) => async (dispatch) => {
  try {
    
    console.log("obj", obj);
    let response = await axios.post(
      `${backend_uri_server}/api/v1/poDetailsBypoid`,
      obj
    );
console.log("response", response.data);
   await dispatch({
      type: GET_PO_DATABYID,
      payload: response.data,
    });
   
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getPOList = () => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(`${backend_uri_server}/api/v1/AllPoCredentials`);
  try {
    dispatch({
      type: GET_PO_LIST,
      payload: response.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.message)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};



export const getpo = () => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/AllPoCredentials`);
  console.log("response", response);
  try {
    dispatch({
      type: GET_POCREDENTIALS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};



export const poCredentials = (poObj) => async (dispatch) => {
  try {
    console.log("testing", poObj);
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/poCredentials`,
      poObj
    );

    dispatch({
      type: ADD_PO,
      payload: response.data,
    });
   

    message
      .success(`PO Added Successfully`)

  } catch (error) {
    console.log("err--", error)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }

}