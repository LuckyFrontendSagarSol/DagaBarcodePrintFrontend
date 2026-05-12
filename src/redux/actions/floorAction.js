import axios from "axios";
import {
  ADD_FLOOR,
  DELETE_FLOOR,
  GET_FLOORS,
  GET_ERRORS,
  UPDATE_FLOOR,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addFloor = (floorObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/floor`,
      floorObj
    );

    dispatch({
      type: ADD_FLOOR,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Floor Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Floor "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getFloors = (filter) => async (dispatch, getState) => {
  const { floors } = getState().floorData
  if (!floors?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/floor`);
    try {
      dispatch({
        type: GET_FLOORS,
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

export const deleteFloor = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/floor/${id}`);
  try {
    dispatch({
      type: DELETE_FLOOR,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Floor Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Floor "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateFloor = (floorObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/floor/`,
      floorObj
    );

    dispatch({
      type: UPDATE_FLOOR,
      payload: floorObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Floor Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Floor "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const floorGoodsReplace = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/floorGoodsReplace`,obj);
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};