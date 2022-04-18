import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  createProduct
} from "../../redux/actions/productActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import "./productcreatepage.scss";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";

const checkboxSize = [25, 32, 42];
const checkboxWeight = [550, 750, 1050];

const ProductCreatePage = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState([]);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState([]);
  const [weight, setWeight] = useState([]);
  const [scope, setScope] = useState([]);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        history.push(`/admin/product/${createdProduct._id}/edit`);
      }
    }
  }, [dispatch, userInfo, successCreate, createdProduct, history]);

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  const handleScope = (e) => {
    const value = e.target.value;
    setScope(value);
  };

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

  const handleSize = () => {
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

  const handleWeight = () => {
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

  const handlePrice = () => {
    setPrice([...document.querySelectorAll("#price")].map((i) => i.value));
  };

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        desc,
        image,
        size,
        weight,
        category,
        scope,
      })
    );
  };
  

  return (
    <>
      <div className="productcreatepage">
        <Link to="/admin/productlist">
          <button className="goback">Назад</button>
        </Link>
        <div className="container">
          <p className="title">Создать продукт</p>
          {loadingCreate ? (
            <Loader />
          ) : errorCreate ? (
            <Message variant="danger">{errorCreate}</Message>
          ) : (
            <form onSubmit={submitCreateHandler}>
              <div className="formGroup">
                <label htmlFor="name">Название</label>
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
              <button type="submit">Создать продукт</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCreatePage;
