import { uuid } from "uuidv4";
import {
  ADD_PURCHASE,
  DELETE_PURCHASE,
  GET_PURCHASES,
  GET_ERRORS,
  GET_PURCHASES_BILL,
  GET_PURCHASE,
  GET_INVENTORY,
  ADD_ECOM_SALE,
  GET_ECOM_SALES,
  GET_PURCHASE_RETURN_BARCODE,
  GET_PURCHASE_RETURNS,
  GET_PURCHASE_RETURN_BILLLIST,
  GET_PURCHASE_RETURN_BILLLIST_BYID,
  ADD_PO,
  GET_POCREDENTIALS,
  GET_PURCHASERETURN_INVOICE,
  DELETE_PURCHASE_RETURN,
  GET_PURCHASE_SEARCH_VALUE,
  GET_PURCHASES_BYDATE,
  GET_PURCHASESBILLS_BYDATE,
  GET_PURCHASERETURN_BYDATE,
  GET_PURCHASE_RETURN_BILLLIST_BYDATE,
  GET_PURCHASES_BYID,
  ADD_ONLINE_ECOM_SALE,
  GET_INVENTORY_BYSEARCH,
  GET_GENERATEBARCODE_BYSEARCH,
  GET_NAGITIVE_INVENTORY,
  GET_BRAND_DESIGN_COMBINATION,
  GET_BRAND_DESIGN_COMBO_FORSALE,
  GET_DESIGNANDBRAND_BY_BARCODE,
  GET_AVAILABLE_STOCK,
  GET_AVAILABLE_STOCK_BY_SEARCH,
  GET_BANNER_LIST,
  GET_LATEST_BANNER_LIST,
  STOCK_SEARCH_SALESAPP,
  STOCK_FILTER_SALESAPP,
  STOCK_DETAILS_BY_BARCODE,
  STOCK_DETAILS_BY_BRAND,
  GET_CHECKOUT_BANNER,
  GET_CART_CHECKOUT_BANNERS,
  GET_SET_BARCODES
} from "./../actions/type";
const initialState = {
  purchases: [],
  purchaseReturns: [],
  purchaseBills: [],
  inventory: [],
  ecomSalesPurchases: [],
  purchaseReturnBarcodes: [],
  purchase: undefined,
  purchaseBillList: {},
  purchaseBillListById: {},
  po: {},
  pocredentials: [],
  purchaseReturnOrders: [],
  purchaseSearchData: [],
  purchasesBydate: [],
  purchasesBillsBydate: [],
  purchasereturnByDate: [],
  purchasereturnBillByDate: [],
  purchaseById: [],
  onlineEcomSales: [],
  inventoryBysearch: [],
  generatebarcodeBysearch: [],
  negativeInventory: [],
  brandanddesigncombination: [],
  brandanddesigncomboforSale: [],
  brandanddesigncombobyBarcode: [],
  availableStock: [],
  availableStockBySearch: [],
  bannerList: [],
  latestBannerList: [],
  stockSalesApp: [],
  stockDataSalesApp: [],
  stockDetailsByBarcode: [],
  stockDeatsilsByBrand: [],
  setPurchases: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LATEST_BANNER_LIST:
      return {
        ...state,
        latestBannerList: action.payload,
      };
    case GET_BANNER_LIST:
      return {
        ...state,
        bannerList: action.payload,
      };
    case GET_CHECKOUT_BANNER:
      return {
        ...state,
        checkoutBannerList: action.payload,
      };
    case GET_CART_CHECKOUT_BANNERS:
      return {
        ...state,
        checkoutBannerEcomList: action.payload,
      };
    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };
    case GET_PURCHASE:
      return {
        ...state,
        purchase: action.payload,
      };
    case GET_PURCHASE_RETURNS:
      return {
        ...state,
        purchaseReturns: action.payload,
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };
    case GET_PURCHASES_BILL:
      return {
        ...state,
        purchaseBills: action.payload,
      };

    case ADD_PURCHASE:
      return {
        ...state,
        purchases: [action.payload, ...state.purchases],
      };
    case ADD_PO:
      return {
        ...state,
        po: action.payload,
      };
    case GET_POCREDENTIALS:
      return {
        ...state,
        pocredentials: action.payload,
      };
    case GET_ECOM_SALES:
      return {
        ...state,
        ecomSalesPurchases: action.payload,
      };
    case GET_PURCHASE_RETURN_BARCODE:
      return {
        ...state,
        purchaseReturnBarcodes: action.payload,
      };
    case GET_PURCHASE_SEARCH_VALUE:
      return {
        ...state,
        purchaseSearchData: action.payload,
      };
    case ADD_ECOM_SALE:
      let data = action.payload;
      let temp = state.ecomSalesPurchases;
      let e = 0;
      let f = temp.length;
      while (e < f) {
        if (temp[e].barcode == data.barcode) {
          temp[e].sales = data.status;
          if (data.status == "ON") temp[e].salesDiscount = data.salesDiscount;
          temp[e].key = uuid();
          break;
        }
        ++e;
      }
      return {
        ...state,
        ecomSalesPurchases: [...temp],
      };
    case DELETE_PURCHASE:
      var updatedPurchases = [];
      updatedPurchases = state.purchases.filter((purchase) => {
        if (purchase._id != action.payload) return purchase;
      });
      return {
        ...state,
        purchases: updatedPurchases,
      };
    case DELETE_PURCHASE_RETURN:
      var updatedPurchases = [];
      updatedPurchases = state.purchases.filter((purchase) => {
        if (purchase._id != action.payload) return purchase;
      });
      return {
        ...state,
        purchases: updatedPurchases,
      };
    case GET_PURCHASE_RETURN_BILLLIST:
      return {
        ...state,
        purchaseBillList: action.payload,
      };
    case GET_PURCHASE_RETURN_BILLLIST_BYID:
      return {
        ...state,
        purchaseBillListById: action.payload,
      };
    case GET_PURCHASES_BYDATE:
      return {
        ...state,
        purchasesBydate: action.payload,
      };
    case GET_PURCHASESBILLS_BYDATE:
      return {
        ...state,
        purchasesBillsBydate: action.payload,
      };
    case GET_PURCHASERETURN_BYDATE:
      return {
        ...state,
        purchasereturnByDate: action.payload,
      };
    case GET_PURCHASE_RETURN_BILLLIST_BYDATE:
      return {
        ...state,
        purchasereturnBillByDate: action.payload,
      };
    case GET_PURCHASERETURN_INVOICE:
      return {
        ...state,
        purchaseReturnOrders: action.payload,
      };
    case GET_PURCHASES_BYID:
      return {
        ...state,
        purchaseById: action.payload,
      };
    case ADD_ONLINE_ECOM_SALE:
      return {
        ...state,
        onlineEcomSales: action.payload,
      };
    case GET_INVENTORY_BYSEARCH:
      return {
        ...state,
        inventoryBysearch: action.payload,
      };
    case GET_GENERATEBARCODE_BYSEARCH:
      return {
        ...state,
        generatebarcodeBysearch: action.payload,
      };
    case GET_NAGITIVE_INVENTORY:
      return {
        ...state,
        negativeInventory: action.payload,
      };

    case GET_BRAND_DESIGN_COMBINATION:
      return {
        ...state,
        brandanddesigncombination: action.payload,
      };
    case GET_BRAND_DESIGN_COMBO_FORSALE:
      return {
        ...state,
        brandanddesigncomboforSale: action.payload,
      };
    case GET_DESIGNANDBRAND_BY_BARCODE:
      return {
        ...state,
        brandanddesigncombobyBarcode: action.payload,
      };
    case GET_AVAILABLE_STOCK: {
      return {
        ...state,
        availableStock: action.payload,
      };
    }
    case GET_AVAILABLE_STOCK_BY_SEARCH: {
      return {
        ...state,
        availableStockBySearch: action.payload,
      };
    }
    case STOCK_SEARCH_SALESAPP: {
      return {
        ...state,
        stockSalesApp: action.payload,
      };
    }
    case STOCK_FILTER_SALESAPP: {
      return {
        ...state,
        stockDataSalesApp: action.payload,
      };
    }
    case STOCK_DETAILS_BY_BARCODE: {
      return {
        ...state,
        stockDetailsByBarcode: action.payload,
      };
    }
    case STOCK_DETAILS_BY_BRAND: {
      return {
        ...state,
        stockDeatsilsByBrand: action.payload,
      };
    }
    case GET_SET_BARCODES: {
      return {
        ...state,
        setPurchases: action.payload,
      };
    }

    default:
      return state;
  }
}


