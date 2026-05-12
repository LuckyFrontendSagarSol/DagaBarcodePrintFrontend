import {
  ADD_LOCATION,
  DELETE_LOCATION,
  GET_LOCATIONS,
  GET_ERRORS,
  UPDATE_LOCATION,
} from "./../actions/type";
const initialState = {
  locations: [],
  location: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [action.payload, ...state.locations],
      };
    case DELETE_LOCATION:
      var updatedLocations = [];
      updatedLocations = state.locations.filter((location) => {
        if (location._id != action.payload) return location;
      });
      return {
        ...state,
        locations: updatedLocations,
      };
    case UPDATE_LOCATION:
      let updatedLocation = state.locations.map((location) => {
        if (location._id == action.payload._id) return action.payload;
        return location;
      });
      return {
        ...state,
        locations: updatedLocation,
        location: {},
      };
    default:
      return state;
  }
}
