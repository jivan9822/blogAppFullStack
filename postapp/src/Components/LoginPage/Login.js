import React, { useState } from 'react';
import loginCss from './Login.module.css';
import axios from 'axios';
import { validate } from '../Utils/SignUpValidation';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetail((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    if (validate(name, value)) {
      document.getElementById(name).style.color = 'green';
      if (
        document.getElementById('username').style.color === 'green' &&
        document.getElementById('password').style.color === 'green'
      ) {
        setIsDisabled(false);
        document.getElementById('btn').style.cursor = 'pointer';
        document.getElementById('btn').style.opacity = '1';
      }
    } else {
      document.getElementById(name).style.color = 'red';
      setIsDisabled(true);
      setError(null);
      document.getElementById('btn').style.cursor = 'not-allowed';
      document.getElementById('btn').style.opacity = '0.2';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post('/login', userDetail)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 100);
        props.getUserData(res.data.data.user ? res.data.data.user : null);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
    setUserDetail({
      username: '',
      password: '',
    });
  };

  return (
    <form className={loginCss.form} onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <h2 style={{ color: 'green' }}>Login Success</h2>}
      <h1>Login</h1>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={userDetail.username}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={userDetail.password}
          onChange={onChangeHandler}
        />
      </div>
      <button
        disabled={isDisabled}
        id='btn'
        // className={loginCss.signBtn}
        type='submit'
      >
        Login
      </button>
    </form>
  );
};

export default LoginPage;
