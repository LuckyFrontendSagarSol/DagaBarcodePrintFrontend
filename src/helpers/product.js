// get products
export const getProducts = (products, category, type, limit) => {

  const finalProducts = category
    ? products.filter(
      (product) => product.category.filter((single) => single === category)[0]
    )
    : products;

  if (type && type === "new") {

    const newProducts = finalProducts.filter((single) =>  single.variation[0].size[0].sales !== "ON");
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {

    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {

    // const saleItems = finalProducts.filter(
    //   (single) => single.discount && single.discount > 0
    // );

    const saleItems = finalProducts.filter(
      (single) => single.variation[0].size[0].sales == "ON"
    );

    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      let tempCartItem = cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )

      if (tempCartItem.length > 1) {
        return tempCartItem[1]?.quantity + tempCartItem[0]?.quantity
      } else {
        return tempCartItem[0]?.quantity
      }

      // return cartItems.filter(
      //   (single) =>
      //     single.id === product.id &&
      //     single.selectedProductColor === color &&
      //     single.selectedProductSize === size
      // )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  var selectedPram = [];
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    if (item?.classList?.contains("active")) {
      let element = item.getElementsByClassName("sort-type-name");
      selectedPram.push(element[0].innerText.toLowerCase());
    }
  });
  var selectedProducts = products;
  if (!selectedPram.includes('all categories')) {
    let Products = selectedProducts.filter((product) => {
      if (selectedPram.includes(product.categoryName.toLowerCase())) {
        return product;
      }
    });
    if (Products.length !== 0)
      selectedProducts = Products;
  }
  if (!selectedPram.includes('all styles')) {
    let Products = selectedProducts.filter((product) => {
      if (selectedPram.includes(product.style.toLowerCase())) {
        return product;
      }
    });
    if (Products.length !== 0)
      selectedProducts = Products;
  }
  if (!selectedPram.includes('all brands')) {
    let Products = selectedProducts.filter((product) => {
      if (selectedPram.includes(product.brand.toLowerCase())) {
        return product;
      }
    });
    if (Products.length !== 0)
      selectedProducts = Products;
  }
  if (!selectedPram.includes('all colors')) {
    let Products = selectedProducts.filter((product) => {
      return product.variation &&
        product.variation.filter((single) => {
          if (selectedPram.includes(single.color.toLowerCase())) {
            return product;
          }
        })[0]
    });
    if (Products.length !== 0)
      selectedProducts = Products;
  }
  if (!selectedPram.includes('all sizes')) {
    let Products = selectedProducts.filter((product) => {
      return product.variation &&
        product.variation.filter((single) => {
          return single.size.filter((size) => {
            if (selectedPram.includes(size.name.toLowerCase())) {
              return product;
            }
          })[0]
        })[0]
    });
    if (Products.length !== 0)
      selectedProducts = Products;
  }
  if (products && sortType && sortValue) {

    // var selectedProducts = [];
    // if (sortType === "category") {
    //   return products.filter(
    //     (product) =>
    //       product.category.filter((single) => single === sortValue)[0]
    //   );
    // }
    // if (sortType === "style") {
    //   filterButtons.forEach((item) => {
    //     if (item?.classList?.contains("active")) {
    //       let element = item.getElementsByClassName("sort-type-name");
    //       selectedProducts.push(element[0].innerText);
    //     }
    //   });
    //   return products.filter((product) => {
    //     if (selectedProducts.includes(product.style)) {
    //       return product;
    //     }
    //   });
    // }
    // if (sortType === "brand") {
    //   filterButtons.forEach((item) => {
    //     if (item?.classList?.contains("active")) {
    //       let element = item.getElementsByClassName("sort-type-name");
    //       selectedProducts.push(element[0].innerText);
    //     }
    //   });
    //   return products.filter((product) => {
    //     if (selectedProducts.includes(product.brand)) {
    //       return product;
    //     }
    //   });
    // }
    // if (sortType === "categoryName") {
    //   return products.filter((product) => product.categoryName === sortValue);
    // }
    // if (sortType === "tag") {
    //   return products.filter(
    //     (product) => product.tag.filter((single) => single === sortValue)[0]
    //   );
    // }
    // if (sortType === "color") {
    //   return products.filter(
    //     (product) =>
    //       product.variation &&
    //       product.variation.filter((single) => single.color === sortValue)[0]
    //   );
    // }
    // if (sortType === "size") {
    //   return products.filter(
    //     (product) =>
    //       product.variation &&
    //       product.variation.filter(
    //         (single) =>
    //           single.size.filter((single) => single.name === sortValue)[0]
    //       )[0]
    //   );
    //}
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return selectedProducts;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual style
export const getIndividualStyles = (products) => {
  let productStyles = [];
  products &&
    products.map((product) => {
      return productStyles.push(product.style);
    });
  const individualProductStyles = getIndividualItemArray(productStyles);
  return individualProductStyles;
};
// get individual brand
export const getIndividualBrands = (products) => {
  let productBrands = [];
  products &&
    products.map((product) => {
      return productBrands.push(product.brand);
    });
  const individualProductBrands = getIndividualItemArray(productBrands);
  return individualProductBrands;
};

// get individual categoryName
export const getIndividualCategotyNames = (products) => {
  let productCategotyNames = [];
  products &&
    products.map((product) => {
      return productCategotyNames.push(product.categoryName);
    });
  const individualProductCategotyNames =
    getIndividualItemArray(productCategotyNames);
  return individualProductCategotyNames;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  if (e.currentTarget.classList.contains("active")) {
    return e.currentTarget.classList.remove("active");
  }
  e.currentTarget.classList.toggle("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
