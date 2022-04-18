import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { listProducts, deleteProduct } from "../../redux/actions/productActions";

import "./productlistadminpage.scss";

const ProductListAdminPage = ({ history, match }) => {
  const category = match.params.category || ''
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listProducts(category));
    }
  }, [history, dispatch, userInfo, category, successDelete]);

  const deleteHandler = (id) => {
    if(window.confirm('Вы уверены? Данное действие нельзя отменить')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <div className="productlistadminpage">
        <div className="container">
          <Link to="/admin/product/create">
            <button className="addProduct">Добавить товар</button>
          </Link>
          <div className="tableWrapper">
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            <p className="title">Товары</p>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Вес, гр</th>
                    <th>Размер</th>
                    <th>Объем</th>
                    <th>Категория</th>
                    <th>Цена, грн</th>
                    <th></th>
                  </tr>
                </thead>
               <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.weight.join('/ ')} </td>
                      <td>{product.size.join('/ ')} </td>
                      <td>{product.scope}</td>
                      <td>{product.category}</td>
                      <td>{product.price.join('/ ')}</td>
                      <td>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <button className="editProduct">
                            <i class="bi bi-pen-fill" style={{fontSize:'20px', color:'green', fontWeight:'900'}}></i>
                          </button>
                        </Link>
                        <button onClick={() => deleteHandler(product._id)} className="deleteProduct">
                          <i class="bi bi-x-lg" style={{fontSize:'20px', color:'red', fontWeight:'900'}}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody> 
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListAdminPage;
