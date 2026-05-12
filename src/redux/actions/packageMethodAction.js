import Swal from "sweetalert2";
import axios from "axios";
import {
  ADD_PACKAGING_METHOD,
  DELETE_PACKAGING_METHOD,
  GET_ERRORS,
  GET_PACKAGING_METHOD,
  GET_PACKAGING_METHODS,
  UPDATE_PACKAGING_METHOD,
} from "./type";
import { backend_uri_server } from "../../util/constants";
import { message } from "antd";

export const createPackagingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/createPackagingMethod`,
      obj
    );

    dispatch({
      type: ADD_PACKAGING_METHOD,
      payload: response,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Packaging Method Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const updatePackagingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updatePackagingMethod`,
      obj
    );

    dispatch({
      type: UPDATE_PACKAGING_METHOD,
      payload: response,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Packaging Method Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const deletePackagingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deletePackagingMethod`,
      obj
    );

    dispatch({
      type: DELETE_PACKAGING_METHOD,
      payload: response,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Packaging Method Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const getPackagingMethods = (obj) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getAllPackagingMethods`,
      obj
    );

    dispatch({
      type: GET_PACKAGING_METHODS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const UpdatePackagingMethodForBarcode = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateBarcodePackagingMethod`,
      obj
    );
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const getPackagingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getPackagingMethod`,
      obj
    );

    dispatch({
      type: GET_PACKAGING_METHOD,
      payload: response.data.data,
    });
    return response.data.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};

export const getBarcodeWithOutPackingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getBarcodeWithOutPackingMethod`,
      obj
    );

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};
export const updatePackingMethod = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updatePackingMethod`,
      obj
    );

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    message.error("Something went wrong!");
  }
};
