import axios from "axios";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  GET_ERRORS,
  CATEGORY_STATUS,
  GET_PRODUCTS_BY_CATEGORY,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addCategory = (categoryObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/category`,
      categoryObj
    );
    dispatch({
      type: ADD_CATEGORY,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Category Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Category "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getCategories = (filter) => async (dispatch, getState) => {
  if (filter == "reset") {
    dispatch({
      type: GET_CATEGORIES,
      payload: [],
    });
  }
  const { categories } = getState().categoryData
  if (!categories?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/category`);
    try {
      dispatch({
        type: GET_CATEGORIES,
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

export const deleteCategory = (id) => async (dispatch) => {
  let response = await axios.delete(
    `${backend_uri_server}/api/v1/category/${id}`
  );
  try {
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Category Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Category "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateCategory = (categoryObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/category`,
      categoryObj
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: categoryObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Category Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Category "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
export const changeCategoryStatus = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/category/highlights`,
      obj
    );
    dispatch({
      type: CATEGORY_STATUS,
      payload: obj._id,
    });
    if (obj.status === "ON") {
      message.success({
        content: "Category Highlights ON",
      });
    } else {
      message.success({
        content: "Category Highlights OFF",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getProductByCategory = (id) => async (dispatch) => {
  try {
    console.log(id);
    let response = await axios.get(
      `${backend_uri_server}/api/v1/category/purchase/${id}`
    );
    console.log("catagory products", response.data)
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
