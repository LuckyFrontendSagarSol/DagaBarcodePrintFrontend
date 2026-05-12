import axios from "axios";
import {
  ADD_SIZE,
  DELETE_SIZE,
  GET_SIZES,
  GET_ERRORS,
  UPDATE_SIZE,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addSize = (sizeObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/size`,
      sizeObj
    );

    dispatch({
      type: ADD_SIZE,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Size Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Size "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSizes = (obj) => async (dispatch, getState) => {
  const { sizes } = getState().sizeData
  if(obj === "reset"){
    dispatch({ type: GET_SIZES, payload: [] })
    return
  }
  if (!sizes?.length > 0) {
    let response = await axios.get(`${backend_uri_server}/api/v1/size`);
    try {
      dispatch({
        type: GET_SIZES,
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
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/size/${id}`
    );

    dispatch({
      type: DELETE_SIZE,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Size Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Size "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateSize = (sizeObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/size`,
      sizeObj
    );
    dispatch({
      type: UPDATE_SIZE,
      payload: sizeObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Size Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Size "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
