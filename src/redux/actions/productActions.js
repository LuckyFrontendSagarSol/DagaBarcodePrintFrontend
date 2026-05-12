import { backend_uri_server, backend_uri_local } from "../../util/constants";
import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_SALE_SUCCESS = "FETCH_PRODUCTS_SALE_SUCCESS";
export const CHANGE_COLOR_IMAGE = "CHANGE_COLOR_IMAGE"
export const FETCH_PRODUCTS_SUCCESS_SALES = "FETCH_PRODUCTS_SUCCESS_SALES"
export const FETCH_PRODUCTS_BY_CATEGORY = "FETCH_PRODUCTS_BY_CATEGORY"
export const FETCH_ALL_PRODUCTS_SIDEBARLIST = "FETCH_ALL_PRODUCTS_SIDEBARLIST"
export const FETCH_PRODUCTS_BY_FILTERING = "FETCH_PRODUCTS_BY_FILTERING"
export const FETCH_ALL_FILTER_PRODUCTS_SIDEBARLIST = "FETCH_ALL_FILTER_PRODUCTS_SIDEBARLIST"
export const FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO = "FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO"

export const CHANGE_COLOR_IMAGE_MULTI = "CHANGE_COLOR_IMAGE_MULTI"
export const FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO_MULTI = "FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO_MULTI"

const fetchProductsSuccess = () => async (dispatch) => {
  let products = await axios.get(
    `${backend_uri_server}/api/v1/purchase/dashboard/getEight`
  );
  if (products && products.data && products.data && products.data.purchases && products.data.purchases.length > 0) {
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: [...products?.data?.purchases, ...products?.data?.salePurchases],
    });
  } else {
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: [],
    });
  }
};

export const fetchProducts = (limit) => async (dispatch) => {
  let sales=localStorage.getItem("ecomSales")==="true" ? true : false;
  try {
    let products = await axios.get(
      `${backend_uri_server}/api/v1/allEcomProduct?page=${limit || 1}&limit=50&ecomSales=${sales}`
    );
    if (products && products.status == 200) {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products.data,
      });
    }
    return products.data
  } catch (error) {
    console.log("error", error)
    return []
  }
};


export const fetchProductsByFiltereing = (obj, limit) => async (dispatch) => {
  let sales=localStorage.getItem("ecomSales")==="true" ? true : false;
  obj = { ...obj, sales };
  try {
    let products = await axios.post(
      `${backend_uri_server}/api/v1/filteredEcomProduct?page=${limit || 1}&limit=50`, obj
    );
    if (products && products.status == 200) {
      dispatch({
        type: FETCH_PRODUCTS_BY_FILTERING,
        payload: products.data,
      });
    }
    return products
  } catch (error) {
    console.log("error", error)
  }
};


export const fetchProductsByCategory = (obj) => async (dispatch) => {
  try {
    let products = await axios.post(`${backend_uri_server}/api/v1/relatedProducts`, obj);
    dispatch({
      type: FETCH_PRODUCTS_BY_CATEGORY,
      payload: products.data,
    });

  } catch (error) {
    console.log("error", error)
  }
};

export const fetchAllProductsSidebarList = () => async (dispatch) => {
  let sales=localStorage.getItem("ecomSales")==="true" ? true : false;
  try {
    let response = await axios.get(`${backend_uri_server}/api/v1/listofcatbrand?ecomSales=${sales}`);
    dispatch({
      type: FETCH_ALL_PRODUCTS_SIDEBARLIST,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.log("error", error)
    return []
  }
};

export const fetchFilterProductSidebarList = (obj) => async (dispatch) => {
  let sales=localStorage.getItem("ecomSales")==="true" ? true : false;
  obj={...obj,sales}
  try {

    let response = await axios.post(`${backend_uri_server}/api/v1/filterEcatbrandlist`, obj);
    dispatch({
      type: FETCH_ALL_PRODUCTS_SIDEBARLIST,
      payload: response.data,
    });
    return response
  } catch (error) {
    console.log("error", error)
  }
};

export const fetchFilterProductByBrandandDesignNo = (obj) => async (dispatch) => {
  try {
    let response = await axios.post(`${backend_uri_server}/api/v1/searchBydesignandBrand`, obj);
    if(obj.type=="multi"){
    dispatch({
      type: FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO_MULTI,
      payload: response?.data?.data,
    });}
    else{
      dispatch({
        type: FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO,
        payload: response?.data?.data,
      });   
    }
return response?.data?.data
  } catch (error) {
    console.log("error", error)
  }
};


const fetchProductsSalesSuccess = () => async (dispatch) => {
  // let products = await axios.get(
  //   `${backend_uri_server}/api/v1/purchase/dashboard/getEight`
  // );
  dispatch({
    type: FETCH_PRODUCTS_SALE_SUCCESS,
    payload: [
      {
        id: "627a321202a6a65955b54b49",
        name: "620419",
        price: 131,
        saleItems: true,
        category: ["fashion"],
        tag: ["fashion"],
        variation: [
          {
            color: "BLUE",
            image: "/assets/img/product/fashion/2.jpg",
            size: [
              {
                name: "16X20 ",
                stock: 392,
              },
              {
                name: "22X26",
                stock: 445,
              },
            ],
          },
          {
            color: "RED",
            image: "/assets/img/product/fashion/2.jpg",
            size: [
              {
                name: "16X20 ",
                stock: 300,
              },
              {
                name: "22X26",
                stock: 250,
              },
            ],
          },
        ],
        image: [
          "/assets/img/product/fashion/4.jpg",
          "/assets/img/product/fashion/9.jpg",
        ],
      },
    ],
  });
};
// fetch products
export const fetchHomeProducts = (products) => {
  return (dispatch) => {
    dispatch(fetchProductsSuccess());
  };
};
export const fetchAllProducts = (products) => {
  return (dispatch) => {
    return dispatch(fetchProducts());
  };
};
export const fetchSalesProducts = (products) => {
  return (dispatch) => {
    dispatch(fetchProductsSalesSuccess());
  };
};

export const changeColorImage = (obj) => async (dispatch) => {
  if (obj.type == "multi") {
    dispatch({
      type: CHANGE_COLOR_IMAGE_MULTI,
      payload: obj,
    });
  } else {
    dispatch({
      type: CHANGE_COLOR_IMAGE,
      payload: obj,
    });
  }
};