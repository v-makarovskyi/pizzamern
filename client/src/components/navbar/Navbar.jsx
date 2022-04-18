import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

import "./navbar.scss";

const Navbar = ({ toggleVisibleModal }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const totalSumm = cart.cartItems.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );
  const totalCount = cart.cartItems.reduce((acc, item) => acc + item.count, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <div className="navbar__top">
        <div className="navbar__top-left">
          <i className="bi bi-geo-alt-fill"></i>
          <span> ул. Хорива, 25/12, г. Киев</span>
        </div>
        <div className="navbar__top-center">
          <div className="facebook">
            <i className="bi bi-facebook"></i>
          </div>
          <div className="instagram">
            <i className="bi bi-instagram"></i>
          </div>
        </div>
        <div className="navbar__top-right">
          {userInfo ? (
            <div className="profile">
              <div className="profile top">
                <p className="title">{userInfo.name}</p>
                <i className="bi bi-caret-down-fill"></i>
              </div>
              <div className="options">
                <div className="options-item">
                  <Link to="/profile">
                    <span>Профиль</span>
                  </Link>
                </div>
                <div className="options-item">
                  <span onClick={logoutHandler}>Выйти</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="profile">
              <div className="profile top">
                <Link to="/login">
                  <p className="title">Войти</p>
                </Link>
              </div>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="admin">
              <div className="admin top">
                <p className="title">aдмин</p>
              </div>
              <div className="options">
                <div className="options-item">
                  <Link to="/admin/userlist">
                    <span>пользователи</span>
                  </Link>
                </div>
                <div className="options-item">
                  <Link to="/admin/productlist">
                    <span>продукты</span>
                  </Link>
                </div>
                <div className="options-item">
                  <Link to="/admin/orderlist">
                    <span>заказы</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="navbar__center">
        <div className="navbar__center-contact">
          <div className="center__contact-item">
            <img
              src="https://cdn2.downdetector.com/static/uploads/logo/whatsapp-messenger.png"
              alt="whatsapp"
              className="contact__img"
            />
            <span className="tel">
              +38 <span className="green">(050)</span> 444 55 66
            </span>
          </div>
          <div className="center__contact-item">
            <img
              src="https://i2.wp.com/zabor-kh.com.ua/wp-content/uploads/2020/01/%D0%BA%D0%B8%D0%B5%D0%B2%D1%81%D1%82%D0%B0%D1%80.png?fit=300%2C300"
              alt="kyivstar"
              className="contact__img"
            />
            <span className="tel">
              +38 <span className="green">(067)</span> 444 55 66
            </span>
          </div>
          <div className="center__contact-item">
            <img
              src="https://shop-gsm.ua/files/pages/lifecell_logo.png"
              alt="lifecell"
              className="contact__img"
            />
            <span className="tel">
              +38 <span className="green">(093)</span> 444 55 66
            </span>
          </div>
          <button className="btn__contact" onClick={toggleVisibleModal}>
            Заказть звонок
          </button>
        </div>
        <Link to="/">
          <div className="navbar__center-logo">
            <span className="green">P</span>
            <span className="red">I</span>
            <span className="green">Z</span>
            <span className="red">Z</span>
            <span className="green">A</span>
            <span className="red">M</span>
            <span className="green">E</span>
            <span className="red">R</span>
            <span className="green">N</span>
          </div>
        </Link>
        <div className="navbar__center-right">
          <div className="cart">
            <h2> Ваша корзина</h2>
            <Link to="/cart">
              <i
                className="bi bi-cart-fill"
                style={{ fontSize: "25px", color: "red" }}
              >
                <span style={{ color: "greeen" }}>{totalCount}</span>
              </i>
            </Link>
            <span className="price">{totalSumm}</span> грн
          </div>
          <div className="delivery">
            <div className="shipping">
              <i className="bi bi-truck"></i>
            </div>
            <span>Доставка ежедневно 08.00 - 22.00 </span>
          </div>
        </div>
      </div>
      <div className="navbar__bottom">
        <ul className="navbar__bottom-list">
          <li>
            <span>O PIZZAMERN</span>
          </li>
          <li>
            <span> Видео и пресса</span>
          </li>
          <li>
            <span>Доставка и оплата</span>
          </li>
          <li>
            <span> Акции и скидки</span>
          </li>
          <li>
            <span>Отзывы</span>
          </li>
          <li>
            <span>Контакты</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
