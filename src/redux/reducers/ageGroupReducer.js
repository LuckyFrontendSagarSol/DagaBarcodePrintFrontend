import {
  ADD_AGE_GROUP,
  DELETE_AGE_GROUP,
  GET_AGE_GROUPS,
  GET_ERRORS,
  UPDATE_AGE_GROUP,
} from "./../actions/type";
const initialState = {
  ageGroups: [],
  ageGroup: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_AGE_GROUPS:
      return {
        ...state,
        ageGroups: action.payload,
      };
    case ADD_AGE_GROUP:
      return {
        ...state,
        ageGroups: [action.payload, ...state.ageGroups],
      };
    case DELETE_AGE_GROUP:
      var updatedAgeGroups = [];
      updatedAgeGroups = state.ageGroups.filter((ageGroup) => {
        if (ageGroup._id != action.payload) return ageGroup;
      });
      return {
        ...state,
        ageGroups: updatedAgeGroups,
      };
    case UPDATE_AGE_GROUP:
      let updatedAgeGroup = state.ageGroups.map((ageGroup) => {
        if (ageGroup._id == action.payload._id) return action.payload;
        return ageGroup;
      });
      return {
        ...state,
        ageGroups: updatedAgeGroup,
        ageGroup: {},
      };
    default:
      return state;
  }
}
