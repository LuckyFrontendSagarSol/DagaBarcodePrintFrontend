import { uuid } from "uuidv4";
import {
    GET_RACKS, GET_RACKS_BY_ID
} from "./../actions/type";
const initialState = {
    rackList: [],
    racksByID: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RACKS:
            return {
                ...state,
                rackList: action.payload,
            };
        case GET_RACKS_BY_ID:
            return {
                ...state,
                racksByID: action.payload,
            };
        default:
            return state;
    }
}