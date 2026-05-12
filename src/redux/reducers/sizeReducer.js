import {
  ADD_SIZE,
  DELETE_SIZE,
  GET_SIZES,
  GET_ERRORS,
  UPDATE_SIZE,
} from "./../actions/type";
const initialState = {
  sizes: [],
  size: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload,
      };
    case ADD_SIZE:
      return {
        ...state,
        sizes: [action.payload, ...state.sizes],
      };
    case DELETE_SIZE:
      var updatedSizes = [];
      updatedSizes = state.sizes.filter((size) => {
        if (size._id != action.payload) return size;
      });
      return {
        ...state,
        sizes: updatedSizes,
      };
    case UPDATE_SIZE:
      let updateSize = state.sizes.map((size) => {
        if (size._id == action.payload._id) return action.payload;
        return size;
      });
      return {
        ...state,
        sizes: updateSize,
        size: {},
      };
    default:
      return state;
  }
}
