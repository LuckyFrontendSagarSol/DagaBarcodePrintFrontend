import axios from "axios";
import {
  GET_DELETED_DEFECTIVE_RETURN_LIST,
  GET_DELETED_PURCHASE_RETURN_LIST,
  GET_DELETED_SALES_LIST,
  GET_DELETED_SALES_RETURN_LIST,
  GET_ERRORS,
  RESTORE_DELETED_SALE,
  RESTORE_DELETED_SALE_RETURN,
  RESTORE_DELETED_DEFECTIVE_RETURN,
  RESTORE_DELETED_PURCHASE_RETURN,
} from "./type";
import { message } from "antd";
import { backend_uri_server } from "../../util/constants";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";

//Sale
export const getDltSale = (limit) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_uri_server}/api/v1/restore/SaleList?perPage=${30}&limit=${limit}`
    );
    dispatch({
      type: GET_DELETED_SALES_LIST,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const restoreSale = (obj) => async (dispatch) => {
  try {
    await axios.post(`${backend_uri_server}/api/v1/restore/deleteSale`, obj);
    dispatch({
      type: RESTORE_DELETED_SALE,
      payload: obj,
    });
  } catch (error) {
    alert(error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//Sale return
export const getDltSaleReturn = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_uri_server}/api/v1/restore/salesReturnList`
    );
    dispatch({
      type: GET_DELETED_SALES_RETURN_LIST,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const restoreSaleReturn = (obj) => async (dispatch) => {
  try {
    await axios.post(`${backend_uri_server}/api/v1/restore/salesReturn`, obj);
    dispatch({
      type: RESTORE_DELETED_SALE_RETURN,
      payload: obj,
    });
  } catch (error) {
    alert(error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// Defective Sale return
export const getDltDefectiveReturn = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_uri_server}/api/v1/restore/defectiveReturnList`
    );
    dispatch({
      type: GET_DELETED_DEFECTIVE_RETURN_LIST,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const restoreDefectiveReturn = (obj) => async (dispatch) => {
  try {
    await axios.post(
      `${backend_uri_server}/api/v1/restore/defectiveReturn`,
      obj
    );
    dispatch({
      type: RESTORE_DELETED_DEFECTIVE_RETURN,
      payload: obj,
    });
  } catch (error) {
    alert(error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// Purchase return
export const getDltPurchaseReturn = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_uri_server}/api/v1/restore/purchaseReturnList`
    );
    dispatch({
      type: GET_DELETED_PURCHASE_RETURN_LIST,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const restorePurchaseReturn = (obj) => async (dispatch) => {
  try {
    await axios.post(
      `${backend_uri_server}/api/v1/restore/purchaseReturn`,
      obj
    );
    dispatch({
      type: RESTORE_DELETED_PURCHASE_RETURN,
      payload: obj,
    });
  } catch (error) {
    alert(error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};