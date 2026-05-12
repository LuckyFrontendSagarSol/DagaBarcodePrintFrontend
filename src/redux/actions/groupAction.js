import axios from "axios";
import {
  ADD_GROUP,
  DELETE_GROUP,
  GET_GROUPS,
  GET_ERRORS,
  UPDATE_GROUP,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addGroup = (groupObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/group`,
      groupObj
    );
    dispatch({
      type: ADD_GROUP,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Group Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Group "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getGroups = (filter) => async (dispatch, getState) => {
  const { groups } = getState().groupData
  if (!groups?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/group`);
    try {
      dispatch({
        type: GET_GROUPS,
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

export const deleteGroup = (id) => async (dispatch) => {
  let response = await axios.delete(`${backend_uri_server}/api/v1/group/${id}`);
  try {
    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Group Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Group "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateGroup = (groupObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/group`,
      groupObj
    );
    dispatch({
      type: UPDATE_GROUP,
      payload: groupObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Group Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Group "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
