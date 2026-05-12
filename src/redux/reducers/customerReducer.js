import { GET_CUSTOMERS, 
  GET_ERRORS, GET_SALES, ACTIVE_AND_INACTIVE_CUSTOMERS, 
  GET_TOP_CUSTOMER_SALES_REPORT,
  GET_INACTIVE_CUSTOMER_SALES_REPORT,
  GET_CUSTOMER_SALES_REPORT,
  GET_PIE_CHART_DATA_CUSTOMER_REPORT
 } from "./../actions/type";
const initialState = {
  customers: [],
  customer: {},
  salesPerson: [],
  activeandInactiveCustomer: [],
  customerSalesReport: [],
  topCustomerReport: [],
  inactiveCustomerReport: [],
  pieChartData: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_SALES:
      return {
        ...state,
        salesPerson: action.payload,
      };
    case ACTIVE_AND_INACTIVE_CUSTOMERS:
      return {
        ...state,
        activeandInactiveCustomer: action.payload,
      };
    case GET_CUSTOMER_SALES_REPORT:
      return {
        ...state,
        customerSalesReport: action.payload,
      };
    case GET_TOP_CUSTOMER_SALES_REPORT:
      return {
        ...state,
        topCustomerReport: action.payload,
      };
    case GET_INACTIVE_CUSTOMER_SALES_REPORT:
      return {
        ...state,
        inactiveCustomerReport: action.payload,
      };
    case GET_PIE_CHART_DATA_CUSTOMER_REPORT:
      return {
        ...state,
        pieChartData: action.payload,
      };
    default:
      return state;
  }
}
