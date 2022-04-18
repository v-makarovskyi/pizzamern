import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/message/Message";
import Category from "../../components/category/Category";
import {
  addToCart,
  removeFromCart,
  descreaseCart,
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/actions/cartActions";
import { CART_CLEAR_ITEMS } from "../../redux/constants/cartConstants";
import "./cart.scss";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems} = cart;

  const [tel, setTel] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [building, setBuilding] = useState('');
  const [front, setFront] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');
  const [intercom, setIntercom] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  

  const totalSumm = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseteCart = (id) => {
    dispatch(addToCart(id));
  };

  const handlerDecreaseCart = (id) => {
    dispatch(descreaseCart(id));
  };

  const handlerClearCart = () => {
    dispatch({
      type: CART_CLEAR_ITEMS
    });
  };

  const shippingAddressSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        tel, 
        street,
        house,
        building,
        front,
        floor,
        apartment,
        intercom,
      })
    );
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder')
  };
 

  return (
    <>
      <Category />
      <div className="cart">
        <div className="links">
          <Link to="/">
            <span className="left">Главная</span>
          </Link>
          <i class="bi bi-caret-right-fill"></i>
          <span>Корзина</span>
        </div>
        <div className="container">
          <div className="content">
            <div className="content__cart">
              <p className="title">Ваша корзина</p>
              {cartItems.length === 0 ? (
                <Message variant="danger">Корзина пуста</Message>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div className="content__cart item" key={item._id}>
                      <div className="cartitem__left">
                        <img src={item.image} alt="img" />
                        <span>{item.price} грн</span>
                      </div>
                      <div className="cartitem__center">
                        <span className="pizzaTitle">{item.name}</span>
                        <span className="size">Размер: {item.size} см</span>
                        <span className="weight">Вес: {item.weight} см</span>
                      </div>
                      <div className="cartitem__right">
                        <button
                          className="deleteItem"
                          onClick={() => removeCartHandler(item._id)}
                        >
                          <i className="bi bi-x-octagon-fill"></i>
                        </button>
                        <div className="selectQty">
                          <button
                            className="minus"
                            onClick={() => handlerDecreaseCart(item._id)}
                          >
                            <i class="bi bi-dash-lg"></i>
                          </button>

                          <span>{item.count}</span>

                          <button className="plus">
                            <i
                              className="bi bi-plus"
                              onClick={() => handleIncreaseteCart(item._id)}
                            ></i>
                          </button>
                        </div>
                        <span className="totalSum">
                          {item.price * item.count} грн
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <button onClick={() => handlerClearCart()}>
                Очистить корзину
              </button>
              <div className="orderPrice">
                <p>Сумма заказа: </p>
                <span>
                  <strong>{totalSumm.toFixed(0)}</strong> грн
                </span>
              </div>
              <div className="discount">
                <p>Ваша скидка: </p>
                <span>
                  <strong>{((totalSumm / 100) * 5).toFixed(1)}</strong> грн
                </span>
              </div>
              <div className="totalPrice">
                <p>Всего к оплате: </p>
                <span>
                  <strong>
                    {(totalSumm - (totalSumm / 100) * 5).toFixed(1)}
                  </strong>{" "}
                  грн
                </span>
              </div>
            </div>
            <div className="content__order">
              <p className="title">Оформить заказ</p>
              <div className="content__order wrapper">
                <div className="formContainer">
                  <form
                    className="addressForm"
                    onSubmit={shippingAddressSubmitHandler}
                  >
                    <div className="formGroup top">
                      <label htmlFor="tel">Ваш телефон:</label>
                      <input
                        id="tel"
                        type="text"
                        placeholder="Введите номер телефона"
                        value={tel || ''}
                        onChange={(e) => setTel(e.target.value)}
                      />
                    </div> 

                    <div className="formGroup top">
                      <label htmlFor="street">Улица:</label>
                      <input
                        id="street"
                        type="text"
                        placeholder="Введите название улицы"
                        value={street || ''}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>

                    <div className="addressDetails">
                      <div className="addressDetails wrapper">
                        <div className="formGroup-bottom">
                          <label htmlFor="house">Номер дома:</label>
                          <input
                            id="house"
                            type="number"
                            placeholder="Введите номер дома"
                            value={house || ''}
                            onChange={(e) => setHouse(e.target.value)}
                          />
                        </div>
                        <div className="formGroup-bottom">
                          <label htmlFor="building">Номер корпуса:</label>
                          <input
                            id="building"
                            type="number"
                            placeholder="Введите номер корпуса"
                            value={building || ''}
                            onChange={(e) => setBuilding(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="addressDetails wrapper">
                        <div className="formGroup-bottom">
                          <label htmlFor="front">Номер подъезда:</label>
                          <input
                            id="front"
                            type="number"
                            placeholder="Укажите номер подъезда"
                            value={front || ''}
                            onChange={(e) => setFront(e.target.value)}
                          />
                        </div>
                        <div className="formGroup-bottom">
                          <label htmlFor="floor">Этаж:</label>
                          <input
                            id="floor"
                            type="number"
                            placeholder="Укажите этаж"
                            value={floor || ''}
                            onChange={(e) => setFloor(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="addressDetails wrapper">
                        <div className="formGroup-bottom">
                          <label htmlFor="apartment">Номер квартиры:</label>
                          <input
                            id="apartment"
                            type="number"
                            placeholder="укажите номер квартиры"
                            value={apartment || ''}
                            onChange={(e) => setApartment(e.target.value)}
                          />
                        </div>
                        <div className="formGroup-bottom">
                          <label htmlFor="intercom">Код домофона:</label>
                          <input
                            id="intercom"
                            type="number"
                            placeholder="укажите код домофона"
                            value={intercom || ''}
                            onChange={(e) => setIntercom(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="payment">
                      <p>Вид оплаты:</p>
                      <div className="payment wrapper">
                        <div className="custom__radio">
                          <input
                            type="radio"
                            name="pay"
                            id="cash"
                            value="cash"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label for="cash" className="option__label">
                            Наличные
                          </label>
                        </div>
                        <div className="custom__radio">
                          <input
                            type="radio"
                            name="pay"
                            id="card"
                            value="card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label for="card" className="option__label">
                            Карта
                          </label>
                        </div>
                      </div>
                    </div>
                    
                      <button type="submit">Перейти к оформлению заказа</button>
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
