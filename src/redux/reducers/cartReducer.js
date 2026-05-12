import uuid from "uuid/v4";
import axios from "axios";
import { message } from "antd"
import { backend_uri_server, backend_uri_local } from "../../util/constants";

import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  GET_CART,
} from "../actions/cartActions";
import { async } from "q";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;
  const updateQtyy = (cartItems) => {

    let userId = localStorage.getItem("userId")
    let updatedCart = cartItems.map((item) =>
      item._id == product._id
        ? { ...item, quantity: item.quantity + item.MOQ <= item.stock ? item.quantity + item.MOQ : item.quantity }
        : item
    );

    cartItems.map((item) => {
      if (item._id == product._id && item.quantity + item.MOQ <= item.stock) {
        // message.success("Quantity Increased Successfully")
      } else if (item._id == product._id && item.quantity + item.MOQ >= item.stock) {
        message.warn("Maximum Quantity Reached")
      }
    })


    let result = updatedCart.find(item => item._id === product._id)
    let quantity = result.quantity
    let productId = result._id

    let obj = {
      "userId": userId,
      "quantity": quantity,
      "productId": productId,
      "cartItemId": result.cartItemId
    }
    axios.patch(`${backend_uri_server}/api/v1/updatingCart`, obj).then(response => console.log("check api response", response)).catch(error => console.log("check error", error))
    return updatedCart
  }


  const decreaseQtyy = (cartItems) => {
    let userId = localStorage.getItem("userId")
    let updatedCart = cartItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity <= item.MOQ ? item.quantity : item.quantity - item.MOQ }
        : item
    );

    cartItems.map((item) => {
      if (item._id === product._id && item.quantity > item.MOQ) {
        // message.success("Quantity Decreased Successfully")
      } else if (item._id == product._id && item.quantity == item.MOQ) {
        message.warn("Minimum Quantity Reached")
      }
    })

    let result = updatedCart.find(item => item._id === product._id)
    let quantity = result.quantity
    let productId = result._id

    let obj = {
      "userId": userId,
      "quantity": quantity,
      "productId": productId,
      "cartItemId": result.cartItemId
    }
    axios.patch(`${backend_uri_server}/api/v1/updatingCart`, obj).then(response => console.log("check api response", response)).catch(error => console.log("check error", error))
    return updatedCart
  }


  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (product.variation === undefined) {
      const cartItem = cartItems.filter((item) => item.id === product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid(),
          },
        ];
      } else {
        alert("Line 33");
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1,
            }
            : item
        );
      }
      // for variant products
    } else {
      const cartItem = cartItems.filter(
        (item) =>

          item.cartItemId === product.cartItemId &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          product.selectedProductMOQ &&
          product.selectedProductMOQ === item.MOQ || item.selectedProductMOQ &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            // cartItemId: uuid(),
          },
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1,
              selectedProductColor: product.selectedProductColor,
              selectedProductSize: product.selectedProductSize,
              selectedProductMOQ: product.selectedProductMOQ
            }
            : item

        );
      }
    }
  }

  // if (action.type === DECREASE_QUANTITY) {
  //   if (product.quantity === 1) {
  //     const remainingItems = (cartItems, product) =>
  //       cartItems.filter(
  //         (cartItem) => cartItem.cartItemId !== product.cartItemId
  //       );
  //     return remainingItems(cartItems, product);
  //   } else {
  //     return cartItems.map((item) =>
  //       item.cartItemId === product.cartItemId
  //         ? { ...item, quantity: item.quantity == item.MOQ ? item.quantity : item.quantity - item.MOQ }
  //         : item
  //     );
  //   }
  // }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity <= product.MOQ) {
      // const remainingItems = (cartItems, product) =>
      //   cartItems.filter(
      //     (cartItem) => cartItem.cartItemId !== product.cartItemId
      //   );
      // return remainingItems(cartItems, product);
    } else {

      return decreaseQtyy(cartItems)
    }
  }

  // if (action.type === INCREASE_QUANTITY) {
  //   return cartItems.map((item) =>
  //     item.cartItemId === product.cartItemId
  //       ? { ...item, quantity: item.quantity < item.totalBox * item.MOQ ? item.quantity + item.MOQ : item.quantity }
  //       : item
  //   );

  // }



  if (action.type === INCREASE_QUANTITY) {
    return updateQtyy(cartItems)
    // return cartItems.map((item) =>
    //   item.cartItemId === product.cartItemId
    //     ? { ...item, quantity: item.quantity < item.totalBox * item.MOQ ? item.quantity + item.MOQ : item.quantity }
    //     : item
    // );

  }


  // added check for same color , same size for same product in case of delete
  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter((cartItem) => cartItem.id !== product.id ||
        cartItem.selectedProductSize !== product.selectedProductSize ||
        cartItem.selectedProductColor !== product.selectedProductColor
      );
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false;
    });
  }
  if (action.type == GET_CART) {
    return product;
  }
  return state;
};

export default cartReducer;
