import {
  FETCH_PRODUCTS_SALE_SUCCESS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS,
  CHANGE_COLOR_IMAGE,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_ALL_PRODUCTS_SIDEBARLIST,
  FETCH_PRODUCTS_BY_FILTERING,
  FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO,
  FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO_MULTI,
  CHANGE_COLOR_IMAGE_MULTI
} from "../actions/productActions";
import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_STYLE,
  GET_PRODUCTS_ON_SEARCH,
} from "../actions/type";

const initState = {
  products: [],
  homeProducts: [],
  AllProduct: [],
  productByCategory: [],
  allProductSidebarList: [],
  allProductByFiltering: [],
  productByfilterandDesign: [],
  productByfilterandDesignMulti: [],

};

const productReducer = (state = initState, action) => {

  if (action.type === FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO) {
    return {
      ...state,
      productByfilterandDesign: action.payload
    };
  }

  if (action.type === FETCH_PRODUCTS_BY_FILTERING) {
    return {
      ...state,
      products: action.payload
    };
  }

  if (action.type === FETCH_ALL_PRODUCTS_SIDEBARLIST) {
    return {
      ...state,
      allProductSidebarList: action.payload
    };
  }


  if (action.type === FETCH_PRODUCTS_BY_CATEGORY) {
    return {
      ...state,
      productByCategory: action.payload
      // products: action.payload,
      // AllProduct: action.payload
    };
  }

  if (action.type === FETCH_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
      AllProduct: action.payload
    };
  }

  if (action.type === FETCH_PRODUCTS_SUCCESS) {

    return {
      ...state,
      // products: action.payload,
      homeProducts: action.payload,
    };
  }
  if (action.type === FETCH_PRODUCTS_SALE_SUCCESS) {

    return {
      ...state,
      homeProducts: action.payload,
    };
  }
  if (action.type === GET_PRODUCTS_BY_CATEGORY) {
    return {
      ...state,
      products: action.payload,
      // homeProducts : []
    };
  }
  if (action.type === GET_PRODUCTS_BY_STYLE) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === GET_PRODUCTS_ON_SEARCH) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === CHANGE_COLOR_IMAGE) {
    let product = state.products.data
    let color = action.payload.color
    let homData = state.homeProducts
    let allProduct = state.AllProduct.data
    let productByBrandandDesign = state.productByfilterandDesign


    const indexHomeProducts = state?.homeProducts?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload?.id))
    );
    const productIndex = state?.products?.data?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload.id))
    );
    const allProductIndex = state?.AllProduct?.data?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload?.id))
    );

    const currentAllProduct = state.AllProduct?.data?.[allProductIndex]

    const currentProduct = state.products?.data?.[productIndex]
    let homeProduct = state.homeProducts?.[indexHomeProducts]
    const productByDesignBrandIndexData = state?.productByfilterandDesign?.[0]

    let matchedVariationHomeProduct = homeProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationCurrentProducts = currentProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationAllProducts = currentAllProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationByDesignandBrand = productByDesignBrandIndexData?.variation?.find(variant => variant?.color == color);

    const matchedVariation = (product || []).flatMap(p => p.variation).find(variant => variant?.color === color);

    if (matchedVariation) {
      product.image = matchedVariation?.size[0]?.image;
    } else {
    }
    if (matchedVariationHomeProduct) {
      homeProduct.image = matchedVariationHomeProduct?.size?.[0]?.image || []
      product.image = matchedVariationHomeProduct?.size?.[0]?.image || []
    }
    if (matchedVariationCurrentProducts) {
      product.image = matchedVariationCurrentProducts?.size[0]?.image || []
      product[productIndex].image = matchedVariationCurrentProducts?.size[0]?.image || []
    }
    if (matchedVariationAllProducts) {
      allProduct[allProductIndex].image = matchedVariationAllProducts?.size[0]?.image
    }
    if (matchedVariationByDesignandBrand) {
      productByBrandandDesign[0].image = matchedVariationByDesignandBrand?.size[0]?.image
    }


    homData[indexHomeProducts] = homeProduct
    return {
      ...state,
      products: { ...state.products, data: product },
      homeProducts: homData,
      AllProduct: { ...state.AllProduct, data: allProduct },
      productByfilterandDesign: productByBrandandDesign
    };
  }
  if (action.type === FETCH_PRODUCTS_BY_BRAND_AND_DESIGNNO_MULTI) {
    return {
      ...state,
      productByfilterandDesignMulti: action.payload
    };
  }
  if (action.type === CHANGE_COLOR_IMAGE_MULTI) {
    let product = state.products.data
    let color = action.payload.color
    let homData = state.homeProducts
    let allProduct = state.AllProduct.data
    let productByBrandandDesignMulti = state.productByfilterandDesignMulti

    const indexHomeProducts = state?.homeProducts?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload?.id))
    );
    const productIndex = state?.products?.data?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload.id))
    );
    const allProductIndex = state?.AllProduct?.data?.findIndex(item =>
      item.variation.some(variant => variant.size?.some(size => size?._id === action.payload?.id))
    );

    const currentAllProduct = state.AllProduct?.data?.[allProductIndex]

    const currentProduct = state.products?.data?.[productIndex]
    let homeProduct = state.homeProducts?.[indexHomeProducts]
    const productByDesignBrandIndexData = state?.productByfilterandDesignMulti?.[0]

    let matchedVariationHomeProduct = homeProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationCurrentProducts = currentProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationAllProducts = currentAllProduct?.variation?.find(variant => variant?.color == color);
    let matchedVariationByDesignandBrand = productByDesignBrandIndexData?.variation?.find(variant => variant?.color == color);

    const matchedVariation = (product || []).flatMap(p => p.variation).find(variant => variant?.color === color);

    if (matchedVariation) {
      product.image = matchedVariation?.size[0]?.image;
    } else {
    }
    if (matchedVariationHomeProduct) {
      homeProduct.image = matchedVariationHomeProduct?.size?.[0]?.image || []
      product.image = matchedVariationHomeProduct?.size?.[0]?.image || []
    }
    if (matchedVariationCurrentProducts) {
      product.image = matchedVariationCurrentProducts?.size[0]?.image || []
      product[productIndex].image = matchedVariationCurrentProducts?.size[0]?.image || []
    }
    if (matchedVariationAllProducts) {
      allProduct[allProductIndex].image = matchedVariationAllProducts?.size[0]?.image
    }
    if (matchedVariationByDesignandBrand) {
      productByBrandandDesignMulti[0].image = matchedVariationByDesignandBrand?.size[0]?.image
    }


    homData[indexHomeProducts] = homeProduct
    return {
      ...state,
      products: { ...state.products, data: product },
      homeProducts: homData,
      AllProduct: { ...state.AllProduct, data: allProduct },
      productByfilterandDesignMulti: productByBrandandDesignMulti
    };
  }

  return state;
};

export default productReducer;