import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_DESCREASE_CART,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  
} from "../constants/cartConstants";

export const addToCart = (id, size, weight, price) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)

  const cartItems = getState().cart.cartItems.slice()
  const itemIndex = cartItems.findIndex((item) => item._id === data._id)

  if(itemIndex >= 0) {
    cartItems[itemIndex].count += 1
  } else {
    const tempProduct = {
      _id: data._id, 
      image: data.image,
      name: data.name,
      size, 
      weight, 
      price, 
      count: 1
    }
    cartItems.push(tempProduct)
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: { cartItems }
  })
  
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const descreaseCart = (id) => async (dispatch, getState) => {
  let cartItems
  cartItems = getState().cart.cartItems.slice()
  const itemIndex = cartItems.findIndex((x) => x._id === id)
  if(cartItems[itemIndex].count > 1) {
      cartItems[itemIndex].count -= 1
  } else if (cartItems[itemIndex].count === 1) {
    const nextCartItems = getState().cart.cartItems.slice().filter((x) => x._id !== id)
    cartItems = nextCartItems
  }
    
  dispatch({
    type: CART_DESCREASE_CART,
    payload: {cartItems}
  })
  
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
  

export const removeFromCart = (id) => async (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== id)

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { cartItems }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
} 

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}



