import axios from "axios";
import {
  ADD_SEASON,
  DELETE_SEASON,
  GET_SEASONS,
  GET_ERRORS,
  UPDATE_SEASON,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"

export const addSeason = (seasonObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/season`,
      seasonObj
    );

    dispatch({
      type: ADD_SEASON,
      payload: response.data,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Season Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Season "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSeasons = (filter) => async (dispatch, getState) => {
  const { seasons } = getState().seasonData
  if (!seasons?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/season`);
    try {
      dispatch({
        type: GET_SEASONS,
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

export const deleteSeason = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/season/${id}`
    );

    dispatch({
      type: DELETE_SEASON,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Season Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Season "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateSeason = (seasonObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/season`,
      seasonObj
    );
    dispatch({
      type: UPDATE_SEASON,
      payload: seasonObj,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Season Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Season "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
