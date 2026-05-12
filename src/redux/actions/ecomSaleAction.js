import axios from "axios";
import { message } from "antd";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import {
  GET_ECOM_SALE_Bill,
  GET_ERRORS,
  GET_ECOM_SALE_List,
  Edit_USER_Credit,
  UPDATE_ORDERSTATUS,
  GET_ECOM_SALES_BILLBYCUSTOMERID,
  GET_ECOM_SALES_LISTBY_CUSTOMERID,
  CHECK_ECOM_BILL_IS_VERIFIED,
  GET_ECOM_SALESDETAILS_BYINVOICEIDS,
  ECOM_SALES_BILL_DETAILS,
  ECOM_SALES_BILL_WHATSAPP,
  CREDIT_PAYMENT_BY_SEARCH_VALUE,
  CREDIT_PAYMENT_BY_DATE_RANGE,
  GET_ECOM_SALE_RETURN_Bill,
  GET_ECOM_SALE_RETURN_ProductBY_ID,
} from "./type";

import { hideProgressBar, showProgressBar } from "./yourProgressBarActions";

// get the EcomSale bill List for that call the api
export const getEcomSalebillList = (Obj) => async (dispatch) => {
  try {
    if (Obj === "reset") {
      dispatch({
        type: GET_ECOM_SALE_Bill,
        payload: [],
      });
    } else {
      let obj = {
        billType: Obj.billType,
      };
      let response = await axios.post(
        `${backend_uri_server}/api/v1/ecomSalebillbybillType?perPage=${10}&limit=${
          Obj.limit
        }`,
        obj
      );
      dispatch({
        type: GET_ECOM_SALE_Bill,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// get the Ecom sales return bill list
export const getEcomSalesReturnBillList = (Obj) => async (dispatch) => {
  try {
    if (Obj === "reset") {
      dispatch({
        type: GET_ECOM_SALE_RETURN_Bill,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/ecomSaleReturnBill`,
        Obj
      );
      if (response && response.status == 200) {
        dispatch({
          type: GET_ECOM_SALE_RETURN_Bill,
          payload: response?.data?.data,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_ECOM_SALE_RETURN_Bill,
      payload: [],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// get the Ecom sales return Product By Sales Return Id
export const getProductsBySalesReturnId = (Obj) => async (dispatch) => {
  try {
    if (Obj === "reset") {
      dispatch({
        type: GET_ECOM_SALE_RETURN_ProductBY_ID,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/ecomSaleReturnByReturnId`,
        Obj
      );
      if (response && response.status == 200) {
        dispatch({
          type: GET_ECOM_SALE_RETURN_ProductBY_ID,
          payload: response?.data,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// to get the Product that will be sale for that bill call api here
export const getEcomSaleListbybillId = (Obj) => async (dispatch) => {
  try {
    if (Obj === "reset") {
      dispatch({
        type: GET_ECOM_SALE_List,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/ecomSalelistbybillId`,
        Obj
      );

      dispatch({
        type: GET_ECOM_SALE_List,
        payload: response.data,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// to Edit Ecom User Credit Call the API Here
export const editEcomUserCredit = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ecomAddCredittoUser`,
      Obj
    );
    dispatch({
      type: Edit_USER_Credit,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// Reject Sales Return From Admin
export const rejectSalesReturn = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/rejectEcomSaleReturn`,
      Obj
    );
    return response
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//to Update the Order Status to Deliver Call the API Here
export const updateOrderStatus = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ecomOrderStatusDeliver`,
      Obj
    );
    dispatch({
      type: UPDATE_ORDERSTATUS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const ecomSalesBillByCustomerId = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/EcomsalesBillByCustomerId`,
      obj
    );
    if (response.data.length == 0) {
      message.error("No Data Found");
      dispatch(hideProgressBar());
    }
    dispatch({
      type: GET_ECOM_SALES_BILLBYCUSTOMERID,
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

export const getEcomSalesBillListByIds = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getEcomSelesBillListByIds`,
      obj
    );
    dispatch({
      type: GET_ECOM_SALES_LISTBY_CUSTOMERID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const checkEcomBillIsVerified = (obj) => async (dispatch) => {
  try {
    if (obj === "reset") {
      dispatch({
        type: CHECK_ECOM_BILL_IS_VERIFIED,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/checkEcomSalesbillisverifed`,
        obj
      );
      dispatch({
        type: CHECK_ECOM_BILL_IS_VERIFIED,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getEcomProductsVerified = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/markasEcomSalesVerified`,
      obj
    );
    // message.success(response.data)
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getEcomDetailsByinvoiceIds = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getEcomSalesByInvoiceIds`,
      obj
    );
    dispatch({
      type: GET_ECOM_SALESDETAILS_BYINVOICEIDS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const ecomOrderApprove = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ecomOrderApprove`,
      Obj
    );
    dispatch({
      type: UPDATE_ORDERSTATUS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const ecomReturnCreate = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/createEcomReturn`,
      Obj
    );
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const ecomReturnAcceptedByAdmin = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/completeEcomSaleReturn`,
      Obj
    );
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// export const ecomSalesBillDetails = (Obj) => async (dispatch) => {
//   try {

//       let response = await axios.post(
//         `${backend_uri_server}/api/v1/ecomSalesBillDetails`,
//         Obj
//       );
//       dispatch({
//         type: ECOM_SALES_BILL_DETAILS,
//         payload: response.data,
//       });

//   } catch (error) {
//     dispatch({
//       type: GET_ERRORS,
//       payload: error,
//     });
//   }
// };

export const ecomSalesBillDetails = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ecomSalesBillDetails`,
      obj
    );
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const sendEcomSalesBillbywhatsapp = (Obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sendEcomSalesBillbywhatsapp`,
      Obj
    );
    dispatch({
      type: ECOM_SALES_BILL_WHATSAPP,
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

export const creditPaymentBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: CREDIT_PAYMENT_BY_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/creditPaymentBySearchValue`,
        obj
      );
      if (response && response.data.details.length == 0) {
        message.error("No Data Found!");
      }
      dispatch({
        type: CREDIT_PAYMENT_BY_SEARCH_VALUE,
        payload: response.data,
      });
    } catch (error) {
      message.error("Failed To Search Try Again");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const creditPaymentByDateRange = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: CREDIT_PAYMENT_BY_DATE_RANGE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/creditPaymentByDateRange `,
        obj
      );
      if (response && response.data.details.length == 0) {
        message.error("No Data Found!");
      }
      dispatch({
        type: CREDIT_PAYMENT_BY_DATE_RANGE,
        payload: response.data,
      });
      return response;
    } catch (error) {
      message.error("Failed To Search Try Again");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};
