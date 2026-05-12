import axios from "axios";
import { WAREHOUSE_INVENTORY_LIST,GET_ERRORS,ADD_WAREHOUSE_SALE, WAREHOUSE_SALE_LIST,WAREHOUSE_SALE_LIST_BY_BILL_ID,WAREHOUSE_LOOK_UP_BARCODE,WAREHOUSE_PURCHASE_BILL_LIST,WAREHOUSE_PURCHASE_BILL,WAREHOUSE_BARCODE, WH_INVENTORY_BARCODE_BYSEARCH, WH_PURCHASEBILL_BYSEARCH, WH_OUTBILL_BYSEARCH, WH_EMPTY_INVENTORY_DOWNLOAD} from "./type";
import { backend_uri_server } from "../../util/constants";
import { message } from "antd";

export const inventoryList = (limit, pageSize) => async (dispatch) => {
  try {
    let response = await axios.get(
      // `${backend_uri_server}/api/v1/warehouseInventoryList/${locationId}`
      `${backend_uri_server}/api/v1/warehouse/inventoryList?perPage=${pageSize}&limit=${limit}`
    );
    dispatch({
      type: WAREHOUSE_INVENTORY_LIST,
      payload: response,
    });

  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

  export const addWarehouseSale = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouseSale`,
        obj
      );
      dispatch({
        type: ADD_WAREHOUSE_SALE,
        payload: response.data.data,
      });
      message
        .success(`Sales Added Successfully`)
        .then(window.location.reload(0));
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  export const WarehouseSaleList = (limit) => async (dispatch) => {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/warehouse/saleOutbill?perPage=${10}&limit=${limit}`
      );
      dispatch({
        type: WAREHOUSE_SALE_LIST,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  export const warehouseSaleListbybillId = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouse/saleList/bybillId`,
        obj
      );
      dispatch({
        type: WAREHOUSE_SALE_LIST_BY_BILL_ID,
        payload: response.data.data
      });
      
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };
  
  export const WarehousepurchasebillList = (limit) => async (dispatch) => {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/warehouse/purchasebillList?perPage=${10}&limit=${limit}`
      );
      dispatch({
        type: WAREHOUSE_PURCHASE_BILL_LIST,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  export const warehousePurchaseBill = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouse/purchaseList/bybillId`,
        obj
      );
      dispatch({
        type: WAREHOUSE_PURCHASE_BILL,
        payload: response.data
      });
     
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  export const get_WH_PurchaseByBarcodeSale = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouse/inventory/byBarcode`,
        obj
      );
      if (!response.data.data) {
        // If response data is null, show warning message
        message.warn('Barcode not found');
      } else {
        dispatch({
          type: WAREHOUSE_BARCODE,
          payload: response.data
        });
        // window.location.reload(0);
      }
      return response.data
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

  export const warehouseLookup = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouse/purchase/lookup`,
        obj
      );

      dispatch({
        type: WAREHOUSE_LOOK_UP_BARCODE,
        payload: response.data
      });
      
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };


  export const whInventorySearchByBarcode = (obj) => async (dispatch) => {
    try {
      if (obj == "reset") {
        dispatch({
          type: WH_INVENTORY_BARCODE_BYSEARCH,
          payload: [],
        });
      } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/whInventorydatabySearch`,
        obj
      );

      dispatch({
        type: WH_INVENTORY_BARCODE_BYSEARCH,
        payload: response.data
      });
    }
    } catch (error) {
      message.error(error.response.data.message)
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };


  
  export const getwhPurchasebillbySearch = (obj) => async (dispatch) => {
    try {
      if (obj == "reset") {
        dispatch({
          type: WH_PURCHASEBILL_BYSEARCH,
          payload: [],
        });
      } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/whPurchasebillBySearch`,
        obj
      );

      dispatch({
        type: WH_PURCHASEBILL_BYSEARCH,
        payload: response.data
      });
    }
    } catch (error) {
      message.error(error.response.data.message)
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };


   
  export const getwhOutbillbySearch = (obj) => async (dispatch) => {
    try {
      if (obj == "reset") {
        dispatch({
          type: WH_OUTBILL_BYSEARCH,
          payload: [],
        });
      } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/whOutbillBySearch`,
        obj
      );

      dispatch({
        type: WH_OUTBILL_BYSEARCH,
        payload: response.data
      });
    }    
    } catch (error) {
      message.error(error.response.data.message)
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  
  };

  export const whEmptyStockInventory = (obj) => async (dispatch) => {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/warehouse/inventoryWithZeroStock`,
        obj
      );
      dispatch({
        type: WH_EMPTY_INVENTORY_DOWNLOAD,
        payload: response.data.data
      });
      return response.data.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };
  
  export const deleteEmptyStockData = (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/warehouse/deleteEmptyStockData`,
        obj
      );
      console.log(response)
      message.success(response?.data?.message)
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };