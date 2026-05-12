import {
  ADD_DEALER,
  DELETE_DEALER,
  GET_DEALERS,
  GET_ERRORS,
  UPDATE_DEALER,
} from "./../actions/type";
const initialState = {
  dealers: [],
  dealer: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_DEALERS:
      return {
        ...state,
        dealers: action.payload,
      };
    case ADD_DEALER:
      return {
        ...state,
        dealers: [action.payload, ...state.dealers],
      };
    case DELETE_DEALER:
      var updatedDealers = [];
      updatedDealers = state.dealers.filter((dealer) => {
        if (dealer._id != action.payload) return dealer;
      });
      return {
        ...state,
        dealers: updatedDealers,
      };
    case UPDATE_DEALER:
      let updatedDealer = state.dealers.map((dealer) => {
        if (dealer._id == action.payload._id) return action.payload;
        return dealer;
      });
      return {
        ...state,
        dealers: updatedDealer,
        dealer: {},
      };

    default:
      return state;
  }
}
