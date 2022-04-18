import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";

import Category from "../../components/category/Category";

import "./pizzapage.scss";
import { addToCart } from "../../redux/actions/cartActions";

const PizzaPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!product.name || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }
  }, [product, match, dispatch]);

  

  const handleDetailsProduct = () => {
    const checkboxs = document.querySelectorAll(".inputItem");
    checkboxs.forEach((checkbox) => {
      checkbox.onchange = () => {
        const checked = document.querySelectorAll(".inputItem:checked");
        [].map.call(checked, function (item) {
          const data = JSON.parse("[" + item.value + "]");
          setSize(data[0]);
          setWeight(data[1]);
          setPrice(data[2]);
        });
      };
    });
  };
  
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, size, weight, price))
    history.push('/cart')
  } 

  return (
    <>
      <Category /> 
      <div className="pizzapage">
        <div className="links">
          <Link to="/">
            <span>Главная</span>
          </Link>
          <i class="bi bi-caret-right-fill"></i>
          <Link to="/products/pizza">
            <span>Пицца</span>
          </Link>
          <i class="bi bi-caret-right-fill"></i>
          <span>Пицца Маргарита</span>
        </div>
        <h2>{product.name}</h2>
        <div className="container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="content">
              <div className="content__left">
                <div className="img__container">
                  <img src={product.image} alt="img" />
                </div>
                <div className="description">
                  <p>{product.desc}</p>
                </div>
              </div>
              <div className="content__right">
                <div className="pizza__size">
                  <div className="pizza__size item">
                    <div className="custom__radio">
                      <input
                        id="radio1"
                        type="radio"
                        name="radiobutton"
                        className="inputItem"
                        value={[
                          product && product.size && product?.size[0],
                          product && product.weight && product.weight[0],
                          product && product.price && product.price[0],
                        ]}
                        onChange={handleDetailsProduct}
                      />
                      <label for="radio1" className="option__label"></label>
                    </div>
                    <div className="sizeAndWeight">
                      <div className="pizza__size-size">
                        <img
                          src="https://www.orman.kiev.ua/wp-content/uploads/2021/04/pitstsa-paperoni-1-300x300.png"
                          alt="img"
                        />
                        <span>{ product && product.size && product?.size[0]} см</span>
                      </div>
                      <div className="pizza__size-weight">
                        <img
                          src="https://sudarshana.ru/wp-content/uploads/2016/10/tula-%D0%B2%D0%B5%D1%81%D1%8B.png"
                          alt="img"
                        />
                        <span>{ product && product.weight && product.weight[0]} г</span>
                      </div>
                    </div>
                    <span className='pizza__price'>{ product && product.price && product.price[0]} грн</span>
                  </div>
                  <div className="pizza__size item">
                    <div className="custom__radio">
                      <input
                        id="radio2"
                        type="radio"
                        name="radiobutton"
                        className="inputItem"
                        value={[
                          product && product.size && product?.size[1],
                          product && product.weight && product.weight[1],
                          product && product.price && product.price[1],
                        ]}
                        onChange={handleDetailsProduct}
                      />
                      <label for="radio2" className="option__label"></label>
                    </div>
                    <div className="sizeAndWeight">
                      <div className="pizza__size-size">
                        <img
                          src="https://www.orman.kiev.ua/wp-content/uploads/2021/04/pitstsa-paperoni-1-300x300.png"
                          alt="img"
                        />
                        <span>{product && product.size && product?.size[1]} см</span>
                      </div>
                      <div className="pizza__size-weight">
                        <img
                          src="https://sudarshana.ru/wp-content/uploads/2016/10/tula-%D0%B2%D0%B5%D1%81%D1%8B.png"
                          alt="img"
                        />
                        <span>{product && product.weight && product.weight[1]} г</span>
                      </div>
                    </div>
                    <span  className='pizza__price'>{product && product.price && product.price[1]} грн</span>
                  </div>
                  <div className="pizza__size item">
                    <div className="custom__radio">
                      <input
                        id="radio3"
                        type="radio"
                        name="radiobutton"
                        className="inputItem"
                        value={[
                          product && product.size && product?.size[2],
                          product && product.weight && product.weight[2],
                          product && product.price && product.price[2],
                        ]}
                        onChange={handleDetailsProduct}
                      />

                      <label for="radio3" className="option__label"></label>
                    </div>
                    <div className="sizeAndWeight">
                      <div className="pizza__size-size">
                        <img
                          src="https://www.orman.kiev.ua/wp-content/uploads/2021/04/pitstsa-paperoni-1-300x300.png"
                          alt="img"
                        />
                        <span>{product && product.size && product?.size[2]} см</span>
                      </div>
                      <div className="pizza__size-weight">
                        <img
                          src="https://sudarshana.ru/wp-content/uploads/2016/10/tula-%D0%B2%D0%B5%D1%81%D1%8B.png"
                          alt="img"
                        />
                        <span>{ product && product.weight && product.weight[2]} г</span>
                      </div>
                    </div>
                    <span className='pizza__price'>{product && product.price && product.price[2]} грн</span>
                  </div>
                </div>

                <div className="total">
                  <div className="total__super">
                    <p>
                      Вес: <span>{weight ? weight : 0} г</span>
                    </p>
                    <p>
                      СТОИМОСТЬ: <span>{price ? price : 0} грн</span>
                    </p>
                  </div>
                  <button onClick={addToCartHandler}>
                    {" "}
                    <i
                      class="bi bi-cart-fill"
                      style={{ fontSize: "20px", color: "white" }}
                    ></i>
                    <span>В корзину</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PizzaPage;
