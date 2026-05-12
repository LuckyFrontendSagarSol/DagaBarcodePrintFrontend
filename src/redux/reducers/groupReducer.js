import {
  ADD_GROUP,
  DELETE_GROUP,
  GET_GROUPS,
  GET_ERRORS,
  UPDATE_GROUP,
} from "./../actions/type";
const initialState = {
  groups: [],
  group: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
      };
    case DELETE_GROUP:
      var updatedGroups = [];
      updatedGroups = state.groups.filter((group) => {
        if (group._id != action.payload) return group;
      });
      return {
        ...state,
        groups: updatedGroups,
      };
    case UPDATE_GROUP:
      let updatedGroup = state.groups.map((group) => {
        if (group._id == action.payload._id) return action.payload;
        return group;
      });
      return {
        ...state,
        groups: updatedGroup,
        group: {},
      };
    default:
      return state;
  }
}
