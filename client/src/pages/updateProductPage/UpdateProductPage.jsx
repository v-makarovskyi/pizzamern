import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/actions/productActions";

import "./updateproductpage.scss";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";

const checkboxSize = [25, 32, 42];
const checkboxWeight = [550, 750, 1050];

const UpdateProductPage = ({ history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState([]);
  const [image, setImage] = useState("");
  const [size, setSize] = useState([]);
  const [weight, setWeight] = useState([]);
  const [scope, setScope] = useState([]);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setWeight(product.weight);
        setSize(product.size);
        setScope(product.scope);
        setCategory(product.category);
        setDesc(product.desc);
      }
    }
  }, [dispatch, history, successUpdate, product, productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSize = (e) => {
    const checkboxs = document.querySelectorAll("#size");
    checkboxs.forEach((checkbox) => {
      checkbox.onchange = () => {
        const checked = document.querySelectorAll("#size:checked");
        setSize(
          size.map.call(checked, function (item) {
            return item.value;
          })
        );
      };
    });
  };

  const handleWeight = (e) => {
    const checkboxs = document.querySelectorAll("#weight");
    checkboxs.forEach((checkbox) => {
      checkbox.onchange = () => {
        const checked = document.querySelectorAll("#weight:checked");
        setWeight(
          weight.map.call(checked, function (item) {
            return item.value;
          })
        );
      };
    });
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  const handleScope = (e) => {
    const value = e.target.value;
    setScope(value);
  };

  const handlePrice = () => {
    setPrice([...document.querySelectorAll("#price")].map((i) => i.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        desc,
        scope,
        size,
        weight,
        category,
      })
    );
  };

  return (
    <>
      <div className="productupdatepage">
        <Link to="/admin/productlist">
          <button className="goback">Назад</button>
        </Link>
        <div className="container">
          <p className="title">Обновить продукт</p>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="formGroup">
                <label for="name">Название</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Введите название продукта"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="price">Стоимость №1</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Введите стоимость продукта"
                  onChange={handlePrice}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="price">Стоимость №2</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Введите стоимость продукта"
                  onChange={handlePrice}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="price">Стоимость №3</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Введите стоимость продукта"
                  onChange={handlePrice}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="image">Изображение</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Введите URL изображения"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="image-file">Выберите файл для загрузки</label>
                <input
                  id="image-file"
                  type="file"
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>
              <div className="formGroup">
                <label for="desc">Описание</label>
                <input
                  id="desc"
                  type="text"
                  placeholder="Введите описание продукта"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <p>Paзмер:</p>
                <div className="sizeContainer">
                  {checkboxSize.map((item, index) => (
                    <div key={index} className="sizeContainer exactsize">
                      <label htmlFor="size">{item} см</label>
                      <input
                        id="size"
                        type="checkbox"
                        value={item}
                        onChange={handleSize}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="formGroup">
                <p> Вес:</p>
                <div className="sizeContainer">
                  {checkboxWeight.map((item, index) => (
                    <div key={index} className="sizeContainer exactsize">
                      <label htmlFor="weight">{item} г</label>
                      <input
                        type="checkbox"
                        id="weight"
                        name="weight"
                        value={item}
                        onChange={handleWeight}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="desc">Объем</label>
                <select name="scope" id="desc" onChange={handleScope}>
                  <option>Введите объем напитка</option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="formGroup">
                <label htmlFor="desc">Категория</label>
                <select
                  name="category"
                  id="desc"
                  autoFocus
                  onChange={handleCategory}
                >
                  <option>Введите категорию продукта</option>
                  <option value="pizza">pizza</option>
                  <option value="water">water</option>
                </select>
              </div>
              <button type="submit">Обновить продукт</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProductPage;
