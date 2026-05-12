import axios from "axios";
import {
  GET_STOCKAGE_REPORTS,
  GET_CUSTOMER_SALES_REPORTS,
  GET_ERRORS,
  GET_PURCHASE_REPORTS,
  GET_REPORTS,
  CLEAR_DATA,
  GET_FASTMOVING_REPORTS,
  GET_BARCODE_REPORTS,
  GET_NONMOVING_REPORTS,
  GET_SALESCOMPARISON_REPORTS,
  GET_TOPCUSTOMER_REPORTS,
  GET_INACTIVECUSTOMER_REPORTS,
  GET_SALESAGEING_REPORTS,
  GET_AGENTWISE_REPORTS,
  GET_SALESSUMMARY_REPORTS,
  GET_SALESRETURN_REPORTS,
  GET_DEALERPURCHASE_REPORTS,
  GET_PURCHASERETURN_REPORTS,
  GET_SALESPERSON_REPORTS,
  GET_PURCHASEALL_REPORTS,
  GET_SALESALL_REPORTS,
  GET_CREDITANDDEBIT_REPORTS,
  GET_STOCK_REPORTS,
  GET_STOCKAGE_REPORTS_BYSEARCH,
  GET_STOCKAGE_BI_REPORTS_BYFILTER,
  FLLOR_SECTION_BARND_SEARCH,
  GET_SALESANDSALESAGE_REPORTS,
  GET_CUSTOMER_REPORT,
  GET_ALL_DEALERPURCHASE_REPORTS,
  GET_ALL_REPORTS,
  GET_ALL_PURCHASERETURN_REPORTS,
  GET_ALL_CUSTOMER_SALES_REPORTS,
  GET_ALL_SALESALL_REPORTS,
  GET_ALL_SALESALL_REPORTS_DOWNLOAD,
  GET_ALL_SALESSUMMARY_REPORTS,
  GET_ALL_STOCKAGE_REPORTS_BYSEARCH,
  GET_SALESRETURN_REPORTS_Amount,
  GET_BEST_SELLING_REPORT,
  GET_BEST_BRAND_REPORT,
  FLLOR_SECTION_BARND_SEARCH_FROM,
  FLLOR_SECTION_BARND_SEARCH_TO,
  GET_OPENING_STOCK_LIST
} from "./type";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from './yourProgressBarActions';


export const clearData = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DATA
  });

};

