import {
  ADD_STYLE,
  DELETE_STYLE,
  GET_STYLES,
  GET_ERRORS,
  GET_PRODUCTS_BY_STYLE,
  UPDATE_STYLE,
  GET_STYLES_BY_CATEGORY,
} from "./../actions/type";
const initialState = {
  styles: [],
  categorystyles: [],
  style: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_STYLES:
      return {
        ...state,
        styles: action.payload,
      };
      case GET_PRODUCTS_BY_STYLE:
      return {
          ...state,
          styles: action.payload,
          
        };
    case GET_STYLES_BY_CATEGORY:
      return {
        ...state,
        categorystyles: action.payload,
      };
    case ADD_STYLE:
      return {
        ...state,
        styles: [action.payload, ...state.styles],
      };
    case DELETE_STYLE:
      var updatedStyle = [];
      updatedStyle = state.styles.filter((style) => {
        if (style._id != action.payload) return style;
      });
      return {
        ...state,
        styles: updatedStyle,
      };
    case UPDATE_STYLE:
      let updateStyle = state.styles.map((style) => {
        if (style._id == action.payload._id) return action.payload;
        return style;
      });
      return {
        ...state,
        styles: updateStyle,
        style: {},
      };
    default:
      return state;
  }
}
