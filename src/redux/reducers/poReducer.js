import {
    GET_PO_LIST,
    GET_PO_DATABYID,
    GET_ERRORS,
    ADD_PO,
    GET_POCREDENTIALS
  } from "../actions/type";
  
  const initState = {
    poDatabyId: {},
    polist : [],
     poId : {}
  };
  
  const poReducer = (state = initState, action) => {
  
    if (action.type === GET_PO_LIST) {
      return {
        ...state,
        polist: action.payload
      };
    }
  
    if (action.type === GET_PO_DATABYID) {
      console.log("action.payload", action.payload);
      return {
        ...state,
        poDatabyId: action.payload
      };
    }
  if (action.type === ADD_PO) {
      return {
        ...state,
        poId: action.payload
      };
    }
    return state;
  };
  
  export default poReducer;