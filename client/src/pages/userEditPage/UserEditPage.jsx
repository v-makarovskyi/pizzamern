import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import "./usereditpage.scss";
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants";
import { getUserDetails, updateUser } from "../../redux/actions/userActions";

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      history.push("/admin/userlist");
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, dispatch, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <div className="usereditpage">
        <Link to={"/admin/userlist"}>
          <button className="goBack">Назад</button>
        </Link>
        <div className="container">
          <p className="title">Обновить данные пользователя</p>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <form>
              <div className="formGroup">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formGroup__isAdmin">
                <input 
                  type="checkbox" 
                  id="isadmin" 
                  checked={isAdmin} 
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="isadmin">Администратор</label>
              </div>
              <button className="btn-form" type="submit" onClick={submitHandler}>
                Обновить
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditPage;
