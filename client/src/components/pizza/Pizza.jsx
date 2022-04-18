import React, { useState } from "react";
import { Link,  useHistory } from "react-router-dom";
import "./pizza.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

const Pizza = ({ item }) => {

  const history = useHistory()
  
  const dispatch = useDispatch();

  const [productSize, setProductSize] = useState("");

 

  const addToCartHandler = () => {
    if (productSize === "25") {
      dispatch(addToCart(item._id, productSize, item.weight[0], item.price[0]));
    } else if (productSize === "32") {
      dispatch(addToCart(item._id, productSize, item.weight[1], item.price[1]));
    } else {
      dispatch(
        addToCart(item._id, item.size[2], item.weight[2], item.price[2])
      );
    }
    history.push('/cart')
  };

  return (
    <div className="pizzaContainer">
      <h2>{item.name}</h2>

      <div className="imageContainer">
        <Link to={`/product/${item._id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      <div className="pizza-Type">
        <div className="pizza-Type-1">
          <button
            id="btn"
            onClick={() => setProductSize(item.size[0])}
            className="btn-type-1"
          >
            25 см
          </button>
          <button
            id="btn"
            onClick={() => setProductSize(item.size[1])}
            className="btn-type-1"
          >
            32 см
          </button>
          <button
            id="btn"
            onClick={() => setProductSize(item.size[2])}
            className="btn-type-1"
          >
            42 см
          </button>
        </div>
        {/* <div className="pizza-Type-2">
            <button className="btn-type-2">Пышное</button>
            <button className="btn-type-2">Тонкое</button>
            <button className="btn-type-2">Злаковое</button>
        </div> */}
      </div>
      <div className="cardBuy">
        <p className="cardPrice">
          <span>{item.price[0]} грн</span>
        </p>
        <button className="cardBtn" onClick={addToCartHandler}>
          <i
            className="bi bi-cart-fill"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );
};

export default Pizza;
