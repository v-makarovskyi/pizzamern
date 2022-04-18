import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import {
  getOrderDetails,
  payOrder,
  deliveryOrder,
} from "../../redux/actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../redux/constants/orderConstants";

import "./orderpage.scss";

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDelivery = useSelector((state) => state.orderDelivery);
  const { success: successDelivery } = orderDelivery;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, order } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!order || order._id !== orderId || successDelivery || successPay) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    userInfo,
    order,
    orderId,
    loading,
    history,
    successDelivery,
    successPay,
  ]);

  console.log(order);

  const deliverHandler = (orderId) => {
    dispatch(deliveryOrder(orderId));
  };

  const payHandler = (orderId) => {
    dispatch(payOrder(orderId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="orderpage">
          <h2>ЗАКАЗ № {order._id}</h2>
          <div className="container">
            <div className="orderDetails">
              <div className="userDetails">
                <p className="userDetails user">Пользователь:</p>
                <span className="userDetails details">{order.user.name}, </span>
                <span className="userDetails details">
                  {order.user.email},{" "}
                </span>
                <span className="userDetails details">
                  {order.shippingAddress.tel}{" "}
                </span>
              </div>
              <div className="adrressDetails">
                <p className="adrressDetails address">Адрес доставки:</p>
                <span className="adrressDetails details">
                  ул. {order.shippingAddress.street},{" "}
                </span>
                <span className="adrressDetails details">
                  дом {order.shippingAddress.house},{" "}
                </span>
                <span className="adrressDetails details">
                  {" "}
                  корп. {order.shippingAddress.building},{" "}
                </span>
                <span className="adrressDetails details">
                  подъезд: {order.shippingAddress.front},{" "}
                </span>
                <span className="adrressDetails details">
                  эт. {order.shippingAddress.floor},{" "}
                </span>
                <span className="adrressDetails details">
                  кв: {order.shippingAddress.apartment},{" "}
                </span>
                <span className="adrressDetails details">
                  домофон: {order.shippingAddress.intercom}{" "}
                </span>
              </div>
              <div className="payment">
                <p className="paymentMethod">Тип оплаты:</p>
                <span className="payment details">{order.paymentMethod}</span>
              </div>
              <div className="products">
                <p>Детали заказа: </p>
                {order.orderItems.length === 0 ? (
                  <Message>Вы ничего не заказали</Message>
                ) : (
                  order.orderItems.map((item) => (
                    <div className="productsWrapper">
                      <img src={item.image} alt="img" />
                      <div className="productsDetails">
                        <span className="productsDetails details">
                          {item.name}
                        </span>
                        <span className="productsDetails details">
                          {item.weight} г
                        </span>
                        <span className="productsDetails details">
                          {item.size} см
                        </span>
                      </div>
                      <span className="sum">
                        {item.count} * {item.price} грн ={" "}
                        {item.count * item.price} грн
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="orderTotal">
              <p className="title">ИТОГО:</p>
              <table>
                <tr>
                  <th>Товары: </th>
                  <td>{order.itemsPrice} грн</td>
                </tr>
                <tr>
                  <th>Доставка:</th>
                  <td>{order.shippingPrice} грн</td>
                </tr>
                <tr>
                  <th>Налог: </th>
                  <td>{order.taxPrice} грн</td>
                </tr>
                <tr>
                  <th>Скидка: </th>
                  <td>{order.discount} грн</td>
                </tr>
                <tr>
                  <th>Всего к оплате: </th>
                  <td>{order.totalPrice} грн</td>
                </tr>
              </table>
              {userInfo && userInfo.isAdmin && (
                <button
                  className={!order.isPaid ? "orderBtn" : "orderBtn active"}
                  onClick={() => payHandler(orderId)}
                  disabled={order.isPaid && 'disabled'}
                >
                  {!order.isPaid ? "Отметить оплату" : "Оплачено"}
                </button>
              )}
              {userInfo && userInfo.isAdmin && (
                <button
                  className={
                    !order.isDelivered ? "orderBtn" : "orderBtn active"
                  }
                  onClick={() => deliverHandler(orderId)}
                  disabled={order.isDelivered && 'disabled'}
                >
                  {!order.isDelivered ? "Отметить доставку" : "Доставлено"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
