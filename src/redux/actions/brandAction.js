import axios from "axios";
import {
  ADD_BRAND,
  ADD_IMAGE_BRAND,
  BRAND_STATUS,
  DELETE_BRAND,
  DONE_DONE,
  GET_BRANDS,
  GET_ERRORS,
  UPDATE_BRAND,
  GET_BRAND_IMAGES,
  GET_PAGINATED_LIST,
  GET_BRAND_BYSEARCH,
  GET_BRAND_AND_DESIGN_BYSEARCH,
  GET_ECOM_BRAND
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addBrand = (brandObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/brand`,
      brandObj
    );
    dispatch({
      type: ADD_BRAND,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Brand Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Brand "${response.data.name}" Added Successfully`);
  } catch (error) {
    if (error?.response?.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Brand already exists`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getBrands = () => async (dispatch) => {
  dispatch({
    type: GET_BRANDS,
    payload: [],
  });
  dispatch(showProgressBar());
  let response = await axios.get(`${backend_uri_server}/api/v1/brand`);
  
  try {
    dispatch({
      type: GET_BRANDS,
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

export const getActiveInactiveBrands = () => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(`${backend_uri_server}/api/v1/activeBrandList`);
  try {
    dispatch({
      type: GET_BRANDS,
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

export const deleteBrand = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/brand/${id}`);
  try {
    dispatch({
      type: DELETE_BRAND,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Brand Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Brand "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateBrand = (brandObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/brand/`,
      brandObj
    );
    dispatch({
      type: UPDATE_BRAND,
      payload: brandObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Brand Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Brand "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const test = (brandObj) => async (dispatch) => {
  dispatch({
    type: DONE_DONE,
  });
};
export const changeBrandStatus = (obj) => async (dispatch) => {
  try {
    console.log("obj", obj);
    let response = await axios.post(
      `${backend_uri_server}/api/v1/brand/highlights`,
      obj
    );
    dispatch({
      type: BRAND_STATUS,
      payload: obj._id,
    });
    if (obj.status === "ON") {
      message.success({
        content: "Brand Highlights ON",
      });
    } else {
      message.success({
        content: "Brand Highlights OFF",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const deleteBrandImage = (imgUrl) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/deleteBrandImage`, imgUrl);
    if (response.status == 200) {
      message.success(response.data);
    }
    return response
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const addBrandImage = (id, file) => async (dispatch) => {
  try {
    console.log("console", file, id)

    let formData = new FormData();
    formData.append('image', file);
    console.log("formdata", formData, id)
    let response = await axios.post(
      `${backend_uri_server}/api/v1/upload-single/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // message.success(" Imaged added Successfully");
    dispatch({
      type: ADD_IMAGE_BRAND,
      payload: response.data,
    });
    return response
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getBrandImages = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/imageByBarcode`, obj);
    dispatch({
      type: GET_BRAND_IMAGES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};


export const deleteProductImage = (url) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/deleteProductImage`, url);
    if (response.status == 200) {
      message.success(response.data)
    }
    return response
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

//for Active Inactive Brand List 
export const activeAndInactiveBrandStatus = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/activeinactivebrand`, obj);
    message.success(response.data.message)
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};


//paginated list - 
export const getPaginatedList = (limit) => async (dispatch) => {
  // dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/brand/?perPage=${50}&limit=${limit}`
  );
  console.log("res", response);
  try {
    dispatch({
      type: GET_PAGINATED_LIST,
      payload: response.data,
    });
  } catch (error) {
    console.log("er", error)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//Search brand Api-
export const getBrandBySearch = (obj) => async (dispatch, getState) => {
  const { brandBysearch } = getState().brandsData
  if (!brandBysearch?.data?.length > 0) {
    try {
      if (obj == "reset") {
        dispatch({
          type: GET_BRAND_BYSEARCH,
          payload: [],
        });
      } else {
        let response = await axios.post(`${backend_uri_server}/api/v1/getBrandsBysearch`, obj);
        dispatch({
          type: GET_BRAND_BYSEARCH,
          payload: response.data,
        });
        return response
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};


export const getDataByBrandandDesign = (obj) => async (dispatch, getState) => {
  const { brandBysearch } = getState().brandsData
  if (!brandBysearch?.data?.length > 0) {
    try {
      if (obj == "reset") {
        dispatch({
          type: GET_BRAND_AND_DESIGN_BYSEARCH,
          payload: [],
        });
      } else {
        let response = await axios.post(`${backend_uri_server}/api/v1/getDataByBrandandDesign`, obj);
        dispatch({
          type: GET_BRAND_AND_DESIGN_BYSEARCH,
          payload: response.data,
        });
        return response
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const clearDataByBrandAndDesign = () => ({
  type: 'CLEAR_DATA_BY_BRAND_AND_DESIGN',
});


export const getOnBrandEcom = (limit) => async (dispatch) => {
  // dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/getOnBrandEcom`
  );
  console.log("res", response);
  try {
    dispatch({
      type: GET_ECOM_BRAND,
      payload: response.data,
    });
  } catch (error) {
    console.log("er", error)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};