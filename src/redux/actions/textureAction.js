import axios from "axios";
import {
    ADD_TEXTURE,
    DELETE_TEXTURE,
    GET_TEXTURE,
    GET_TEXTURE_BY_ID,
    GET_ERRORS,
    UPDATE_TEXTURE,
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';


export const addTexture = (textureObj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/createTexture`,
            textureObj
        );
        dispatch({
            type: ADD_TEXTURE,
            payload: response.data,
        });
        message.success("Texture created successfully");
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const getTexture = (filter) => async (dispatch, getState) => {
    const { textures } = getState().textureData
    if (!textures?.length > 0) {
        // dispatch(showProgressBar());
        let response = await axios.get(`${backend_uri_server}/api/v1/getAllTextures`);
        try {
            dispatch({
                type: GET_TEXTURE,
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

export const getTextureById = (id) => async (dispatch, getState) => {
    try {
        let response = await axios.get(`${backend_uri_server}/api/v1/textureById?textureId=${id}`);

        dispatch({
            type: GET_TEXTURE_BY_ID,
            payload: response?.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
        // dispatch(hideProgressBar());
    }
};


export const deleteTexture = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/deleteTexture`,
            obj
        );
        dispatch({
            type: DELETE_TEXTURE,
            payload: obj?.textureId,
        });
        message.success(`Texture "${response.data.name}" Deleted Successfully`);
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const updateTexture = (textureObj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/updateTexture`,
            textureObj
        );
        dispatch({
            type: UPDATE_TEXTURE,
            payload: textureObj,
        });
        window.location.reload()
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