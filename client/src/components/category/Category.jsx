import React from "react";
import CategoryItem from "../categoryItem/CategoryItem";
import { category } from "../../data";
import "./category.scss";

const Category = () => {
  return (
    <div className="category">
      <div className="container">
        <ul className="category__list">
          {category.map((item) => (
            <CategoryItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
