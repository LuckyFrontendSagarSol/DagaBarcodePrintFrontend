import axios from "axios";
import {
    GET_PURCHASES_ORDERS,
    GET_ERRORS,
    GET_PURCHASE_ORDER_BY_ID,
} from "./type";
import { message } from "antd";

import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";

export const addPurchaseOrder = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/createPO`,
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


export const getPurchaseOrders = (limit) => async (dispatch) => {
    // dispatch(showProgressBar());
    let response = await axios.get(
        `${backend_uri_server}/api/v1/getAllPoBills `
    );
    try {
        dispatch({
            type: GET_PURCHASES_ORDERS,
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

export const getPurchaseOrderByID = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/getPoBillById `,
            obj
        );
        // message.success(response.data);
        dispatch({
            type: GET_PURCHASE_ORDER_BY_ID,
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

export const updatePO = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/updatePO`,
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

export const createPurchaseByPo = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/createPurchaseByPo`,
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

export const getPoBillByDealerId = (obj) => async (dispatch) => {
    try {
        let response = await axios.post(
            `${backend_uri_server}/api/v1/getPoBillByDealerId `,
            obj
        );
        // message.success(response.data);
        dispatch({
            type: GET_PURCHASES_ORDERS,
            payload: response.data.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type:  GET_PURCHASES_ORDERS,
            payload: [],
        });
    }
};