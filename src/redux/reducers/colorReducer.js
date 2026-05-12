import {
  ADD_COLOR,
  DELETE_COLOR,
  GET_COLORS,
  GET_ERRORS,
  UPDATE_COLOR,
} from "./../actions/type";
const initialState = {
  colors: [],
  color: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case ADD_COLOR:
      return {
        ...state,
        colors: [action.payload, ...state.colors],
      };
    case DELETE_COLOR:
      var updatedColors = [];
      updatedColors = state.colors.filter((color) => {
        if (color._id != action.payload) return color;
      });
      return {
        ...state,
        colors: updatedColors,
      };
    case UPDATE_COLOR:
      let updatedColor = state.colors.map((color) => {
        if (color._id == action.payload._id) return action.payload;
        return color;
      });
      return {
        ...state,
        colors: updatedColor,
        color: {},
      };
    default:
      return state;
  }
}
