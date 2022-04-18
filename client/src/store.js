import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducers";

import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productDeleteReducer,
  productNewReducer
} from "./redux/reducers/productReducers";

import { cartReducer } from './redux/reducers/cartReducers'

import {
  orderCreateReducer, orderDeliveryReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer
} from './redux/reducers/orderReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,

  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productNew: productNewReducer,

  cart: cartReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDelivery: orderDeliveryReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem('cartItems'))
: []

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
? JSON.parse(localStorage.getItem("paymentMethod"))
: {}


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
