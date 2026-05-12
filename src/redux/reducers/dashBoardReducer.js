import { GET_DASHBOARD_DATA, GET_GROSSPROFIT_DATA } from "../actions/type";

const initialState = {
  dashboardData: {},
  grossprofit: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
      };
      case GET_GROSSPROFIT_DATA:
        return {
          ...state,
          grossprofit: action.payload,
        };
    default:
      return state;
  }
}
