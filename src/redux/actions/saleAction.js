import axios from "axios";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
import {
  CREATE_SALES,
  GET_ERRORS,
  GET_SALES_BILL,
  GET_SALES_BILLS_USERID,
  GET_SALES_INVOICE,
  GET_SALES_LIST,
  GET_SALES_PRODUCT_BY_INVOICE_ID,
  GET_SALES_RETURNS,
  GET_SALES_RETURN_BILL,
  GET_SALES_RETURNS_DEFECTED,
  GET_SALES_USING_BARCODE_USERID,
  GET_SALES_RETURN_SALERETURNID,
  GET_DEFECTED_PRODUCT_BILL,
  GET_DEFECTED_PRODUCT_SALERETURNID,
  GET_SALESRETURN_INVOICE,
  GET_SALESRETURNDEFECTED_INVOICE,
  DELETE_SALE,
  SALES_BYUSER,
  GET_SALE_SEARCH_VALUE,
  GET_SALES_LIST_BYDATE,
  GET_SALES_ORDERBYBILL_BYDATE,
  GET_SALESRETURN_BYDATERANGE,
  GET_SALESRETURNBILL_BYDATERANGE,
  GET_SALESRETURN_DEFECTED_BYDATE,
  GET_ALLDEFECTEDPRODUCTBILL_BYDATE,
  CHECKLAST_FIVEBILLS,
  GET_SALESWITHCUSTOMER,
  GET_DEFECTIVE_SALES_RETURN_SALERETURNID,
  GET_SALES_BILLBYCUSTOMERID,
  GET_SALES_LISTBYINVOICEID,
  GET_SALESDETAILS_BYINVOICEIDS,
  CHECKBILL_IS_VERIFIED,
  GET_SALE_DEFECTIVE_SEARCH_VALUE,
  GET_ECOM_SALES_INVOICE,
  DELETE_SALES_BILL,
  GET_SALESORDER_BYCUSTOMERID,
  SALES_BILL_BY_SALES_PERSON_ID,
  SALES_BY_SEARCH_VALUE,
  GET_SALE_ORDER_SEARCH_VALUE,
  GET_UPLODED_LR_LIST,
  GET_LASTSALESDATA_FOR_LR,
} from "./type";
import { message } from "antd";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";
import Swal from "sweetalert2";

