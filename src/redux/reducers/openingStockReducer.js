import { uuid } from "uuidv4";
import {
    GET_OPENINGSTOCK_DATA,

} from "./../actions/type";

const initialState = {
    openingStock: [],
}


export default function (state = initialState, action) {
    switch (action.type) {
        // case GET_ERRORS:
        //return action.payload;
        case GET_OPENINGSTOCK_DATA:
            return {
                ...state,
                openingStock: action.payload,
            };
        default:
            return state;
    }
}