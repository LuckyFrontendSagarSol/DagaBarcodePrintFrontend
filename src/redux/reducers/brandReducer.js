import {
  ADD_BRAND,
  ADD_IMAGE_BRAND,
  BRAND_STATUS,
  DELETE_BRAND,
  DONE_DONE,
  GET_BRANDS,
  GET_ERRORS,
  UPDATE_BRAND,
  GET_BRAND_IMAGES,
  GET_BRAND_BYSEARCH,
  GET_PAGINATED_LIST,
  GET_BRAND_AND_DESIGN_BYSEARCH,
  GET_ECOM_BRAND
} from "./../actions/type";
const initialState = {
  brands: [],
  brand: {},
  heroSliderData: [],
  brandImages:[],
  paginatedList:[],
  brandBysearch: [],
  ItemsByBrandAndDesign: [],
  ecomBrands: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_ERRORS:
    //return action.payload;
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case GET_BRAND_AND_DESIGN_BYSEARCH:
      return {
        ...state,
        ItemsByBrandAndDesign: action.payload,
      };
      case 'CLEAR_DATA_BY_BRAND_AND_DESIGN':
        return {
          ...state,
          ItemsByBrandAndDesign: [], 
        };
    case ADD_BRAND:
      return {
        ...state,
        brands: [action.payload, ...state.brands],
      };
    case ADD_IMAGE_BRAND:
      let updatedBrandImg = state.brands.map((brand) => {
        if (brand._id == action.payload._id) return action.payload;
        return brand;
      });
      return {
        ...state,
        brands: updatedBrandImg,
        brand: {},
      };
    case BRAND_STATUS:
      return {
        ...state,
        brands: state.brands.map((brand) => {
          if (brand._id == action.payload) {
            if (brand.status == "ON") brand.status = "OFF";
            else brand.status = "ON";
          }

          return brand;
        }),
      };
    case DELETE_BRAND:
      var updatedBrands = [];
      updatedBrands = state.brands.filter((brand) => {
        if (brand._id != action.payload) return brand;
      });
      return {
        ...state,
        brands: updatedBrands,
      };
    case UPDATE_BRAND:
      let updatedBrand = state.brands.map((brand) => {
        if (brand._id == action.payload._id) return action.payload;
        return brand;
      });
      return {
        ...state,
        brands: updatedBrand,
        brand: {},
      };
    case DONE_DONE:
      return {
        ...state,
        heroSliderData: [
          {
            id: 1,
            title: "DAGA IMPEX",
            subtitle: "Known for Trust. Popular for Quality.",
            image: "/assets/img/slider/slider-new.jpg",
            url: "/shop-grid-standard",
          },
          {
            id: 2,
            title: "DAGA IMPEX",
            subtitle: "Known for Trust. Popular for Quality.",
            image: "/assets/img/slider/single-slide-1.png",
            url: "/shop-grid-standard",
          },
        ],
      };
      case GET_BRAND_IMAGES:
      return {
        ...state,
        brandImages: action.payload,
      };
      case GET_PAGINATED_LIST:
      return {
        ...state,
        paginatedList: action.payload,
      };
      case GET_BRAND_BYSEARCH:
      return {
        ...state,
        brandBysearch: action.payload,
      };
      case GET_ECOM_BRAND:
      return {
        ...state,
        ecomBrands: action.payload,
      };
    default:
      return state;
  }
}
