import {
  ADD_FLOOR,
  DELETE_FLOOR,
  GET_FLOORS,
  GET_ERRORS,
  UPDATE_FLOOR,
} from "./../actions/type";
const initialState = {
  floors: [],
  floor: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_FLOORS:
      return {
        ...state,
        floors: action.payload,
      };
    case ADD_FLOOR:
      return {
        ...state,
        floors: [action.payload, ...state.floors],
      };
    case DELETE_FLOOR:
      var updatedFloors = [];
      updatedFloors = state.floors.filter((floor) => {
        if (floor._id != action.payload) return floor;
      });
      return {
        ...state,
        floors: updatedFloors,
      };
    case UPDATE_FLOOR:
      let updatedFloor = state.floors.map((floor) => {
        if (floor._id == action.payload._id) return action.payload;
        return floor;
      });
      return {
        ...state,
        floors: updatedFloor,
        floor: {},
      };
    default:
      return state;
  }
}
