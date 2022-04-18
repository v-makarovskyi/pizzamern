import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_DESCREASE_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { cartItems: action.payload.cartItems };

    case CART_DESCREASE_CART:
      return { cartItems: action.payload.cartItems };

    case CART_REMOVE_ITEM:
      return { cartItems: action.payload.cartItems };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
