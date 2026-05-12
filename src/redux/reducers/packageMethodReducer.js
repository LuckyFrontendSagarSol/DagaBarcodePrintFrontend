import { GET_PACKAGING_METHODS } from "../actions/type";

const initialState = {
    packageMethodList: []
  };

  const packageMethodReducer = (state = initialState, action) => {
  
    if (action.type === GET_PACKAGING_METHODS) {
        return {
            ...state,
            packageMethodList: action.payload
        };
    }
    return state;
  }
    export default packageMethodReducer;