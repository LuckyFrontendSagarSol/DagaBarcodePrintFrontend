import axios from "axios";
import {
  ADD_PURCHASE,
  DELETE_PURCHASE,
  GET_PURCHASES,
  GET_ERRORS,
  GET_PURCHASES_BILL,
  GET_PURCHASE,
  GET_INVENTORY,
  ADD_ECOM_SALE,
  GET_ECOM_SALES,
  GET_PURCHASE_RETURN_BARCODE,
  GET_PURCHASE_RETURNS,
  GET_PURCHASE_RETURN_BILLLIST,
  GET_PURCHASE_RETURN_BILLLIST_BYID,
  ADD_PO,
  GET_POCREDENTIALS,
  GET_PURCHASERETURN_INVOICE,
  GET_USERS_NAME_USERNAME,
  GET_PURCHASE_SEARCH_VALUE,
  ADD_IMAGE_BRAND,
  GET_PURCHASES_BYDATE,
  GET_PURCHASESBILLS_BYDATE,
  GET_PURCHASERETURN_BYDATE,
  GET_PURCHASE_RETURN_BILLLIST_BYDATE,
  GET_PURCHASES_BYID,
  ADD_ONLINE_ECOM_SALE,
  GET_INVENTORY_BYSEARCH,
  GET_GENERATEBARCODE_BYSEARCH,
  GET_NAGITIVE_INVENTORY,
  GET_BRAND_DESIGN_COMBINATION,
  GET_BRAND_DESIGN_COMBO_FORSALE,
  GET_DESIGNANDBRAND_BY_BARCODE,
  GET_AVAILABLE_STOCK,
  GET_AVAILABLE_STOCK_BY_SEARCH,
  GET_BANNER_LIST,
  GET_LATEST_BANNER_LIST,
  STOCK_FILTER_SALESAPP,
  STOCK_SEARCH_SALESAPP,
  STOCK_DETAILS_BY_BARCODE,
  STOCK_DETAILS_BY_BRAND,
  GET_CHECKOUT_BANNER,
  GET_CART_CHECKOUT_BANNERS,
  GET_SET_BARCODES
} from "./type";
import { message } from "antd";

import { backend_uri_server, backend_uri_local } from "../../util/constants";
import { showProgressBar, hideProgressBar } from "./yourProgressBarActions";

export const addPurchase = (purchaseobj, location) => async (dispatch) => {
  const status = location.includes("New");
  try {
    let response;
    if (status) {
      response = await axios.post(
        `${backend_uri_server}/api/v1/createPurchases`,
        purchaseobj
      );
    } else {
      response = await axios.post(
        `${backend_uri_server}/api/v1/purchase`,
        purchaseobj
      );
    }

    dispatch({
      type: ADD_PURCHASE,
      payload: response.data,
    });
    // message.success(`Purchase Added Successfully`)
    return response;
    // .then(window.location.reload(0));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getPurchases = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchase?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_PURCHASES,
      payload: response.data,
    });
    dispatch(showProgressBar());
    dispatch(showProgressBar());
    dispatch(showProgressBar());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(showProgressBar());
  }
};

