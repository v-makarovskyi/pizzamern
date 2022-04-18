import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="about">
          <h3>PizzaMERN</h3>
          <div className="address">
            <i className="bi bi-geo-alt-fill"></i>
            <span> ул. Хорива, 25/12, г. Киев</span>
          </div>
          <div className="openingHours">
           
            <span> Мы открыты для вас каждый день с 10:00 до 21:00.</span>
          </div>
          <div className="socialIcons">
           
          </div>
        </div>
        <div className="info">
          <h3>Информация</h3>
          <ul>
            <li>о PizzaMERN</li>
            <li>Видео и пресса</li>
            <li>Доставка и оплата</li>
            <li>Отзывы</li>
            <li>Контакты</li>
            <li>Договор оферты</li>
          </ul>
        </div>
        <div className="payment">
          <h3>Мы принимаем</h3>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/800px-Visa.svg.png" alt="visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="master" />
        </div>
        <div className="contact">
            <h3>Контакты</h3>
            <span>+38 (050) 444 55 66</span>
            <span>+38 (067) 444 55 66</span>
            <span>+38 (093) 444 55 66</span>
            <button className="btn__contact" >Заказать звонок</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
