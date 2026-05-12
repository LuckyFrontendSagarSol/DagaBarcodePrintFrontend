import { uuid } from "uuidv4";
import {
    GET_PURCHASES_ORDERS, GET_PURCHASE_ORDER_BY_ID
} from "./../actions/type";
const initialState = {
    purchaseOrders: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PURCHASES_ORDERS:
            return {
                ...state,
                purchaseOrders: action.payload,
            };
        case GET_PURCHASE_ORDER_BY_ID:
            return {
                ...state,
                purchaseOrdersByID: action.payload,
            };
        default:
            return state;
    }
}