import axios from "axios";
import {
  ADD_SECTION,
  DELETE_SECTION,
  GET_SECTIONS,
  GET_ERRORS,
  UPDATE_SECTION,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';
export const addSection = (sectionObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/section`,
      sectionObj
    );
    dispatch({
      type: ADD_SECTION,
      payload: response.data,
    });
    message.success(`Section "${response.data.name}" Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSections = (filter) => async (dispatch, getState) => {
  const { sections } = getState().sectionData
  if (!sections?.length > 0) {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/section`);
    try {
      dispatch({
        type: GET_SECTIONS,
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

export const deleteSection = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/section/${id}`
    );

    dispatch({
      type: DELETE_SECTION,
      payload: id,
    });
    message.success(`Section "${response.data.name}" Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
export const updateSection = (sectionObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/section`,
      sectionObj
    );
    dispatch({
      type: UPDATE_SECTION,
      payload: sectionObj,
    });
    message.success(`Section "${response.data.name}" Updated Successfully`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
