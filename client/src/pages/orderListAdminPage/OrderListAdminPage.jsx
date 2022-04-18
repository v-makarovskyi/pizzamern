import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import { listOrders } from "../../redux/actions/orderActions";

import "./orderlistadminpage.scss";

const OrderListAdminPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [userInfo, dispatch, history]);

  return (
    <>
      <div className="orderlistadminpage">
        <div className="container">
          <p className="title">Заказы</p>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Пользователь</th>
                  <th>Дата</th>
                  <th>Итого</th>
                  <th>Оплачено</th>
                  <th>Доставлено</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <div className="pay">
                          <i
                            className="bi bi-x-lg"
                            style={{
                              fontSize: "20px",
                              color: "red",
                              fontWeight: "900",
                            }}
                          ></i>
                        </div>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <div className="delivery">
                          <i
                            className="bi bi-x-lg"
                            style={{
                              fontSize: "20px",
                              color: "red",
                              fontWeight: "900",
                            }}
                          ></i>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className="orderDetails">
                          Подробности заказа
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderListAdminPage;
