import {
  ADD_SECTION,
  DELETE_SECTION,
  GET_SECTIONS,
  GET_ERRORS,
  UPDATE_SECTION,
} from "./../actions/type";
const initialState = {
  sections: [],
  section: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
    case ADD_SECTION:
      return {
        ...state,
        sections: [action.payload, ...state.sections],
      };
    case DELETE_SECTION:
      var updatedSections = [];
      updatedSections = state.sections.filter((section) => {
        if (section._id != action.payload) return section;
      });
      return {
        ...state,
        sections: updatedSections,
      };
    case UPDATE_SECTION:
      let updatedSection = state.sections.map((section) => {
        if (section._id == action.payload._id) return action.payload;
        return section;
      });
      return {
        ...state,
        sections: updatedSection,
        section: {},
      };
    default:
      return state;
  }
}
