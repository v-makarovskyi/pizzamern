import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";
import { listMyOrders } from "../../redux/actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

import "./profile.scss";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, success, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="content">
            <div className="userDetails">
              <p className="title">Профиль пользователя</p>
              {message && <Message variant="danger">{message}</Message>}
              {}
              {success && <Message>Профиль успешно обновлен</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className="formGroup">
                    <label htmlFor="name">Имя</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="password">Пароль</label>
                    <input
                      id="passrord"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="password">Повторите пароль</label>
                    <input
                      id="passrord"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn__profile">
                    Обновить
                  </button>
                </form>
              )}
            </div>
            <div className="orderDetails">
              <p className="title">Мои заказы</p>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (
                <table>
                  <colgroup>
                    <col style={{ backgroundColor: "yellow" }} span="6" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th>Оплата</th>
                      <th>Доставка</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
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
                            <button>Подробности заказа</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
