import axios from "axios";
import {
  ADD_STYLE,
  DELETE_STYLE,
  GET_STYLES,
  GET_ERRORS,
  UPDATE_STYLE,
  GET_STYLES_BY_CATEGORY,
  GET_PRODUCTS_BY_STYLE,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addStyle = (styleObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/style`,
      styleObj
    );
    dispatch({
      type: ADD_STYLE,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Style Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    return response
    // message.success(`Style "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getStyles = (categoryId) => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/style/category/${categoryId}`
  );
  try {
    dispatch({
      type: GET_STYLES,
      payload: response.data,
    });
    return response
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const deleteStyle = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/style/${id}`
    );

    dispatch({
      type: DELETE_STYLE,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Style Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Style "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateStyle = (styleObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/style`,
      styleObj
    );
    dispatch({
      type: UPDATE_STYLE,
      payload: styleObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Style Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    return response
    // message.success(`Style "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getStyleByCategory = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/category/style/0`
    );

    dispatch({
      type: GET_STYLES_BY_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getProductsByStyle = (catId, styleId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/purchase/${catId}/${styleId}`
    );
    dispatch({
      type: GET_PRODUCTS_BY_STYLE,
      payload: response.data,
    });
    if (response && response.status === 200 && response.data.length == 0) {
      message.warn("No Product Found!")
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const getAllStyles = (categoryId) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/style`
  );
  try {
    dispatch({
      type: GET_STYLES,
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