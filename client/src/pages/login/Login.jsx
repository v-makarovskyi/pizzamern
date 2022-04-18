import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { login } from "../../redux/actions/userActions";
import "./login.scss";

const Login = ({location, history}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo, loading } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [redirect, userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>

      <Modal />
      <div className="login">
        <div className="container">
          <h2>Войти</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Электронная почта</label>
            <input 
              id="email" 
              type="text" 
              placeholder="Введите email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Пароль</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Введите пароль" 
              value={password}  
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Войти</button>
          </form>
          <span>Нет аккаунта? 
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              <span className="green" style={{color:'lightgreen'}}> Зарегистрироваться</span>
            </Link>
          </span>
        </div>
      </div>
     
    </>
  );
};

export default Login;
