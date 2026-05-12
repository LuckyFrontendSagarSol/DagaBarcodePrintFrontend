import axios from "axios";
import {
  ADD_AGE_GROUP,
  DELETE_AGE_GROUP,
  GET_AGE_GROUPS,
  GET_ERRORS,
  UPDATE_AGE_GROUP,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addAgeGroup = (ageGroupObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ageGroup`,
      ageGroupObj
    );

    dispatch({
      type: ADD_AGE_GROUP,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Age Group Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Age Group "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getAgeGroups = (filter) => async (dispatch, getState) => {
  const { ageGroups } = getState().ageGroupData
  if (!ageGroups?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/ageGroup`);
    try {
      dispatch({
        type: GET_AGE_GROUPS,
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

export const deleteAgeGroup = (id) => async (dispatch) => {
  let response = await axios.delete(
    `${backend_uri_server}/api/v1/ageGroup/${id}`
  );
  try {
    dispatch({
      type: DELETE_AGE_GROUP,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Age Group Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Age Group "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateAgeGroup = (ageGroupObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/ageGroup/`,
      ageGroupObj
    );

    dispatch({
      type: UPDATE_AGE_GROUP,
      payload: ageGroupObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Age Group Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Age Group "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
