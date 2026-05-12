import axios from "axios";
import {
  ADD_COLOR,
  DELETE_COLOR,
  GET_COLORS,
  GET_ERRORS,
  UPDATE_COLOR,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"
export const addColor = (colorobj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/color`,
      colorobj
    );

    dispatch({
      type: ADD_COLOR,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Color Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Color "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getColors = (obj) => async (dispatch, getState) => {
  const { colors } = getState().colorData
  if(obj === "reset"){
    dispatch({
      type: GET_COLORS,
      payload: [],
    });
    return
  }
  if (!colors?.length > 0) {
    let response = await axios.get(`${backend_uri_server}/api/v1/color`);
    try {
      dispatch({
        type: GET_COLORS,
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

export const deleteColor = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/color/${id}`);
  try {
    dispatch({
      type: DELETE_COLOR,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Color Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Color "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateColor = (colorobj) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `${backend_uri_server}/api/v1/color`,
      colorobj
    );
    dispatch({
      type: UPDATE_COLOR,
      payload: colorobj,
    });
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Color Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Color "${res.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