export const getPurchasesBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_PURCHASES_BYDATE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/purchaseDataByDateRange`,
        obj
      );
      dispatch({
        type: GET_PURCHASES_BYDATE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: GET_PURCHASES_BYDATE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getPurchasesById = (purchaseId) => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchase/purchaseid/${purchaseId}/0`
  );
  try {
    dispatch({
      type: GET_PURCHASES_BYID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getUpdatePurchaseBill =
  (requestObj, location) => async (dispatch) => {
    try {
      let response;
      if (location === "new") {
        response = await axios.post(
          `${backend_uri_server}/api/v1/updatePurchases`,
          requestObj
        );
      } else {
        response = await axios.post(
          `${backend_uri_server}/api/v1/updatePurchase`,
          requestObj
        );
      }

      // if (response.status == 200) {
      //   message.success(response.data)
      // }
      return response;
      // dispatch({
      //   type: GET_PURCHASES_BYID,
      //   payload: response.data,
      // });
    } catch (error) {
      message.error(error.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const getGeneratedBarcodes = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchase/barcode/0/?perPage=${30}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_PURCHASES,
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

export const getBarcodeBySearch = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_GENERATEBARCODE_BYSEARCH,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/purchaseDataByBarcode`,
        obj
      );
      dispatch({
        type: GET_GENERATEBARCODE_BYSEARCH,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const deletePurchase = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${backend_uri_server}/api/v1/purchase/${id}`
    );

    dispatch({
      type: DELETE_PURCHASE,
      payload: id,
    });
    message.success(`Purchase Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getLookupData = (lookupObj) => async (dispatch) => {
  let response = await axios.post(
    `${backend_uri_server}/api/v1/purchase/lookup/0`,
    lookupObj
  );

  try {
    dispatch({
      type: GET_PURCHASES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getPurchaseBills = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchasebill?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_PURCHASES_BILL,
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

export const getPurchaseBillsBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_PURCHASESBILLS_BYDATE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/purchaseBillDataByDateRange`,
        obj
      );
      dispatch({
        type: GET_PURCHASESBILLS_BYDATE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_PURCHASESBILLS_BYDATE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getPurchaseByBarcode = (lookupObj) => async (dispatch) => {
  let response = await axios.post(
    `${backend_uri_server}/api/v1/purchase/barcode/lookup/0`,
    lookupObj
  );
  try {
    dispatch({
      type: GET_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getPurchaseByBarcodeSale = (lookupObj) => async (dispatch) => {
  let response = await axios.post(
    `${backend_uri_server}/api/v1/sales/barcode`,
    lookupObj
  );
  try {
    dispatch({
      type: GET_PURCHASE,
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

export const getPurchaseByBarcodeForSaleApplication =
  (lookupObj) => async (dispatch) => {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/sales/barcodeDetails`,
      lookupObj
    );
    try {
      dispatch({
        type: GET_PURCHASE,
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

export const getDeletePurchaseBill = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deletePurchase`,
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

export const getInventory = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchase/inventory/0?perPage=${100}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_INVENTORY,
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

export const getInventoryStatus = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getInventoryStatus`
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

export const getNegativeInventory = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/inventoryMinusList`
    );
    dispatch({
      type: GET_NAGITIVE_INVENTORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getInventoryBySearch = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (obj == "reset") {
      dispatch({
        type: GET_INVENTORY_BYSEARCH,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/inventoryDatabyBarcode`,
        obj
      );
      dispatch({
        type: GET_INVENTORY_BYSEARCH,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const getUniquePurchases = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  const obj2 = {
    designNumber: obj.searchValue,
    brand: obj.type,
    type: "productList",
  };
  let response = await axios.post(
    `${backend_uri_server}/api/v1/purchase/unique/sales`,
    obj2
  );
  try {
    if (response && (response.status == 200) & (response.data.length > 0)) {
      dispatch({
        type: GET_ECOM_SALES,
        payload: response.data,
      });
      dispatch(hideProgressBar());
      return response;
    } else {
      message.error("Something Went Wrong!");
      dispatch({
        type: GET_ECOM_SALES,
        payload: [],
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

export const getBrandAndDesignCombination = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/getBrandAndDesignCombination?perPage=30&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_BRAND_DESIGN_COMBINATION,
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

export const getBrandAndDesignComboSales = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/getListOfSalesBrandAndDesignCombination?perPage=30&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_BRAND_DESIGN_COMBO_FORSALE,
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

export const addEcomSale = (ecomSaleObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchase/ecomSale`,
      ecomSaleObj
    );
    dispatch({
      type: ADD_ECOM_SALE,
      payload: ecomSaleObj,
    });
    message.success(`Ecom Sale Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const ecomSales = (ecomSaleObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchase/ecomProduct`,
      ecomSaleObj
    );
    dispatch({
      type: ADD_ECOM_SALE,
      payload: ecomSaleObj,
    });
    message.success(`Ecom Sale Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getEcomOnlineSales = (obj) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/ecommerceSalesList`,
      obj
    );
    if (response.status == 200) {
      if (response.data.data.length == 0) {
        message.error("No Data Found");
      }
    }
    dispatch({
      type: ADD_ONLINE_ECOM_SALE,
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

export const addPurchaseImage = (id, data) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/purchase/images`,
      { base64ImageData: data, barcode: id }
    );
    message.success(" Imaged added Successfully");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getPuchaseUsingBarcodeAndDealer =
  (barcode, dealerId) => async (dispatch) => {
    try {
      if (barcode === "reset") {
        dispatch({
          type: GET_PURCHASE_RETURN_BARCODE,
          payload: [],
        });
      } else {
        let response = await axios.get(
          `${backend_uri_server}/api/v1/purchase/product/${barcode}/${dealerId}`
        );
        dispatch({
          type: GET_PURCHASE_RETURN_BARCODE,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const purchaseReturn = (returnObj) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${backend_uri_server}/api/v1/createPurchaseReturn`,
      returnObj
    );
    return response;
    // message.success(`Purchase Returned Succesfully`);
    // window.location.reload(0);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const updatePurchaseReturn = (returnObj) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${backend_uri_server}/api/v1/updatePurchaseReturnNew`,
      returnObj
    );
    return response;
    // message.success(`Purchase Returned Succesfully`);
    // window.location.reload(0);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const purchaseReturnBydate = (obj, reset) => async (dispatch) => {
  dispatch(showProgressBar());
  try {
    if (reset == "reset") {
      dispatch({
        type: GET_PURCHASERETURN_BYDATE,
        payload: [],
      });
      dispatch(hideProgressBar());
    } else {
      const response = await axios.post(
        `${backend_uri_server}/api/v1/purchaseReturnDataByDateRange`,
        obj
      );
      dispatch({
        type: GET_PURCHASERETURN_BYDATE,
        payload: response.data,
      });
      dispatch(hideProgressBar());
    }
  } catch (error) {
    message.error(`Data not found`);
    dispatch({
      type: GET_PURCHASERETURN_BYDATE,
      payload: [{ message: "Empty" }],
    });
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
    dispatch(hideProgressBar());
  }
};

export const updatePurchase = (purchaseObj) => async (dispatch) => {
  try {
    await axios.post(
      `${backend_uri_server}/api/v1/purchase/update`,
      purchaseObj
    );
    message
      .success(`Purchase Updated Successfully`)
      .then(window.location.reload(0));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};
export const getPurchaseReturns = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/purchasereturn?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_PURCHASE_RETURNS,
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

export const getPurchaseReturnBillList = (limit) => async (dispatch) => {
  dispatch(showProgressBar());
  let response = await axios.get(
    `${backend_uri_server}/api/v1/getPurchaseReturnBills?perPage=${10}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_PURCHASE_RETURN_BILLLIST,
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

export const getPurchaseReturnBillListBydate =
  (obj, reset) => async (dispatch) => {
    dispatch(showProgressBar());
    try {
      if (reset == "reset") {
        dispatch({
          type: GET_PURCHASE_RETURN_BILLLIST_BYDATE,
          payload: [],
        });
        dispatch(hideProgressBar());
      } else {
        const response = await axios.post(
          `${backend_uri_server}/api/v1/purchaseReturnBillDataByDateRange`,
          obj
        );
        dispatch({
          type: GET_PURCHASE_RETURN_BILLLIST_BYDATE,
          payload: response.data,
        });
        dispatch(hideProgressBar());
      }
    } catch (error) {
      message.error(`Data not found`);
      dispatch({
        type: GET_PURCHASE_RETURN_BILLLIST_BYDATE,
        payload: [{ message: "Empty" }],
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      dispatch(hideProgressBar());
    }
  };

export const getPurchaseReturnBillsDetailsById =
  (id, limit) => async (dispatch) => {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getPurchaseReturnBillsDetailsById?purchaseReturnId=${id}`
    );

    try {
      dispatch({
        type: GET_PURCHASE_RETURN_BILLLIST_BYID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };
// for pdf
let poId;

export const poOrderpdf = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_uri_server}/api/v1/poOrderpdf?poId=${poId}`
      // { responseType: 'blob' } // Set the response type to blob
    );
    window.open(response.config.url);
    dispatch({
      type: ADD_PO,
      payload: response.data,
      // responseType: 'blob'
    });
    // window.open(response.url);
    window.location.reload(true);
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// export const downloadPdf = async () => {
//   try {
//     const response = await axios.get('/api/v1/createpdf');
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'output.pdf');
//     document.body.appendChild(link);
//     link.click();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const poCredentials = (poObj) => async (dispatch) => {
  try {
    let response = await axios.patch(
      `${backend_uri_server}/api/v1/poCredentials`,
      poObj
    );

    dispatch({
      type: ADD_PO,
      payload: response.data,
    });
    poId = response.data.poId;
    poOrderpdf(poId);
    message.success(`PO Added Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
// export const POID = () =>async(dispatch)=>{
//   let poId
//   console.log(poId)
// }

export const getpo = () => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/AllPoCredentials`
  );
  try {
    dispatch({
      type: GET_POCREDENTIALS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for purchase data history
export const getPurchaseReturnDataPurchaseId =
  (purchaseReturnBillId) => async (dispatch) => {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getPurchaseReturnDataPurchaseId?purchaseReturnBillId=${purchaseReturnBillId}`
    );
    try {
      dispatch({
        type: GET_PURCHASERETURN_INVOICE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const deletePurchaseReturn = (_id) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/delete/purchaseReturn`,
      { _id: _id }
    );

    dispatch({
      type: DELETE_PURCHASE,
      payload: _id,
    });
    message.success(`PurchaseReturn Deleted Successfully`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

//for getting search data
export const purchaseBySearchValue = (obj, alias) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_PURCHASE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/purchasesBySearchValue`,
        obj
      );
      dispatch({
        type: GET_PURCHASE_SEARCH_VALUE,
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

//for getting search data
export const ecomBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_PURCHASE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/ecomBySearchValue`,
        obj
      );
      dispatch({
        type: GET_PURCHASE_SEARCH_VALUE,
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

//for getting search data
export const purchasesReturnBySearchValue = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_PURCHASE_SEARCH_VALUE,
      payload: [],
    });
  } else {
    try {
      let response = await axios.patch(
        `${backend_uri_server}/api/v1/purchasesReturnBySearchValue`,
        obj
      );
      dispatch({
        type: GET_PURCHASE_SEARCH_VALUE,
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

// for image uploading of product
export const addProductImage = (barcode, files) => async (dispatch) => {
  console.log("Files for Upload ---------------------->", files);
  try {
    if (!files || files.length === 0) {
      throw new Error("No files provided for upload.");
    }

    let formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });

    console.log("formData --------------------------->", formData);
    const response = await axios.post(
      `${backend_uri_server}/api/v1/upload-multiple/${barcode}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response ---------------------->", response);

    dispatch({
      type: ADD_IMAGE_BRAND,
      payload: response.data,
    });

    return response;
  } catch (error) {
    console.error("Upload error:", error);

    dispatch({
      type: GET_ERRORS,
      payload: error.response
        ? error.response.data
        : { message: error.message },
    });
  }
};

//for visiblity of products on ecommerce
export const addVisiblityOnEcom = (ecomSaleObj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchase/ecomProduct`,
      ecomSaleObj
    );
    dispatch({
      type: ADD_ECOM_SALE,
      payload: ecomSaleObj,
    });
    message.success(response.data);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for individual sales on and off
export const handleChangeEcomIndividual = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchase/changeIndividualEcomStatus
`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data.message);
      return response;
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

// for image uploading of product
export const addSingleGlobalEcomImage = (files) => async (dispatch) => {
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

// for  delete image for blob
export const deleteSingleGlobalImage = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteImage`,
      data
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

// for  delete image for blob
export const saveEcomBanner = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/saveEcomBanner`,
      data
    );
    if (response && response.status == 200) {
      message.success(response?.data?.message);
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

// for  delete image for blob
export const deleteEcomBanner = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteBannerImage`,
      data
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

// for  getting banner list
export const getBannerList = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getAllBanners`
    );
    if (
      response &&
      response.data &&
      response?.data?.data &&
      response?.data?.data?.oldImages?.length == 0
    ) {
      message.error("No Data Found");
    }
    dispatch({
      type: GET_BANNER_LIST,
      // payload: error.message,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const addMultipleGlobalEcomImage = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/addImageonmultipleProduct`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const addMultipleGlobalEcomImageByColor = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/addImageonmultipleProductBycolor`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const deletImageByBarcode = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteAllImagesOfProduct`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
      return response;
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getdesignAndBrandComboByBarcode =
  (lookupObj) => async (dispatch) => {
    try {
      if (lookupObj === "reset") {
        dispatch({
          type: GET_DESIGNANDBRAND_BY_BARCODE,
          payload: [],
        });
      } else {
        let response = await axios.post(
          `${backend_uri_server}/api/v1/designandbrandcombdatabybarcode`,
          lookupObj
        );

        dispatch({
          type: GET_DESIGNANDBRAND_BY_BARCODE,
          payload: response.data.data,
        });
        return response;
      }
    } catch (error) {
      message.error("No Data Found!");
      dispatch({
        type: GET_DESIGNANDBRAND_BY_BARCODE,
        payload: [],
      });
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  };

export const getStockSearchforEcom = (obj) => async (dispatch) => {
  try {
    if (obj === "reset") {
      dispatch({
        type: STOCK_SEARCH_SALESAPP,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/stockSearchforEcom`,
        obj
      );

      dispatch({
        type: STOCK_SEARCH_SALESAPP,
        payload: response.data.data,
      });
      return response;
    }
  } catch (error) {
    message.error("No Data Found!");
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getStockByFilter = (obj) => async (dispatch) => {
  try {
    if (obj === "reset") {
      dispatch({
        type: STOCK_FILTER_SALESAPP,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/stockByFilter`,
        obj
      );

      dispatch({
        type: STOCK_FILTER_SALESAPP,
        payload: response.data.data,
      });
      return response;
    }
  } catch (error) {
    message.error("No Data Found!");
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getDatabydesignandBrandforInventory =
  (obj) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/purchaseDataByDesignandBarocde`,
        obj
      );
      if (response.status == 200) {
        message.success(response.data.message);
        dispatch({
          type: GET_DESIGNANDBRAND_BY_BARCODE,
          payload: response.data.data,
        });
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        // payload: error.message,
        payload: error.response.data,
      });
    }
  };

export const getDatabyColororSizeforInventory = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchaseDataBySizeandColor`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data.message);
      dispatch({
        type: GET_DESIGNANDBRAND_BY_BARCODE,
        payload: response.data.data,
      });
    }
    return response;
  } catch (error) {
    message.error(error.response?.data?.message);
    // dispatch({
    //   type: GET_ERRORS,
    //   // payload: error.message,
    //   payload: error.response.data,
    // });
  }
};

export const addSingleImage = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/uploadSingleImage`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const updateProductImage = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/updateProductImage`,
      obj
    );
    if (response.status == 200) {
      message.success(response.data);
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getAvailableStock = (limit) => async (dispatch) => {
  let response = await axios.get(
    `${backend_uri_server}/api/v1/availableStockReport?perPage=${100}&limit=${limit}`
  );
  try {
    dispatch({
      type: GET_AVAILABLE_STOCK,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getAvailableStockBySearch = (obj) => async (dispatch) => {
  if (obj == "reset") {
    dispatch({
      type: GET_AVAILABLE_STOCK_BY_SEARCH,
      payload: [],
    });
    dispatch(hideProgressBar());
  } else {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/availableStockSearchByBarcode`,
      obj
    );
    try {
      dispatch({
        type: GET_AVAILABLE_STOCK_BY_SEARCH,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const sendBannerImages = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/setBannerImage`,
      obj
    );
    return response;
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getLatestBannerList = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getLatestBanners`
    );

    dispatch({
      type: GET_LATEST_BANNER_LIST,
      // payload: error.message,
      payload: response?.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const stockDetailsByBarcode = (obj) => async (dispatch) => {
  try {
    if (obj == "reset") {
      dispatch({
        type: STOCK_DETAILS_BY_BARCODE,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getDetailsByBarcode`,
        obj
      );

      dispatch({
        type: STOCK_DETAILS_BY_BARCODE,
        // payload: error.message,
        payload: response?.data,
      });
      if (response.status == 200) {
        // message.success(response.data.message)
        return response?.data;
      }
    }
  } catch (error) {
    dispatch({
      type: STOCK_DETAILS_BY_BARCODE,
      payload: [],
    });
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("An error occurred while fetching details");
    }
  }
};

export const stockDetailsByBrands = (obj) => async (dispatch) => {
  try {
    dispatch(showProgressBar());
    if (obj == "reset") {
      dispatch({
        type: STOCK_DETAILS_BY_BRAND,
        payload: [],
      });
    } else {
      let response = await axios.post(
        `${backend_uri_server}/api/v1/getDataByBrand`,
        obj
      );

      dispatch(hideProgressBar());
      dispatch({
        type: STOCK_DETAILS_BY_BRAND,
        // payload: error.message,
        payload: response?.data,
      });
      if (response.status == 200) {
        // message.success(response.data.message)
        dispatch(hideProgressBar());
        return response?.data;
      }
    }
  } catch (error) {
    dispatch({
      type: STOCK_DETAILS_BY_BRAND,
      payload: [],
    });
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("An error occurred while fetching details");
    }
    dispatch(hideProgressBar());
  }
};

export const setCheckoutCartsImage = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/setCheckoutCartsImage`,
      data
    );
    if (response && response.status == 200) {
      message.success(response?.data?.message);
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const saveCheckOutCartImages = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/saveCheckOutCartImages`,
      data
    );
    if (response && response.status == 200) {
      message.success(response?.data?.message);
    }
    return response;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const deleteCheckoutCartImage = (data) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/deleteCheckoutCartImage`,
      data
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

export const getAllCheckoutCartImages = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getAllCheckoutCartImages`
    );
    if (
      response &&
      response.data &&
      response?.data?.data &&
      response?.data?.data?.oldImages?.length == 0
    ) {
      message.error("No Data Found");
    }
    dispatch({
      type: GET_CHECKOUT_BANNER,
      // payload: error.message,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const getLatestCheckCartBanners = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getLatestCheckCartBanners`
    );
    dispatch({
      type: GET_CART_CHECKOUT_BANNERS,
      // payload: error.message,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      // payload: error.message,
      payload: error.response.data,
    });
  }
};

export const purchaseMismatchQuantity = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/purchaseMismatchQuantity`,
      obj
    );
    if (response && response.status == 200) {
      message.success(response?.data?.message);
    }
  } catch (error) {
    message.error("Something Went Wrong!");
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProductRecommendationByBarcode = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${backend_uri_server}/api/v1/recommendationItem`,
      obj
    );
    return response
  } catch (error) {
    // message.error("Something Went Wrong!");
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getSetBarcodes = (obj) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/getSetBarcodes`,
      obj
    );
    dispatch({
      type: GET_SET_BARCODES,
      // payload: error.message,
      payload: response.data,
    });
    return response
  } catch (error) {
    // message.error("Something Went Wrong!");
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
