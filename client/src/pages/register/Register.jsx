import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { register } from "../../redux/actions/userActions";
import "./register.scss";

const Register = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [redirect, history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Пароли не совпадают!')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>
      
      <div className="register">
        <div className="container">
          <h2>Регистрация</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message danger>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Имя</label>
            <input 
              id="name" 
              type="text" 
              placeholder="Введите имя" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              id="confirmPassword" 
              type="password" 
              placeholder="Введите пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Повторите пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Зарегистрироваться</button>
          </form>
          <span>Есть аккаунт? {' '} 
            <Link to={redirect ? `login?redirect=${redirect}` : '/login'}>
              <span className="green" style={{color:'lightgreen'}}>войти</span> 
            </Link>
          </span> 
        </div>
      </div>
      
    </>
  );
};

export default Register;
