import {
    GET_TAG,
} from "../actions/type";
const initialState = {
    tags: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        // case GET_ERRORS:
        //return action.payload;
        case GET_TAG:
            return {
                ...state,
                tags: action.payload,
            };
        default:
            return state;
    }
}