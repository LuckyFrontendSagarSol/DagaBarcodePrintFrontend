import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import dealerReducer from "./dealerReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import colorReducer from "./colorReducer";
import groupReducer from "./groupReducer";
import locationReducer from "./locationReducer";
import seasonReducer from "./seasonReducer";
import sizeReducer from "./sizeReducer";
import styleReducer from "./styleReducer";
import sectionReducer from "./sectionReducer";
import purchaseReducer from "./purchaseReducer";
import customerReducer from "./customerReducer";
import saleReducer from "./saleReducer";
import ageGroupReducer from "./ageGroupReducer";
import floorReducer from "./floorReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import reportReducer from "./reportReducer";
import dashBoardReducer from "./dashBoardReducer";
import progressBarReducer from "./ProgressBarReducer"
import openingStockReducer from "./openingStockReducer";
import warehouseReducer from "./warehouseReducer";
import recycleBinReducer from "./recycleBinReducer";
import ecomSaleReducer from "./ecomSaleReducer"
import poReducer from "./poReducer";
import textureReducer from "./textureReducer"
import purchaseOrderReducer from "./purchaseOrderReducer";
import rackManagementReducer from "./rackManagementReducer";
import packageMethodReducer from "./packageMethodReducer";
import tagReducer from "./tagReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  dealersData: dealerReducer,
  brandsData: brandReducer,
  categoryData: categoryReducer,
  colorData: colorReducer,
  groupData: groupReducer,
  locationData: locationReducer,
  seasonData: seasonReducer,
  sizeData: sizeReducer,
  styleData: styleReducer,
  sectionData: sectionReducer,
  purchaseData: purchaseReducer,
  saleData: saleReducer,
  customerData: customerReducer,
  ageGroupData: ageGroupReducer,
  floorData: floorReducer,
  userData: userReducer,
  reportData: reportReducer,
  dashboardData: dashBoardReducer,
  errorData: errorReducer,
  progressBarReducer : progressBarReducer,
  openingStockData : openingStockReducer,
  warehouseData: warehouseReducer,
  recycleBin: recycleBinReducer,
  ecomSaleData : ecomSaleReducer,
  poData : poReducer,
  textureData: textureReducer,
  purchaseOrderData: purchaseOrderReducer,
  rackData: rackManagementReducer,
  packageMethodReducer: packageMethodReducer,
  tagData: tagReducer
});

export default rootReducer;
