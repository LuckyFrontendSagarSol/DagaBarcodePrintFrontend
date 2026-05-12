import {
  ADD_CATEGORY,
  CATEGORY_STATUS,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_ERRORS,
  UPDATE_CATEGORY,
} from "./../actions/type";
const initialState = {
  categories: [],
  productsByCategory: [],
  category: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case DELETE_CATEGORY:
      var updatedCategories = [];
      updatedCategories = state.categories.filter((category) => {
        if (category._id != action.payload) return category;
      });
      return {
        ...state,
        categories: updatedCategories,
      };
    case CATEGORY_STATUS:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id == action.payload) {
            if (category.status == "ON") category.status = "OFF";
            else category.status = "ON";
          }

          return category;
        }),
      };
    case UPDATE_CATEGORY:
      let updatedCategory = state.categories.map((category) => {
        if (category._id == action.payload._id) return action.payload;
        return category;
      });
      return {
        ...state,
        categories: updatedCategory,
        category: {},
      };
    default:
      return state;
  }
}
