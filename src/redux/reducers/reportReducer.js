import {
  GET_CUSTOMER_SALES_REPORTS,
  GET_ERRORS,
  GET_PURCHASE_REPORTS,
  GET_REPORTS,
  GET_STOCKAGE_REPORTS,
  CLEAR_DATA,
  GET_SALESCOMPARISON_REPORTS,
  GET_FASTMOVING_REPORTS,
  GET_BARCODE_REPORTS,
  GET_NONMOVING_REPORTS,
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
} from "./../actions/type";
const initialState = {
  salesAndSaleAgeData: [],
  stockAgeReportByDate: [],
  allstockAgeReportByDate: [],
  customerSaleReports: [],
  allcustomerSaleReports: [],
  customerSaleReport: {},
  purchaseReports: [],
  reports: [],
  allreports: [],
  nonmovingReport: [],
  report: {},
  salesComparinReport: [],
  stockageReport: {},
  fastMovingReport: [],
  barCodeReport: [],
  topCustomerReport: [],
  inActiveCustomerReport: [],
  salesAgeingReport: [],
  agentWiseRepot: [],
  salesSummaryreports: [],
  allsalesSummaryreports: [],
  salesreturnreports: [],
  dealerPurchasereports: [],
  allDealerPurchasereports: [],
  purchaseReturnreports: [],
  allpurchaseReturnreports: [],
  salespersonreports: [],
  purchaseAll: [],
  salesAll: [],
  allsales: [],
  creditanddebitreport: [],
  stockReport: [],
  stockAgeBiReportByFilter: [],
  floorSectionBrandSearch: [],
  floorSectionBrandSearchFrom: [],
  floorSectionBrandSearchTo: [],
  customerReports: [],
  salesReturnReportAmt: [],
  getBestSellingList: [],
  getBestBrandList: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_CUSTOMER_SALES_REPORTS:
      return {
        ...state,
        customerSaleReports: action.payload,
      };
    case GET_ALL_CUSTOMER_SALES_REPORTS:
      return {
        ...state,
        allcustomerSaleReports: action.payload,
      };
    case GET_PURCHASE_REPORTS:
      return {
        ...state,
        purchaseReports: action.payload,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
      };
    case GET_ALL_REPORTS:
      return {
        ...state,
        allreports: action.payload,
      };
    case GET_SALESSUMMARY_REPORTS:
      return {
        ...state,
        salesSummaryreports: action.payload,
      };
    case GET_ALL_SALESSUMMARY_REPORTS:
      return {
        ...state,
        allsalesSummaryreports: action.payload,
      };
    case GET_SALESRETURN_REPORTS:
      return {
        ...state,
        salesreturnreports: action.payload,
      };
    case GET_DEALERPURCHASE_REPORTS:
      return {
        ...state,
        dealerPurchasereports: action.payload,
      };
    case GET_ALL_DEALERPURCHASE_REPORTS:
      return {
        ...state,
        allDealerPurchasereports: action.payload,
      };
    case GET_PURCHASERETURN_REPORTS:
      return {
        ...state,
        purchaseReturnreports: action.payload,
      };
    case GET_ALL_PURCHASERETURN_REPORTS:
      return {
        ...state,
        allpurchaseReturnreports: action.payload,
      };
    case GET_SALESPERSON_REPORTS:
      return {
        ...state,
        salespersonreports: action.payload,
      };

    case GET_SALESCOMPARISON_REPORTS:
      return {
        ...state,
        salesComparinReport: action.payload,
      };

    case GET_NONMOVING_REPORTS:
      return {
        ...state,
        nonmovingReport: action.payload,
      };
    case GET_STOCKAGE_REPORTS:
      return {
        ...state,
        stockageReport: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        reports: [],
      };

    case GET_FASTMOVING_REPORTS:
      return {
        ...state,
        fastMovingReport: action.payload,
      };
    case GET_BARCODE_REPORTS:
      return {
        ...state,
        barCodeReport: action.payload,
      };
    case GET_TOPCUSTOMER_REPORTS:
      return {
        ...state,
        topCustomerReport: action.payload,
      };
    case GET_INACTIVECUSTOMER_REPORTS:
      return {
        ...state,
        inActiveCustomerReport: action.payload,
      };
    case GET_SALESAGEING_REPORTS:
      return {
        ...state,
        salesAgeingReport: action.payload,
      };
    case GET_AGENTWISE_REPORTS:
      return {
        ...state,
        agentWiseRepot: action.payload,
      };
    case GET_PURCHASEALL_REPORTS:
      return {
        ...state,
        purchaseAll: action.payload,
      };
    case GET_SALESALL_REPORTS:
      return {
        ...state,
        salesAll: action.payload,
      };
    case GET_ALL_SALESALL_REPORTS:
      return {
        ...state,
        allsales: action.payload,
      };
    case GET_ALL_SALESALL_REPORTS_DOWNLOAD:
      return {
        ...state,
        allSalesDownload: action.payload,
      };
    case GET_CREDITANDDEBIT_REPORTS:
      return {
        ...state,
        creditanddebitreport: action.payload,
      };
    case GET_STOCK_REPORTS:
      return {
        ...state,
        stockReport: action.payload,
      };
    case GET_STOCKAGE_REPORTS_BYSEARCH:
      return {
        ...state,
        stockAgeReportByDate: action.payload,
      };
    case GET_ALL_STOCKAGE_REPORTS_BYSEARCH:
      return {
        ...state,
        allstockAgeReportByDate: action.payload,
      };
    case GET_STOCKAGE_BI_REPORTS_BYFILTER:
      return {
        ...state,
        stockAgeBiReportByFilter: action.payload,
      };
    case FLLOR_SECTION_BARND_SEARCH:
      return {
        ...state,
        floorSectionBrandSearch: action.payload,
      };
    case FLLOR_SECTION_BARND_SEARCH_FROM:
      return {
        ...state,
        floorSectionBrandSearchFrom: action.payload,
      };
    case FLLOR_SECTION_BARND_SEARCH_TO:
      return {
        ...state,
        floorSectionBrandSearchTo: action.payload,
      };
    case GET_SALESANDSALESAGE_REPORTS:
      return {
        ...state,
        salesAndSaleAgeData: action.payload,
      };
    case GET_CUSTOMER_REPORT:
      return {
        ...state,
        customerReports: action.payload,
      };
    case GET_SALESRETURN_REPORTS_Amount:
      return {
        ...state,
        salesReturnReportAmt: action.payload,
      };
    case GET_BEST_SELLING_REPORT:
      return {
        ...state,
        getBestSellingList: action.payload,
      };
    case GET_BEST_BRAND_REPORT:
      return {
        ...state,
        getBestBrandList: action.payload,
      };
    case GET_OPENING_STOCK_LIST:
      return {
        ...state,
        openingStockList: action.payload,
      };
    default:
      return state;
  }
}