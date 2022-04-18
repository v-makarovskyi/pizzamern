import React  from "react";


import "./modal.scss";

const Modal = ({visibleModal, setVisibleModal}) => {

  

  return (
    <div className="modal">
      <div className={visibleModal ? "modal__bg active" : "modal__bg"}>
        <div className={visibleModal ? "modal__order active" : "modal__order"}>
          <div className="close" onClick={() => setVisibleModal(false)}>
          <i className="bi bi-x-lg"></i>
          </div>
          
          <h5>Заказать звонок</h5>
          <form>
            <div className="name">
              <label htmlFor="name">Имя:</label>
              <input
                id="name"
                type="text"
                placeholder="Представьтесь, пожалуйста"
              />
            </div>
            <div className="telephone">
              <label htmlFor="tel">Телефон:</label>
              <div className="input__telephone">
                <span className="input__telephone flag">
                  <img
                    src="https://voentorg.ua/image/cache/catalog/products/0d085d3f-99fe-11e6-8139-74d4358b53e8-700x700.png"
                    alt="flag"
                    style={{ height: "16px", marginRight: "5px" }}
                  />
                  +380
                </span>
                <input
                  id="tel"
                  type="tel"
                  placeholder=" (код оператора) 1234567"
                  autoComplete="off"
                />
              </div>
            </div>
            <button type="submit">ОТПРАВИТЬ ЗАПРОС</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
