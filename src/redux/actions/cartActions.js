import axios from "axios";
import { uuid } from "uuidv4";
import React from "react";
import { backend_uri_server, backend_uri_local } from "../../util/constants";
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const GET_CART = "GET_CART";
export const GET_CART_CHECKOUT_BANNERS = "GET_CART_CHECKOUT_BANNERS";


//add to cart
export const addToCart = ({
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize,
  selectedProductMOQ,
  wsp,
  salesDiscount,
  selectedProductId,
}) => async (dispatch) => {
  try {
    let variation = item.variation;
    let f = variation.length;
    let e = 0;
    let productId;

    const userIdUser = localStorage.getItem("userId");

    if (!variation || variation.length === 0) {
      console.error("No variations found for this product.");
      return;
    }
    
    let found = false;
    while (e < f && !found) {
      if (variation[e].color === selectedProductColor) {
        let size = variation[e].size;
        const index = size.findIndex(
          (element) => element.name === selectedProductSize
        );
    
        if (index !== -1) {
          productId = size[index]._id;
          found = true;
        }
      }
      ++e;
    }
    
    if (!productId) {
      console.error("Product size or color not found.");
      return; // Exit if product ID cannot be determined
    }

    const cartItemId = productId;

    let response = await axios.patch(`${backend_uri_server}/api/v1/cart`, {
      cartItemId: cartItemId,
      userId: userIdUser,
      productId,
      quantityCount,
    });

    // Add a toast message
    if (addToast) {
      const customToast = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + item?.image[0]}
            alt="Your Image"
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
          {console.log("check my current item", item)}
          <div>
            <p>Added To Cart</p>
            <span>Design No. : {item?.name}</span>
            <br />
            <span>Brand : {item?.brand}</span>
            <br />
            <span>Price : {item?.price}</span>
            <br />
            <span>Size : {selectedProductSize || item.selectedProductSize}</span>
            <br />
            <span>Color : {selectedProductColor || item.selectedProductColor}</span>
          </div>
        </div>
      );

      addToast(customToast, {
        appearance: "success",
        autoDismiss: true,
      });
    }

    // Create payload object
    const payload = {
      ...item,
      cartItemId: cartItemId,
      quantity: quantityCount,
      selectedProductColor: selectedProductColor || item.selectedProductColor,
      _id: productId || "",
      selectedProductSize: selectedProductSize || item.selectedProductSize,
      selectedProductMOQ: selectedProductMOQ || item.selectedProductMOQ,
      wsp,
      salesDiscount,
      selectedProductId,
    };

    console.log("Dispatching payload: ", payload);

    dispatch({
      type: ADD_TO_CART,
      payload,
    });

    return response; // Return the response to the caller if needed
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw error; // Rethrow the error if necessary
  }
};




//get all cart data
export const getFullCart = (user, history) => async (dispatch) => {
  let response = await axios.get(`${backend_uri_server}/api/v1/cart`);
  if (Array.isArray(response.data)) {
    dispatch({
      type: GET_CART,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GET_CART,
      payload: [],
    });
  }
};


//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    // if (addToast) {
    //   addToast("Item Decremented From Cart", {
    //     appearance: "warning",
    //     autoDismiss: true,
    //   });
    // }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};

//increase from cart
export const increaseQuantity = (item, addToast) => {
  return (dispatch) => {
    // if (addToast) {
    //   addToast("Item Incremented From Cart", {
    //     appearance: "warning",
    //     autoDismiss: true,
    //   });
    // }
    dispatch({ type: INCREASE_QUANTITY, payload: item });
  };
};

//delete from cart
export const deleteFromCart = (item, addToast) => {


  return async (dispatch) => {
    await axios.delete(`${backend_uri_server}/api/v1/cart/${item._id}`);
    // if (addToast) {
    //   addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    // }
    dispatch({ type: DELETE_FROM_CART, payload: item });

  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return async (dispatch) => {
    await axios.delete(`${backend_uri_server}/api/v1/cart`);
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  }
  else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
  return 1;
};