export const getCustomerSaleReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());

    const { userId, startDate, endDate, limit, perPage } = reportObj;
    const response = await axios.get(
      `${backend_uri_server}/api/v1/report/customer`,
      {
        params: {
          userId,
          startDate,
          endDate,
          limit,
          perPage
        }
      }
    );

    if (response.data?.saleBillsObj?.length === 0) {
      dispatch(hideProgressBar());
      message.warning('No Records found!');
    }

    if (reportObj?.type === "all") {
      dispatch({
        type: GET_ALL_CUSTOMER_SALES_REPORTS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_CUSTOMER_SALES_REPORTS,
        payload: response.data,
      });
    }

    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getPurchaseReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/purchaseBill?startDate=${reportObj.startDate}&endDate=${reportObj.endDate}&perPage=${reportObj.perPage}&limit=${reportObj.limit}`
    );
    if (response?.data?.purchaseBillsObj?.length == 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    if (reportObj?.type === "all") {
      dispatch({
        type: GET_ALL_REPORTS,
        payload: response.data,
      });
    }
    else {
      dispatch({
        type: GET_REPORTS,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSalesSummaryReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/salesBill?startDate=${reportObj.startDate}&endDate=${reportObj.endDate}&perPage=${reportObj.perPage}&limit=${reportObj.limit}`
    );

    if (response?.data?.saleBillsObj?.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    if (reportObj?.type === "all") {
      dispatch({
        type: GET_ALL_SALESSUMMARY_REPORTS,
        payload: response.data,
      });
    }
    else {
      dispatch({
        type: GET_SALESSUMMARY_REPORTS,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSalesReturnReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let { startDate, endDate, userId, returnType } = reportObj;
    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/customerReturn`,
      {
        params: {
          startDate,
          endDate,
          userId,
          returnType,
        },
      }
    );
    if (response && response?.data?.length > 0) {
      dispatch({
        type: GET_SALESRETURN_REPORTS,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    } else {
      dispatch(hideProgressBar());
      dispatch({
        type: GET_SALESRETURN_REPORTS,
        payload: [],
      });
      message.warning(`No Records found !`);
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};



export const getSalesReturnReportTotalAmt = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let { startDate, endDate, userId } = reportObj;
    let response = await axios.post(`${backend_uri_server}/api/v1/salesReturnNetAmount`,
      {
        startDate,
        endDate,
        userId,
      }
    );
    if (response && response.status == 200) {
      dispatch({
        type: GET_SALESRETURN_REPORTS_Amount,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    } else {
      dispatch(hideProgressBar());
      dispatch({
        type: GET_SALESRETURN_REPORTS_Amount,
        payload: [],
      });
      message.warning(`No Records found !`);
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};



export const getDealerPurchsesReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let { startDate, endDate, dealerId, brandId, limit, perPage } = reportObj;
    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/dealer`,

      {
        params: {
          startDate,
          endDate,
          dealerId,
          brandId,
          limit,
          perPage
        },
      }
    );
    if (response?.data?.details?.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    if (reportObj?.type === "all") {
      dispatch({
        type: GET_ALL_DEALERPURCHASE_REPORTS,
        payload: response.data,
      });
    }
    else {
      dispatch({
        type: GET_DEALERPURCHASE_REPORTS,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};


export const getAgentWiseReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(`${backend_uri_server}/api/v1/agentWiseReport`, reportObj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    dispatch({
      type: GET_AGENTWISE_REPORTS,
      payload: response.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getBarcodeReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    console.log("#action reportObj", reportObj);
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/getBarcodeReport`, reportObj
    );
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    dispatch({
      type: GET_BARCODE_REPORTS,
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
};

export const getCreditandDebitReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    console.log("#action reportObj", reportObj);
    let response = await axios.post(
      `${backend_uri_server}/api/v1/debitCreditReport`, reportObj
    );
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    dispatch({
      type: GET_CREDITANDDEBIT_REPORTS,
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
};

export const getPurchaseReturnReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let { startDate, endDate, dealerId } = reportObj;
    console.log("#action reportObj", reportObj);

    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/dealerPurchaseReturn?perPage=${reportObj.perPage}&limit=${reportObj.limit}`,

      {
        params: {
          startDate,
          endDate,
          dealerId,
        },
      }
    );
    if (response?.data?.details?.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    if (reportObj?.type === "all") {
      dispatch({
        type: GET_ALL_PURCHASERETURN_REPORTS,
        payload: response.data,
      });
    }
    else {
      dispatch({
        type: GET_PURCHASERETURN_REPORTS,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};



export const getFastMovingItemsReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.get(
      `${backend_uri_server}/api/v1/report/getMovingItems?startDate=${reportObj.startDate}&endDate=${reportObj.endDate}&perPage=${reportObj.perPage}&limit=${reportObj.limit}`);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    dispatch({
      type: GET_FASTMOVING_REPORTS,
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
};

export const getNonMovingItemsReports = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    console.log("#action reportObj", reportObj);

    let response = await axios.patch(`${backend_uri_server}/api/v1/getnonMovingItems`, reportObj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_NONMOVING_REPORTS,
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
};

export const getSalesPersonReports = (reportObj) => async (dispatch) => {
  try {
    if (reportObj == "reset") {
      dispatch({
        type: GET_SALESPERSON_REPORTS,
        payload: [],
      });
    } else {
      dispatch(showProgressBar());
      let response = await axios.post(
        `${backend_uri_server}/api/v1/report/saleReport`,
        reportObj
      );

      dispatch({
        type: GET_SALESPERSON_REPORTS,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    } else {
      message.warning(`Something Went Wrong !`);
    }
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getfloorSectionBrandSearch = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(
      `${backend_uri_server}/api/v1/floorSectionBrandSearch`, reportObj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: FLLOR_SECTION_BARND_SEARCH,
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
};

export const getfloorSectionBrandSearchReplace = (reportObj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(
      `${backend_uri_server}/api/v1/floorSectionBrandSearchReplace`, reportObj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    if (reportObj.type == "from") {
      dispatch({
        type: FLLOR_SECTION_BARND_SEARCH_FROM,
        payload: response.data,
      });
    }
    else if (reportObj.type == "to") {
      dispatch({
        type: FLLOR_SECTION_BARND_SEARCH_TO,
        payload: response.data,
      });
    }
    else {
      dispatch({
        type: FLLOR_SECTION_BARND_SEARCH,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSalesPersonComparisionReports =
  (reportObj) => async (dispatch) => {
    try {
      dispatch(showProgressBar());
      let { startDate, endDate } = reportObj;
      console.log("#action reportObj", reportObj);
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/getSaleReportSalesPerson`, reportObj
      );
      if (response.data.length === 0) {
        dispatch(hideProgressBar());
        message.warning(`No Records found !`);
      }

      dispatch({
        type: GET_SALESCOMPARISON_REPORTS,
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
  };

export const getStockAgeingReports = () => async (dispatch) => {
  try {
    // dispatch(showProgressBar());
    // let response = await axios.get(
    //   `${backend_uri_server}/api/v1/getAllStockAge`
    // );
    // if (response.data.length === 0) {
    //   dispatch(hideProgressBar());
    //   message.warning(`No Records found !`);
    // }
    // dispatch({
    //   type: GET_STOCKAGE_REPORTS,
    //   payload: response.data,
    // });
    // dispatch(hideProgressBar());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getStockAgeingReportsBySearch = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_STOCKAGE_REPORTS_BYSEARCH,
        payload: [],
      });
    } else {
      dispatch(showProgressBar());
      let response = await axios.post(`${backend_uri_server}/api/v1/stockAgeBydays?perPage=${obj.perPage}&limit=${obj.limit}`, obj);
      if (response?.data?.data?.length === 0) {
        dispatch(hideProgressBar());
        message.warning(`No Records found !`);
      }
      if (obj?.type === "all") {
        dispatch({
          type: GET_ALL_STOCKAGE_REPORTS_BYSEARCH,
          payload: response.data,
        });
      }
      else {
        dispatch({
          type: GET_STOCKAGE_REPORTS_BYSEARCH,
          payload: response.data,
        });
      }
      dispatch(hideProgressBar());
      return response.data;
    }
  } catch (error) {
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getStockAgeingBiReportsByFilter = (obj, isNew) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_STOCKAGE_BI_REPORTS_BYFILTER,
        payload: [],
      });
    } else {
      dispatch(showProgressBar());
      let response
      if (isNew === "new") {
        response = await axios.post(
          `${backend_uri_server}/api/v1/stockAgingReportByFiltersNew`, obj
        );
      } else {
        response = await axios.post(
          `${backend_uri_server}/api/v1/stockAgingReportByFilters`, obj
        );
      }
      if (response.data.length === 0) {
        dispatch(hideProgressBar());
        message.warning(`No Records found !`);
      }
      dispatch({
        type: GET_STOCKAGE_BI_REPORTS_BYFILTER,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    // message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getTopCustomerReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(`${backend_uri_server}/api/v1/gettingTopCustomer`, obj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_TOPCUSTOMER_REPORTS,
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
};

export const getPurchaseAllReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(`${backend_uri_server}/api/v1/purchaseReport`, obj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_PURCHASEALL_REPORTS,
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
};

export const getSalesReport = (obj, isNew) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response
    if (isNew === "new") {
      response = await axios.post(`${backend_uri_server}/api/v1/salesReportVersion2`, obj);
    } else {
      response = await axios.post(`${backend_uri_server}/api/v1/salesReport`, obj);
    }

    if (response?.data?.data?.length == 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    if (obj?.type === "all") {
      dispatch({
        type: GET_ALL_SALESALL_REPORTS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_SALESALL_REPORTS,
        payload: response.data,
      });
    }

    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    if (error?.response?.status == 400) {
      message.warn("Data Not Found!")
    }
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });

    dispatch(hideProgressBar());
  }
};

export const salesReportDownload = (obj, isNew) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response

    response = await axios.post(`${backend_uri_server}/api/v1/salesReportDownload`, obj);


    if (response?.data?.data?.length == 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }

    if (obj?.type === "all") {
      dispatch({
        type: GET_ALL_SALESALL_REPORTS_DOWNLOAD,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_SALESALL_REPORTS,
        payload: response.data,
      });
    }

    dispatch(hideProgressBar());
    return response.data;
  } catch (error) {
    if (error?.response?.status == 400) {
      message.warn("Data Not Found!")
    }
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });

    dispatch(hideProgressBar());
  }
};

export const getStockReport = (obj) => async (dispatch) => {
  try {
    if (obj === "reset") {
      dispatch({
        type: GET_STOCK_REPORTS,
        payload: [],
      });
    } else {
      dispatch(showProgressBar());
      let response = await axios.post(`${backend_uri_server}/api/v1/getStockDetails`, obj);
      if (response.data.length === 0) {
        dispatch(hideProgressBar());
        message.warning(`No Records found !`);
      }
      dispatch({
        type: GET_STOCK_REPORTS,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getInactiveCustomerReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(`${backend_uri_server}/api/v1/gettingInactiveCustomer`, obj);
    if (response.data.length === 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_INACTIVECUSTOMER_REPORTS,
      payload: response.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());

  }
};


export const getSalesAgeingReports = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/gettingInactiveCustomer`, obj);
    if (response.data.length === 0) {
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_SALESAGEING_REPORTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSalesandSalesAgeReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.post(`${backend_uri_server}/api/v1/salesDetailsbyfilterwithdays`, obj);
    if (response && response.data && response.data.data.length < 0) {
      dispatch(hideProgressBar());
      message.warning(`No Records found !`);
    }
    dispatch({
      type: GET_SALESANDSALESAGE_REPORTS,
      payload: response.data,
    });
    dispatch(hideProgressBar());
    return response.data
  } catch (error) {
    message.error(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());

  }
};

export const getCustomerReports = () => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    let response = await axios.get(`${backend_uri_server}/api/v1/customerDetailsReport`);
    // console.log("response.data", response.data);
    dispatch({
      type: GET_CUSTOMER_REPORT,
      payload: response.data.data,
    });
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.data.message)

    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};


export const getbestSellingReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      dispatch({
        type: GET_BEST_SELLING_REPORT,
        payload: [],
      });
    }
    else {
      let response = await axios.post(`${backend_uri_server}/api/v1/report/bestSellingProducts`, obj);
      if (response && response.status == 200 && response.data.length == 0) {
        message.error("No data found")
      }
      dispatch({
        type: GET_BEST_SELLING_REPORT,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.data.message)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};


export const getbestBrandReports = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      dispatch({
        type: GET_BEST_BRAND_REPORT,
        payload: [],
      });
    }
    else {
      let response = await axios.post(`${backend_uri_server}/api/v1/bestSellingBrand`, obj);
      if (response && response.status == 200 && response.data.length == 0) {
        message.error("No data found")
      }
      dispatch({
        type: GET_BEST_BRAND_REPORT,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
  } catch (error) {
    message.error(error.response.data.message)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};


export const getOpeningStockList = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      dispatch({
        type: GET_OPENING_STOCK_LIST,
        payload: [],
      });
    }
    else {
      let response = await axios.post(`${backend_uri_server}/api/v1/getOpeningStockList`, obj);
      if (response && response.status == 200 && response.data.length == 0) {
        message.error("No data found")
      }
      dispatch({
        type: GET_OPENING_STOCK_LIST,
        payload: response.data,
      });
    }
    dispatch(hideProgressBar());
  } catch (error) {
    message.error("No data found")
    // message.error(error.response.data.message)
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const DownloadPurchaseReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return [];
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/DownloadPurchaseReport`,
        obj
      );

      dispatch(hideProgressBar());
      return response
    }
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};
export const DownloadSalesReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/DownloadSalesReport`,
        obj
      );

      dispatch(hideProgressBar());
      return response
    }
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};

export const DownloadSalesReturnReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/DownloadSalesReturnReport`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};
export const DownloadSalesDefectiveReturnReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/downloadDefectiveReturnReport`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};
export const DownloadPurchaseReturnReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/DownloadPurchaseReturnReport`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};

export const DownloadOpeningStockReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/downloadOpeningStockReport`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};

export const getSalesOrderReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getSalesOrderReport?perPage=${obj.perPage}&limit=${obj.limit}`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};

export const getSalesOrderItemReport = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj === "reset") {
      return []
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getSalesOrderItemReport`,
        obj
      );

      return response
    }
    dispatch(hideProgressBar());
  } catch (error) {
    // message.error(error.response.data.message)
    dispatch(hideProgressBar());
    return []
  }
};
