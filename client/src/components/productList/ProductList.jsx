import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../pizza/Pizza";
import Water from "../water/Water";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import { listProducts } from "../../redux/actions/productActions";
import "./productlist.scss";

const ProductList = ({ cat }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts(cat));
  }, [dispatch, cat]);

  return (
    <div className="productList">
      <div className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {cat === "pizza"
              ? products?.map((item) => <Pizza key={item._id} item={item} />)
              : products?.map((item) => <Water key={item._id} item={item} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
