import { message } from "antd";
import {
  GET_ERRORS,
  GET_ECOM_SALE_Bill,
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
  GET_ECOM_SALE_RETURN_ProductBY_ID
} from "./../actions/type";

const initialState = {
  ecomSalebill: {},
  ecomSaleData: {},
  ecomEditCreditUser: {},
  ecomOrderStatus: {},
  ecomSlaesbillByCustomerId: [],
  ecomSlaesListByCustomerId: [],
  ecombillVerifiedStatus: [],
  ecomsalesDetailsbyInvoiceId: [],
  sendEcomSalesBillbywhatsapp: [],
  ecomSalesBillDetails: [],
  creditPaymentBySearchValue: [],
  creditPaymentByDateRange: [],
  ecomSalesReturnBillList: [],
  ecomSalesRetutnProductById : []
};

// Store the Data in State when api is call action Type 
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ECOM_SALE_RETURN_ProductBY_ID:
      return {
        ...state,
        ecomSalesRetutnProductById: action.payload,
      };
    case GET_ECOM_SALE_RETURN_Bill:
      return {
        ...state,
        ecomSalesReturnBillList: action.payload,
      };
    case GET_ECOM_SALE_List:
      return {
        ...state,
        ecomSaleData: action.payload,
      };
    case GET_ECOM_SALE_Bill:
      return {
        ...state,
        ecomSalebill: action.payload,
      };
    case Edit_USER_Credit:
      return {
        ...state,
        ecomEditCreditUser: action.payload
      }
    case UPDATE_ORDERSTATUS:
      return {
        ...state,
        ecomOrderStatus: action.payload
      }
    case GET_ECOM_SALES_BILLBYCUSTOMERID:
      return {
        ...state,
        ecomSlaesbillByCustomerId: action.payload,
      };
    case GET_ECOM_SALES_LISTBY_CUSTOMERID:
      return {
        ...state,
        ecomSlaesListByCustomerId: action.payload,
      };
    case CHECK_ECOM_BILL_IS_VERIFIED:
      return {
        ...state,
        ecombillVerifiedStatus: action.payload,
      };
    case GET_ECOM_SALESDETAILS_BYINVOICEIDS:
      return {
        ...state,
        ecomsalesDetailsbyInvoiceId: action.payload,
      };
    case ECOM_SALES_BILL_WHATSAPP:
      return {
        ...state,
        sendEcomSalesBillbywhatsapp: action.payload
      }
    case ECOM_SALES_BILL_DETAILS:
      return {
        ...state,
        ecomSalesBillDetails: action.payload
      }
    case CREDIT_PAYMENT_BY_SEARCH_VALUE:
      return {
        ...state,
        creditPaymentBySearchValue: action.payload,
      };
    case CREDIT_PAYMENT_BY_DATE_RANGE:
      return {
        ...state,
        creditPaymentByDateRange: action.payload,
      };

    default:
      return state;
  }
}