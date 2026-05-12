import {
  GET_ERRORS,
  GET_DELETED_SALES_LIST,
  GET_DELETED_SALES_RETURN_LIST,
  GET_DELETED_DEFECTIVE_RETURN_LIST,
  GET_DELETED_PURCHASE_RETURN_LIST,
} from "./../actions/type";

const initialState = {
  saleList: [],
  saleReturnList: [],
  defectiveReturnList: [],
  purchaseReturnList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
      };
    case GET_DELETED_SALES_LIST:
      return {
        ...state,
        saleList: action.payload,
      };
    case GET_DELETED_SALES_RETURN_LIST:
      return {
        ...state,
        saleReturnList: action.payload,
      };
    case GET_DELETED_DEFECTIVE_RETURN_LIST:
      return {
        ...state,
        defectiveReturnList: action.payload,
      };
    case GET_DELETED_PURCHASE_RETURN_LIST:
      return {
        ...state,
        purchaseReturnList: action.payload,
      };
    default:
      return state;
  }
}