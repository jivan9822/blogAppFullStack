import React, { useState } from 'react';
import signCss from './SignUp.module.css';
import axios from 'axios';
import { validate } from '../Utils/SignUpValidation';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username: '',
    email: '',
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
        document.getElementById('email').style.color === 'green' &&
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
    console.log(userDetail);
    event.preventDefault();
    await axios
      .post('/signup', userDetail)
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409 || err.response.status === 400) {
          setError(
            err.response.data.message
              ? err.response.data.message
              : 'Something went wrong!'
          );
        }
      });
  };

  return (
    <form className={signCss.form} onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <h2 style={{ color: 'green' }}>Registration Success</h2>}
      <h1>Sign Up</h1>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='more than three char'
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='test@gmail.com'
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='5 to 15 char long'
          onChange={onChangeHandler}
        />
      </div>
      <button
        disabled={isDisabled}
        id='btn'
        className={signCss.signBtn}
        type='submit'
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupPage;
