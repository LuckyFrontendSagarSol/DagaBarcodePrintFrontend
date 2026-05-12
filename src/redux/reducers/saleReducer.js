import {
  GET_ERRORS,
  GET_SALES_BILL,
  GET_SALES_BILLS_USERID,
  GET_SALES_INVOICE,
  GET_SALES_LIST,
  GET_SALES_PRODUCT_BY_INVOICE_ID,
  GET_SALES_RETURNS,
  GET_SALES_RETURN_BILL,
  GET_SALES_RETURN_SALERETURNID,
  GET_SALES_RETURNS_DEFECTED,
  GET_SALES_USING_BARCODE_USERID,
  CREATE_SALES,
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
  GET_SALESORDER_BYCUSTOMERID,
  SALES_BILL_BY_SALES_PERSON_ID,
  SALES_BY_SEARCH_VALUE,
  GET_SALE_ORDER_SEARCH_VALUE,
  GET_UPLODED_LR_LIST,
  GET_LASTSALESDATA_FOR_LR,
} from "./../actions/type";
const initialState = {
  salesOrderByCustomer: [],
  saleswithcustomer: [],
  lastFiveBills: [],
  salesOrderBills: [],
  salesOrders: [],
  saleProducts: [],
  salesBillsUser: [],
  salesBillsBarcode: [],
  saleReturns: [],
  AllSalesReturnBill: [],
  saleReturnBillSaleReturnId: [],
  salesReturnOrders: [],
  salesReturnDefectedOrders: [],
  //saleReturnBills:[],
  salesList: [],
  saleReturnsDefected: [],
  sale: {},
  AlldefectedProductBill: [],
  defectedProductBillSaleReturnId: [],
  sales: [],
  salesByuser: [],
  saleSearchData: [],
  saleslistbydate: [],
  salesorderBydaterange: [],
  salesreturnBydate: [],
  salesreturnbillBydate: [],
  salesreturndefectedBydate: [],
  alldefectedproductbillBydate: [],
  defectiveSaleReturnDataById: [],
  slaesbillByCustomerId: [],
  saleListByInvoiceId: [],
  salesDetailsbyInvoiceId: [],
  billVerifiedStatus: [],
  defectiveReturnSearchByValue: [],
  ecomSalesByUserId: [],
  salesBySearchValue: [],
  salesBillBySalesPersonId: [],
  saleOrderSearchData: [],
  uplodedLRList: [],
  lastSalesForLr : []
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_ECOM_SALES_INVOICE:
      return {
        ...state,
        ecomSalesByUserId: action.payload,
      };
    case CREATE_SALES:
      return {
        ...state,
        sale: action.payload,
      };
    case GET_SALES_BILL:
      return {
        ...state,
        salesOrderBills: action.payload,
      };
    case GET_SALES_RETURNS:
      return {
        ...state,
        saleReturns: action.payload,
      };
    case GET_SALES_RETURN_BILL:
      return {
        ...state,
        AllSalesReturnBill: action.payload,
      };
    //defectedProduct bill
    case GET_DEFECTED_PRODUCT_BILL:
      return {
        ...state,
        AlldefectedProductBill: action.payload,
      };
    case GET_DEFECTED_PRODUCT_SALERETURNID:
      return {
        ...state,
        defectedProductBillSaleReturnId: action.payload,
      };
    case GET_SALES_RETURN_SALERETURNID:
      return {
        ...state,
        saleReturnBillSaleReturnId: action.payload,
      };
    case GET_SALES_PRODUCT_BY_INVOICE_ID:
      return {
        ...state,
        saleProducts: action.payload,
      };
    case GET_SALES_RETURNS_DEFECTED:
      return {
        ...state,
        saleReturnsDefected: action.payload,
      };
    case GET_SALES_LIST:
      return {
        ...state,
        salesList: action.payload,
      };
    case GET_SALES_INVOICE:
      return {
        ...state,
        salesOrders: action.payload,
      };
    case GET_SALESRETURN_INVOICE:
      return {
        ...state,
        salesReturnOrders: action.payload,
      };
    case GET_SALESRETURNDEFECTED_INVOICE:
      return {
        ...state,
        salesReturnDefectedOrders: action.payload,
      };

    case GET_SALES_BILLS_USERID:
      return {
        ...state,
        salesBillsUser: action.payload,
      };
    case GET_SALES_USING_BARCODE_USERID:
      return {
        ...state,
        salesBillsBarcode: action.payload,
      };
    case SALES_BYUSER:
      return {
        ...state,
        salesByuser: action.payload,
      };
    case DELETE_SALE:
      var updatedsales = [];
      updatedsales = state.sales.filter((sale) => {
        if (sale._id != action.payload) return sale;
      });
      return {
        ...state,
        sales: updatedsales,
      };
    case GET_SALE_SEARCH_VALUE:
      return {
        ...state,
        saleSearchData: action.payload,
      };
    case GET_SALES_ORDERBYBILL_BYDATE:
      return {
        ...state,
        salesorderBydaterange: action.payload,
      };
    case GET_SALESRETURN_BYDATERANGE:
      return {
        ...state,
        salesreturnBydate: action.payload,
      };
    case GET_SALESRETURNBILL_BYDATERANGE:
      return {
        ...state,
        salesreturnbillBydate: action.payload,
      };
    case GET_SALESRETURN_DEFECTED_BYDATE:
      return {
        ...state,
        salesreturndefectedBydate: action.payload,
      };
    case GET_ALLDEFECTEDPRODUCTBILL_BYDATE:
      return {
        ...state,
        alldefectedproductbillBydate: action.payload,
      };
    case GET_SALES_LIST_BYDATE:
      return {
        ...state,
        saleslistbydate: action.payload,
      };
    case CHECKLAST_FIVEBILLS:
      return {
        ...state,
        lastFiveBills: action.payload,
      };
    case GET_SALESWITHCUSTOMER:
      return {
        ...state,
        saleswithcustomer: action.payload,
      };
    case GET_DEFECTIVE_SALES_RETURN_SALERETURNID:
      return {
        ...state,
        defectiveSaleReturnDataById: action.payload,
      };
    case GET_SALES_BILLBYCUSTOMERID:
      return {
        ...state,
        slaesbillByCustomerId: action.payload,
      };
    case GET_SALES_LISTBYINVOICEID:
      return {
        ...state,
        saleListByInvoiceId: action.payload,
      };
    case GET_SALESDETAILS_BYINVOICEIDS:
      return {
        ...state,
        salesDetailsbyInvoiceId: action.payload,
      };
    case CHECKBILL_IS_VERIFIED:
      return {
        ...state,
        billVerifiedStatus: action.payload,
      };
    case GET_SALE_DEFECTIVE_SEARCH_VALUE:
      return {
        ...state,
        defectiveReturnSearchByValue: action.payload,
      };
    case GET_SALESORDER_BYCUSTOMERID:
      return {
        ...state,
        salesOrderByCustomer: action.payload,
      };
    case SALES_BY_SEARCH_VALUE:
      return {
        ...state,
        salesBySearchValue: action.payload,
      };
    case SALES_BILL_BY_SALES_PERSON_ID:
      return {
        ...state,
        salesBillBySalesPersonId: action.payload,
      };
    case GET_SALE_ORDER_SEARCH_VALUE:
      return {
        ...state,
        saleOrderSearchData: action.payload,
      };
    case GET_UPLODED_LR_LIST:
      return {
        ...state,
        uplodedLRList: action.payload,
      };
    case GET_LASTSALESDATA_FOR_LR:
      return {
        ...state,
        lastSalesForLr: action.payload,
      };

    default:
      return state;
  }
}
