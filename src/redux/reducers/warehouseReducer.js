import {
  WAREHOUSE_INVENTORY_LIST,
  ADD_WAREHOUSE_SALE,
  WAREHOUSE_SALE_LIST,
  WAREHOUSE_SALE_LIST_BY_BILL_ID,
  WAREHOUSE_PURCHASE_BILL_LIST,
  WAREHOUSE_PURCHASE_BILL,
  WAREHOUSE_BARCODE,
  WAREHOUSE_LOOK_UP_BARCODE,
  WH_INVENTORY_BARCODE_BYSEARCH,
  WH_PURCHASEBILL_BYSEARCH,
  WH_OUTBILL_BYSEARCH,
  WH_EMPTY_INVENTORY_DOWNLOAD,
} from "../actions/type";

const initialState = {
  warehouseInventoryLists: [],
  warehouseSaleLists: [],
  warehouseSaleListbybillId: [],
  warehousePurchaseBillList: [],
  warehousePurchaseBill: [],
  warhouseBarcode: [],
  warhouseLookup: [],
  whbarcodebySearch: [],
  whPurchasebillbySearch: [],
  whOutBillBySearch: [],
  zeroStock: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WAREHOUSE_INVENTORY_LIST:
      return {
        ...state,
        warehouseInventoryLists: action.payload.data,
      };
    case ADD_WAREHOUSE_SALE:
      return {
        ...state,
      };
    case WAREHOUSE_SALE_LIST:
      return {
        ...state,
        warehouseSaleLists: action.payload.data,
      };
    case WAREHOUSE_SALE_LIST_BY_BILL_ID:
      return {
        ...state,
        warehouseSaleListbybillId: action.payload,
      };
    case WAREHOUSE_PURCHASE_BILL_LIST:
      return {
        ...state,
        warehousePurchaseBillList: action.payload.data,
      };
    case WAREHOUSE_PURCHASE_BILL:
      return {
        ...state,
        warehousePurchaseBill: action.payload.data,
      };
    case WAREHOUSE_BARCODE:
      return {
        ...state,
        warhouseBarcode: action.payload.data,
      };

    case WAREHOUSE_LOOK_UP_BARCODE:
      {
        console.log("acttest", action.pyaload);
      }
      return {
        ...state,
        warhouseLookup: action.payload.data,
      };
    case WH_INVENTORY_BARCODE_BYSEARCH:
      return {
        ...state,
        whbarcodebySearch: action.payload.data,
      };
    case WH_PURCHASEBILL_BYSEARCH:
      return {
        ...state,
        whPurchasebillbySearch: action.payload.data,
      };
    case WH_OUTBILL_BYSEARCH:
      return {
        ...state,
        whOutBillBySearch: action.payload.data,
      };
    case WH_EMPTY_INVENTORY_DOWNLOAD:
      return {
        ...state,
        zeroStock: action.payload,
      };
    default:
      return state;
  }
}