import React from "react";
import ProductList from "../../components/productList/ProductList";
import Category from "../../components/category/Category";
import "./productlistpage.scss";

const ProductListPage = ({location}) => {

  const cat = location.pathname.split('/')[2]
  

  return (
    <>
      <Category />
      <div className="productlistpage">
        <div className="container">
          <ProductList cat={cat}/>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
