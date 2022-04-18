import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../../components/pizza/Pizza";
import Category from "../../components/category/Category";
import Slider from "../../components/slider/Slider";
import { listNewProducts } from "../../redux/actions/productActions";
import "./homepage.scss";

const Homepage = () => {
  const productNew = useSelector((state) => state.productNew);
  const { products } = productNew;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNewProducts());
  }, [dispatch]);

  return (
    <div className="homepage">
      <Category />
      <Slider />
      <div className="container">
        <p>ТОП ПРОДУКТОВ</p>
        <div className="content">
          {products?.map((item) => (
            <Pizza item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
