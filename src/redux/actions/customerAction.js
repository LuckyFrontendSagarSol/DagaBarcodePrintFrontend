import axios from "axios";
import {
  GET_CUSTOMERS,
  GET_ERRORS,
  GET_SALES,
  ACTIVE_AND_INACTIVE_CUSTOMERS,
  GET_CUSTOMER_SALES_REPORT,
  GET_TOP_CUSTOMER_SALES_REPORT,
  GET_INACTIVE_CUSTOMER_SALES_REPORT,
  GET_PIE_CHART_DATA_CUSTOMER_REPORT
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";

export const getCustomers = (roleName) => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/user`, {
    params: { roleName },
  });

  if (roleName == "STORE_USER" || roleName == "USER") {
    try {
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  } else if (roleName == "SALES" || roleName == "PURCHASER") {
    try {
      dispatch({
        type: GET_SALES,
        payload: response.data,
      });
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

//for getting Active and Inactive Customer List
export const getActiveandInactiveCustomer =
  () => async (dispatch, getState) => {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/activeCustomerList`
    );
    try {
      dispatch({
        type: ACTIVE_AND_INACTIVE_CUSTOMERS,
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
export const getCustomerSaleReport =
  (obj) => async (dispatch, getState) => {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/customerAnalysisReport`, obj
    );
    try {
      dispatch({
        type: GET_CUSTOMER_SALES_REPORT,
        payload: response.data,
      });
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };
export const customerAnalysisReportDownload =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/customerAnalysisReportDownload`, obj
      );
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


  export const getTopCustomersByFilter =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getTopCustomersByFilter`, obj
      );
      dispatch({
        type: GET_TOP_CUSTOMER_SALES_REPORT,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };
  
  export const getInactiveCustomers =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getInactiveCustomers`, obj
      );
      dispatch({
        type: GET_INACTIVE_CUSTOMER_SALES_REPORT,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };

  export const getPieChartDataByFilter =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/customerAnalysisReportByFilters`, obj
      );
      dispatch({
        type: GET_PIE_CHART_DATA_CUSTOMER_REPORT,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


   export const createCustomerStoreEntry =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/createCustomerInOut`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


  export const UpdateCustomerStoreEntry =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/updateCustomerInOut`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


    export const customerInOutStatusManage =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/updateStatusCustomerInOut`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


    export const getAllcustomerInOut =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/getAllCustomerInOut`
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


   export const getAllcustomerInOutByCustomerId =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getCustomerInOutById`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };

   export const getAllcustomerInOutByfilters =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/customerInOutFilter`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


    export const updateCustomerPaymentandWaitingStatus =
  (obj) => async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/updatePaymentMode`, obj
      );
      return response;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: [],
      });
    }
  };


