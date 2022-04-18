import "./water.scss";
/* import { ShoppingCartOutlined } from "@material-ui/icons"; */

const Water = ({item}) => {
  return (
    <div className="waterContainer">
      <p>{item.name}</p>
      <div className="imageContainer">
        <img
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="water__details">
        <span>Выберите размер</span>

        <div className="capacity">{item.scope}l</div>
      </div>
      <div className="cardBuy">
        <p className="cardPrice">
          <span>{item.price} </span> грн
        </p>
        <button className="cardBtn">
          {/* <ShoppingCartOutlined /> */}
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );
};

export default Water;
