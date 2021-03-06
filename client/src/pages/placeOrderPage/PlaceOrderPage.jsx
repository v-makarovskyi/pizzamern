import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message";
import { createOrder } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
import { USER_DETAILS_RESET } from "../../redux/constants/userConstants";

import "./placeorderpage.scss";


const PlaceOrderPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!cart.shippingAddress && !cart.paymentMethod) {
    history.push("/cart");
  }

  cart.count = cart.cartItems.reduce((acc, item) => acc + item.count, 0)

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 500 ? 50 : 0;
  cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(1);
  cart.discount = (0.05 * cart.itemsPrice).toFixed(1);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice) -
    Number(cart.discount)
  ).toFixed(1);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [history, success, dispatch, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      discount: cart.discount,
      itemsPrice: cart.itemsPrice,
      totalPrice: cart.totalPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
    }));
  };
  

  return (
    <>
      <div className="placeorderpage">
        <div className="container">
          <div className="orderDetails">
            <div className="userDetails">
              <p className="userDetails user">????????????????????????:</p>
              <span className="userDetails details">{userInfo.name}, </span>
              <span className="userDetails details">{userInfo.email}, </span>
              <span className="userDetails details">
                {cart.shippingAddress.tel}
              </span>
            </div>
            <div className="adrressDetails">
              <p className="adrressDetails address">?????????? ????????????????:</p>
              <span className="adrressDetails details">
                ????. {cart.shippingAddress.street},{" "}
              </span>
              <span className="adrressDetails details">
                ?????? {cart.shippingAddress.house},{" "}
              </span>
              <span className="adrressDetails details">
                ???????????? {cart.shippingAddress.building},{" "}
              </span>
              <span className="adrressDetails details">
                ?????????????? {cart.shippingAddress.front},{" "}
              </span>
              <span className="adrressDetails details">
                ???????? {cart.shippingAddress.floor},{" "}
              </span>
              <span className="adrressDetails details">
                ????. {cart.shippingAddress.apartment},{" "}
              </span>
              <span className="adrressDetails details">
                ??????????????: {cart.shippingAddress.intercom}{" "}
              </span>
            </div>
            <div className="payment">
              <p className="paymentMethod">?????? ????????????:</p>
              <span className="payment details">{cart.paymentMethod}</span>
            </div>
            <div className="products">
              <p>????????????:</p>
              {cart.cartItems.length === 0 ? (
                <Message variant="danger">???? ?????? ???????????? ???? ????????????????</Message>
              ) : (
                <div className="productsWrapper">
                  {cart.cartItems.map((item) => (
                    <div div className="productItem">
                      <img src={item.image} alt="img" />
                      <div className="productsDetails">
                        <span className="productsDetails details">
                          {item.name}
                        </span>
                        <span className="productsDetails details">
                          {item.weight} ??
                        </span>
                        <span className="productsDetails details">
                          ??.{item.size} ????
                        </span>
                      </div>
                      <span className="sum">
                        {item.count} * {item.price} ?????? ={" "}
                        {item.count * item.price} ??????
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="orderTotal">
            <p className="title">??????????:</p>
            <table>
              <tr>
                <th>????????????: </th>
                <td>{cart.itemsPrice} ??????</td>
              </tr>
              <tr>
                <th>????????????????:</th>
                <td>{cart.shippingPrice} ??????</td>
              </tr>
              <tr>
                <th>??????????: </th>
                <td>{cart.taxPrice} ??????</td>
              </tr>
              <tr>
                <th>????????????: </th>
                <td>{cart.discount} ??????</td>
              </tr>
              <tr>
                <th>?????????? ?? ????????????: </th>
                <td>{cart.totalPrice} ??????</td>
              </tr>
            </table>
              <button
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                ???????????????? ??????????
              </button>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
