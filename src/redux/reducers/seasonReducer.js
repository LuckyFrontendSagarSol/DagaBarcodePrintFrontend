import {
  ADD_SEASON,
  DELETE_SEASON,
  GET_SEASONS,
  GET_ERRORS,
  UPDATE_SEASON,
} from "./../actions/type";
const initialState = {
  seasons: [],
  season: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_SEASONS:
      return {
        ...state,
        seasons: action.payload,
      };
    case ADD_SEASON:
      return {
        ...state,
        seasons: [action.payload, ...state.seasons],
      };
    case DELETE_SEASON:
      var updatedSeasons = [];
      updatedSeasons = state.seasons.filter((season) => {
        if (season._id != action.payload) return season;
      });
      return {
        ...state,
        seasons: updatedSeasons,
      };
    case UPDATE_SEASON:
      let updatedSeason = state.seasons.map((season) => {
        if (season._id == action.payload._id) return action.payload;
        return season;
      });
      return {
        ...state,
        seasons: updatedSeason,
        season: {},
      };
    default:
      return state;
  }
}
