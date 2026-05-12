import axios from "axios";
import {
    GET_RACKS,
    GET_ERRORS,
    GET_RACKS_BY_ID,
} from "./type";
import { message } from "antd";

import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";

export const createRack = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/createRack`,
            obj
        );
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};


export const getRacks = (limit) => async (dispatch) => {
    // dispatch(showProgressBar());
    let response = await axios.get(
        `${backend_uri_server}/api/v1/getRacks `
    );
    try {
        dispatch({
            type: GET_RACKS,
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
};

export const getRackById = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/getRackById `,
            obj
        );
        // message.success(response.data);
        dispatch({
            type: GET_RACKS_BY_ID,
            payload: response.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const updateRack = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/updateRack`,
            obj
        );
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const deleteRack = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/deleteRack`,
            obj
        );
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const addQrCodeImage = (files) => async (dispatch) => {
    try {
        let formData = new FormData();
        formData.append("image", files);
        let response = await axios.post(
            `${backend_uri_server}/api/v1/uploadImage`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            // payload: error.message,
            payload: error.response.data,
        });
    }
};

export const updateQRimageInRack = (data) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/updateQRimageInRack`, data
        );
        console.log("Response ------------->", response)
        return response;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            // payload: error.message,
            payload: error.response.data,
        });
    }
};