export const createSales =
  (saleObj, history, type, isSalesOrder, htmlContent) => async (dispatch) => {
    try {
      if (type == "blank") {
        dispatch({
          type: CREATE_SALES,
          payload: {},
        });
      } else {
        let resp = await axios.post(
          `${backend_uri_server}/api/v1/sale`,
          saleObj
        );
        if (resp.status === 200) {
          dispatch({
            type: CREATE_SALES,
            payload: resp.data,
          });
          return resp.data;
        }
        return resp.data;
      }
    } catch (error) {
      message.error(error.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const updateSales = (saleObj, history, type) => async (dispatch) => {
  try {
    if (type == "blank") {
      dispatch({
        type: CREATE_SALES,
        payload: {},
      });
    } else {
      let resp = await axios.post(
        `${backend_uri_server}/api/v1/updateSales`,
        saleObj
      );
      if (resp.status === 200) {
        dispatch({
          type: CREATE_SALES,
          payload: resp.data,
        });
        return resp.data;
      }

      // message.success(`Sale Completed Succesfully`);
      // if (saleObj.salesOrder == true) {
      //   // history.push("/dagaImpex/salesOrder",);
      //   // window.location.reload(true)
      // }
      // dispatch({
      //   type: CREATE_SALES,
      //   payload: resp.data,
      // });
      // return resp.data
    }
  } catch (error) {
    message.error(error.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const createOnlineSales =
  (saleObj, history, type) => async (dispatch) => {
    try {
      if (type == "blank") {
        dispatch({
          type: CREATE_SALES,
          payload: {},
        });
      } else {
        let resp = await axios.post(
          `${backend_uri_server}/api/v1/ecomCreateSale`,
          saleObj
        );
        if (resp && resp.status === 200) {
          message.success(resp.data);
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      }
    } catch (error) {
      message.error(error.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const getSaleOrderBills = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/salesOrderBill?perPage=${10}&limit=${limit}`
    );
    if (response.data.length < 0) {
      message.error("No Data Found");
      dispatch(hideProgressBar());
    }
    dispatch({
      type: GET_SALES_BILL,
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

export const salesBillByCustomerId = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/salesBillByCustomerId`,
      obj
    );
    if (response.data.length < 0) {
      message.error("No Data Found");
      dispatch(hideProgressBar());
    }
    dispatch({
      type: GET_SALES_BILLBYCUSTOMERID,
      payload: response.data,
    });
    dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSaleOrderBillsBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_SALES_ORDERBYBILL_BYDATE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/salesOrderBillDataByDateRange`,
        obj
      );
      dispatch({
        type: GET_SALES_ORDERBYBILL_BYDATE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_SALES_ORDERBYBILL_BYDATE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSaleUsingInvoiceId = (id) => async (dispatch) => {
  try {
    if (id == "reset") {
      dispatch({
        type: GET_SALES_INVOICE,
        payload: [],
      });
    } else {
      let response = await axios.get(`${backend_uri_server}/api/v1/sale/${id}`);
      dispatch({
        type: GET_SALES_INVOICE,
        payload: response.data,
      });
      return response;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getEcomSaleUsingInvoiceId = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_ECOM_SALES_INVOICE,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/ecomSalelistbybillId`,
        obj
      );
      dispatch({
        type: GET_ECOM_SALES_INVOICE,
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

export const getSaleDetailsByinvoiceIds = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_SALES_INVOICE,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getSelesDetailsByInvoiceIds/`,
        obj
      );
      dispatch({
        type: GET_SALESDETAILS_BYINVOICEIDS,
        payload: response.data,
      });
      return response;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSalesBillListByIds = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_SALES_INVOICE,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getSelesBillListByIds`,
        obj
      );
      dispatch({
        type: GET_SALES_LISTBYINVOICEID,
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

export const checkBillIsVerified = (obj) => async (dispatch) => {
  try {
    if (obj === "reset") {
      dispatch({
        type: CHECKBILL_IS_VERIFIED,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/checkbillisverifed`,
        obj
      );
      dispatch({
        type: CHECKBILL_IS_VERIFIED,
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

export const deleteSales = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/sale/${id}`
    );
  } catch (error) {
    alert(error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSalesBill = (id) => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/sales/bill/${id}`
  );
  try {
    dispatch({
      type: GET_SALES_BILLS_USERID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getSalesUsingBarcode = (barcode, id) => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/sales/purchase/${barcode}/${id}`
  );
  try {
    dispatch({
      type: GET_SALES_USING_BARCODE_USERID,
      payload: response.data,
    });
    console.log("div", response.data);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const saleReturn = (returnObj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/sale`,
      returnObj
    );
    if (response.status == 200) {
      message.success(`Sale Returned Succesfully`);
      window.location.reload(0);
    }
    dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};
export const saleReturnDefected = (returnDefectedObj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/createDefectiveReturn`,
      returnDefectedObj
    );
    if (response.status == 200) {
      message.success(`Sale Returned Succesfully`);
      // window.location.reload(0);
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

export const updateSaleReturnDefected =
  (returnDefectedObj) => async (dispatch) => {
    dispatch(showProgressBar());
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/updateDefectiveReturn`,
        returnDefectedObj
      );
      if (response.status == 200) {
        message.success(`Sale Returned Succesfully`);
        // window.location.reload(0);
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

export const getSalesReturns = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/salesreturn?perPage=${40}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_SALES_RETURNS,
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

export const getSalesReturnsBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_SALESRETURN_BYDATERANGE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/salesReturnDataByDateRange?perPage=${40}&limit=${
          obj.limit
        }`,
        obj
      );
      dispatch({
        type: GET_SALESRETURN_BYDATERANGE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_SALESRETURN_BYDATERANGE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getAllSalesReturnBill = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/salereturnbill?perPage=${10}&limit=${limit}`
    );
    dispatch({
      type: GET_SALES_RETURN_BILL,
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

export const checkReturnBill = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/salesItemListBillNotCreated`,
      obj
    );
    dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const completeSalesReturnCheck = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/CreateSalesReturnBill`,
      obj
    );
    dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getAllSalesReturnBillBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_SALESRETURNBILL_BYDATERANGE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/salesReturnBillDataByDateRange`,
        obj
      );
      dispatch({
        type: GET_SALESRETURNBILL_BYDATERANGE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_SALESRETURNBILL_BYDATERANGE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getsaleReturnBillBysaleReturnId =
  (saleReturnId, limit) => async (dispatch) => {
    try {
      if (saleReturnId == "reset") {
        dispatch({
          type: GET_SALES_RETURN_SALERETURNID,
          payload: [],
        });
      } else {
        let response = await axios.get(
          `${backend_uri_server}/api/v1/saleReturnBill/saleReturnId?saleReturnId=${saleReturnId}`
        );
        console.log("saleReturnId====", saleReturnId);

        dispatch({
          type: GET_SALES_RETURN_SALERETURNID,
          payload: response.data,
        });
        return response;
      }
    } catch (error) {
      message.error("Something went wrong!");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const getDefectiveSaleReturnBillBysaleReturnId =
  (saleReturnId) => async (dispatch) => {
    try {
      if (saleReturnId == "reset") {
        dispatch({
          type: GET_SALES_RETURN_SALERETURNID,
          payload: [],
        });
      } else {
        let response = await axios.get(
          `${backend_uri_server}/api/v1/defectiveBillDetailsWithId?defectiveReturnId=${saleReturnId}`
        );
        console.log("saleReturnId====", saleReturnId);

        dispatch({
          type: GET_DEFECTIVE_SALES_RETURN_SALERETURNID,
          payload: response.data,
        });
        console.log("testing", response.data);
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const getSalesList = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/salesbill?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_SALES_LIST,
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

export const getSalesListBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      console.log("check reset");
      dispatch({
        type: GET_SALES_LIST_BYDATE,
        payload: [],
      });
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/salesDataByDateRange`,
        obj
      );
      if (response && response.data && response.data.details.length === 0) {
        message.error("Data not found");
      }
      dispatch({
        type: GET_SALES_LIST_BYDATE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_SALES_LIST_BYDATE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getSalesReturnsDefected = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/salesreturn/defected?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_SALES_RETURNS_DEFECTED,
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

export const getSalesReturnsDefectedBydate =
  (obj, reset) => async (dispatch) => {
    dispatch(showProgressBar());
    try {
      if (reset == "reset") {
        dispatch({
          type: GET_SALESRETURN_DEFECTED_BYDATE,
          payload: [],
        });
        dispatch(hideProgressBar());
      } else {
        const response = await axios.post(
          `${backend_uri_server}/api/v1/defectedProductDataByDateRange`,
          obj
        );
        dispatch({
          type: GET_SALESRETURN_DEFECTED_BYDATE,
          payload: response.data,
        });
        dispatch(hideProgressBar());
      }
    } catch (error) {
      message.error(`Data not found`);
      dispatch({
        type: GET_SALESRETURN_DEFECTED_BYDATE,
        payload: [{ message: "Empty" }],
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      dispatch(hideProgressBar());
    }
  };

export const getSaleProductByInvoiceId = (id) => async (dispatch) => {
  try {
    if (id == "reset") {
      dispatch({
        type: GET_SALES_PRODUCT_BY_INVOICE_ID,
        payload: [],
      });
    } else {
      let response = await axios.get(`${backend_uri_server}/api/v1/sale/${id}`);
      dispatch({
        type: GET_SALES_PRODUCT_BY_INVOICE_ID,
        payload: response.data,
      });
      console.log("=====", response.data);
      return response;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getLastQuantityUsedBarcode = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getLastQuantityUsedBarcode`,
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

export const getDetailSearch = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_SALESWITHCUSTOMER,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getSalesWithCustomer/`,
        obj
      );
      console.log("check my response test", response);
      dispatch({
        type: GET_SALESWITHCUSTOMER,
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

export const getProductsVerified = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/markasVerified`,
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

export const getDeleteSalesBill = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteSales`,
      obj
    );
    message.success(response.data);
    // dispatch({
    //   type: GET_PURCHASE,
    //   payload: response.data,
    // });
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//defectedproduct
export const getAlldefectedProductBill = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/defectedProductbill?perPage=${10}&limit=${limit}`
    );
    dispatch({
      type: GET_DEFECTED_PRODUCT_BILL,
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

export const getAlldefectedProductBillBydate =
  (obj, reset) => async (dispatch) => {
    dispatch(showProgressBar());
    try {
      if (reset == "reset") {
        dispatch({
          type: GET_ALLDEFECTEDPRODUCTBILL_BYDATE,
          payload: [],
        });
        dispatch(hideProgressBar());
      } else {
        const response = await axios.post(
          `${backend_uri_server}/api/v1/defectedProductBillDataByDateRange`,
          obj
        );
        dispatch({
          type: GET_ALLDEFECTEDPRODUCTBILL_BYDATE,
          payload: response.data,
        });
        dispatch(hideProgressBar());
      }
    } catch (error) {
      message.error(`Data not found`);
      dispatch({
        type: GET_ALLDEFECTEDPRODUCTBILL_BYDATE,
        payload: [{ message: "Empty" }],
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      dispatch(hideProgressBar());
    }
  };

export const getdefectedProductBillsaleReturnId =
  (saleReturnId, limit) => async (dispatch) => {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/defectedProductbill/saleReturnId?perPage=${10}&limit=${limit}&saleReturnId=${saleReturnId}`
      );
      console.log("saleReturnId====", saleReturnId);

      dispatch({
        type: GET_DEFECTED_PRODUCT_SALERETURNID,
        payload: response.data,
      });
      console.log("testing", response.data);
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

//for saleReturn Data
export const getSalesUsingsaleReturnId = (saleReturnId) => async (dispatch) => {
  console.log("front", saleReturnId);
  let response = await axios.get(
    `${backend_uri_server}/api/v1/getSalesUsingsaleReturnId?saleReturnId=${saleReturnId}`
  );
  console.log("GET_SALESRETURN_INVOICE ", response.data);
  try {
    dispatch({
      type: GET_SALESRETURN_INVOICE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
// for deleting saleReturn from edit
export const deletesaleReturn = (_id) => async (dispatch) => {
  console.log("_id", _id);
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/delete/saleReturn`,
      { _id: _id }
    );

    dispatch({
      type: DELETE_SALE,
      payload: _id,
    });
    message.success(`saleReturn Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for sale Return Defected edit
export const getSalesReturnDefectedUsingsaleReturnId =
  (saleReturnId) => async (dispatch) => {
    console.log("front", saleReturnId);
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getSalesReturnDefectedUsingsaleReturnId?saleReturnId=${saleReturnId}`
    );
    console.log("GET_SALESRETURN_INVOICE ", response.data);
    try {
      dispatch({
        type: GET_SALESRETURNDEFECTED_INVOICE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

//for deleting sale return defected from edit
export const deletesaleReturnDefected = (_id) => async (dispatch) => {
  console.log("_id", _id);
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/delete/defectiveReturn`,
      { _id: _id }
    );

    dispatch({
      type: DELETE_SALE,
      payload: _id,
    });
    message.success(`saleReturn Defected Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for getting last five bills
export const checkLastFiveBills = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/getLastFiveBill`,
      obj
    );

    dispatch({
      type: CHECKLAST_FIVEBILLS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//Getting Sales Orders
export const getSalesByUser = (perPage, pageNo, obj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/salesbillByUserId?perPage=${perPage}&pageNo=${pageNo}`,
      obj
    );
    console.log("sales response", response);
    dispatch({
      type: SALES_BYUSER,
      payload: response.data,
    });
  } catch (error) {
    console.log("inside catch");
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for getting search data sale
export const saleBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_SALE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/salesBySearchValue`,
        obj
      );
      if (response && response.data.details.length == 0) {
        message.error("No Data Found!");
      }
      dispatch({
        type: GET_SALE_SEARCH_VALUE,
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
//for getting search data sale return
export const salesReturnBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_SALE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/salesReturnBySearchValue`,
        obj
      );
      dispatch({
        type: GET_SALE_SEARCH_VALUE,
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

//for getting search data for defective return
export const salesReturnDefectiveBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_SALE_DEFECTIVE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/defectivesalesReturnBySearchValue`,
        obj
      );
      dispatch({
        type: GET_SALE_DEFECTIVE_SEARCH_VALUE,
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

export const deleteSaleBill = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteSalesBill`,
      obj
    );
    if (response && response.status === 200) {
      message.success(response.data.message);
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for sale Return Defected edit
export const getSalesOrderByCustomer = (customerId) => async (dispatch) => {
  if (customerId === "reset") {
    dispatch({
      type: GET_SALESORDER_BYCUSTOMERID,
      payload: [],
    });
  } else {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/salesOrderBillByCustomerId`,
      { customerId: customerId }
    );
    try {
      dispatch({
        type: GET_SALESORDER_BYCUSTOMERID,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const salesBillBySalesPersonId = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: SALES_BILL_BY_SALES_PERSON_ID,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/salesBillBySalesPersonId`,
        obj
      );
      dispatch({
        type: SALES_BILL_BY_SALES_PERSON_ID,
        payload: response.data,
      });
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message);
      dispatch({
        type: SALES_BILL_BY_SALES_PERSON_ID,
        payload: [],
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const salesBySearchValuebySalesPersonId = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/salesBySearchValuebySalesPersonId`,
      obj
    );
    dispatch({
      type: SALES_BY_SEARCH_VALUE,
      payload: response.data,
    });
  } catch (error) {
    message.error("Failed To Search Try Again");
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const deleteSalesOrderBillById = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteSaleOrderBill`,
      obj
    );
    message.success(response?.data?.message);
    return response;
  } catch (error) {
    message.error(error?.response?.data?.message);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const sendMessageOnWhatsapp = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sendSalesBillbywhatsapp`,
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

export const salesBillDetails = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/salesBillDetails`,
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

export const uploadImage = (obj) => async (dispatch) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    let response = await axios.post(
      `${backend_uri_server}/api/v1/uploadImage`,
      obj,
      headers
    );
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for getting search data sale
export const saleOrderBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_SALE_ORDER_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/salesOrerBySearchValue`,
        obj
      );
      if (response && response.data.details.length == 0) {
        message.error("No Data Found!");
      }
      dispatch({
        type: GET_SALE_ORDER_SEARCH_VALUE,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      message.error("Failed To Search Try Again");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const checkSalesitemisdeleted = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/checkSalesitemisdeleted`,
      obj
    );
    return response;
  } catch (error) {
    console.log("errr", error);
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateSaleReturn = (returnObj) => async (dispatch) => {
  // dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateSalesReturn`,
      returnObj
    );
    if (response.status == 200) {
      message.success(`Sale Returned Updated Succesfully`);
      window.location.reload(0);
    }
    // dispatch(hideProgressBar());
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const sendMergeBillByWhatsApp = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sendMergeBillByWhatsApp`,
      obj
    );
    console.log("rescheck", response);
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for getting UplodedLr List
export const fetchUploadedLrList = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_UPLODED_LR_LIST,
      payload: [],
    });
  } else {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getAllLRlist`,
        obj
      );
      if (response && response.data.data.length == 0) {
        message.error("No Data Found!");
        dispatch({
          type: GET_UPLODED_LR_LIST,
          payload: [],
        });
      } else {
        dispatch({
          type: GET_UPLODED_LR_LIST,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

//for getting last bill for  LR
export const fetchLastBillForLR = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_LASTSALESDATA_FOR_LR,
      payload: [],
    });
  } else {
    try {
      let response = await axios.get(
        `${backend_uri_server}/api/v1/salesBillBYDays`
      );

      console.log("check my  response", response);
      if (response && response.data.details.length == 0) {
        message.error("No Data Found!");
        dispatch({
          type: GET_LASTSALESDATA_FOR_LR,
          payload: [],
        });
      } else {
        dispatch({
          type: GET_LASTSALESDATA_FOR_LR,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const uploadLr = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/createLR`,
      obj
    );
    console.log("rescheck lr response", response);
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const sendMBillByWhatsAppToAgent = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sendMergeBilltoAgent`,
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

export const sendSRMessageOnWhatsapp = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/SendSalesReturnBillByWhatsapp`,
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

export const storePDFinSalesBill = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/storePDFinSalesBill`,
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

export const sendSalesBilltoMultipleCustomer = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sendSalesBilltoMultipleCustomer`,
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

export const getInvoiceIdByCustomer = (obj) => async (dispatch) => {
  try {
    let InvoiceIds = await axios.post(
      `${backend_uri_server}/api/v1/getInvoiceIds`,
      obj
    );
    if (InvoiceIds?.data?.invoiceIds.length > 0) {
      return InvoiceIds?.data?.invoiceIds;
    } else {
      message.error(InvoiceIds?.data?.message);
      return InvoiceIds?.data?.invoiceIds;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateStatusBillGenerated = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateStatusBillGenerated`,
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

export const selectedBillVerified = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/selectedBillVerified`,
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

export const getAllSpecialDiscountBill = () => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/discountBillDetails`
    );
    dispatch(hideProgressBar());
    return response?.data?.data || [];
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const deleteSpecialDiscountBill = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteDiscountBill`,
      obj
    );
    dispatch(hideProgressBar());
    message.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const listofshiftstoretowh = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/listofshiftstoretowh`,
      obj
    );
    dispatch(hideProgressBar());
    return response?.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const listofwarehouseConfirmationProduct = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/storetowhTransitList`,
      obj
    );
    dispatch(hideProgressBar());
    return response?.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const updateStatusStoreToWh = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateStatusStoreToWh`,
      obj
    );
    dispatch(hideProgressBar());
    return response?.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const updateTakenOutAndBayinBills = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateTakenOutAndBayinBills`,
      obj
    );
    dispatch(hideProgressBar());

    return response?.data;
  } catch (error) {
    dispatch(hideProgressBar());

    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateCommentsSaleandSO = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateCommentsSaleandSO`,
      obj
    );
    dispatch(hideProgressBar());

    return response?.data;
  } catch (error) {
    dispatch(hideProgressBar());

    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updateStatusSoBillGenerated = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateStatusSoBillGenerated`,
      obj
    );
    dispatch(hideProgressBar());

    return response;
  } catch (error) {
    dispatch(hideProgressBar());

    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
