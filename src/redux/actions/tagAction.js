import axios from "axios";
import {
    GET_TAG,
    GET_ERRORS
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';


export const createTags = (textureObj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/createTagsforpurchase`,
            textureObj
        );
        message.success("Texture created successfully");
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const getTags = (filter) => async (dispatch, getState) => {
    const { tags } = getState().textureData
    if (!tags?.length > 0) {
        // dispatch(showProgressBar());
        let response = await axios.get(`${backend_uri_server}/api/v1/getTagsforpurchase`);
        try {
            dispatch({
                type: GET_TAG,
                payload: response.data,
            });
            // dispatch(hideProgressBar());
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error,
            });
            // dispatch(hideProgressBar());
        }
    }
};

// export const getTextureById = (id) => async (dispatch, getState) => {
//     try {
//         let response = await axios.get(`${backend_uri_server}/api/v1/textureById?textureId=${id}`);

//         dispatch({
//             type: GET_TAG_BY_ID,
//             payload: response?.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_ERRORS,
//             payload: error,
//         });
//         // dispatch(hideProgressBar());
//     }
// };


export const deleteTags = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/deleteTagsforpurchase`,
            obj
        );
        message.success(`Texture "${response.data.name}" Deleted Successfully`);
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const updateTags = (tagObj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/updateTagsforpurchase`,
            tagObj
        );
        // window.location.reload()
        message.success(`Texture "${response.data.name}" Updated Successfully`);
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ERRORS,
            // payload: error.message,
            payload: error.response.data,
        });
    }
};