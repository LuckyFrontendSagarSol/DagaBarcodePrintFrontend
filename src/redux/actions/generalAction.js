import axios from "axios";
import { GET_ERRORS, GET_PRODUCTS_ON_SEARCH } from "./type";
import { backend_uri_server, backend_uri_local } from "../../util/constants";

export const getProductsByStyle = (styleId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/style/purchase/${styleId}`
    );
    console.log("Line 10", response);
    dispatch({
      type: GET_PRODUCTS_ON_SEARCH,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const getProductsByBrand = (brandId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${backend_uri_server}/api/v1/brand/purchase/${brandId}`
    );
    console.log("Line 10", response);
    dispatch({
      type: GET_PRODUCTS_ON_SEARCH,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};
