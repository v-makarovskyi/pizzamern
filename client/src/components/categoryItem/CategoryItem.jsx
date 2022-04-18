import React from "react";
import { Link } from "react-router-dom";
import "./categoryitem.scss";

const CategoryItem = ({ item }) => {
  return (
    <li className={item.className}>
      <Link to={`/products/${item.cat}`}>
        <img src={item.img} alt={item.title} />
      </Link>

      <span>{item.title}</span>
    </li>
  );
};

export default CategoryItem;
