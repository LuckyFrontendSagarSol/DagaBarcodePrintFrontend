import axios from "axios";
import {
  ADD_DEALER,
  DELETE_DEALER,
  GET_DEALERS,
  UPDATE_DEALER,
  GET_ERRORS,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
import Swal from "sweetalert2"
export const addDealer = (dealerObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      ` ${backend_uri_server}/api/v1/dealer`,
      dealerObj
    );

    dispatch({
      type: ADD_DEALER,
      payload: response.data,
    });
    console.log("check dealer name", response)
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Dealer Added Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Dealer "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getDealers = (filter) => async (dispatch, getState) => {
  if (filter === "reset") {
    dispatch({
      type: GET_DEALERS,
      payload: [],
    });
  }
  const { dealers } = getState().dealersData
  if (!dealers?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(` ${backend_uri_server}/api/v1/dealer`);

    try {
      dispatch({
        type: GET_DEALERS,
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
export const deleteDealer = (id) => async (dispatch) => {
  let response = await axios.delete(
    `${backend_uri_server}/api/v1/dealer/${id}`
  );
  try {
    dispatch({
      type: DELETE_DEALER,
      payload: id,
    });
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Dealer Deleted Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Dealer "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateDealer = (dealerObj) => async (dispatch) => {
  try {
    const res = await axios.patch(
      ` ${backend_uri_server}/api/v1/dealer`,
      dealerObj
    );
    dispatch({
      type: UPDATE_DEALER,
      payload: dealerObj,
    });
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Dealer Updated Successfully`,
        customClass: {
          popup: "my-swal-popup",
          icon: "my-swal-icon",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-button",
        },
      })
    }
    // message.success(`Dealer "${res.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
