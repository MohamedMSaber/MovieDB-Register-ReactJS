import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [error, setError] = useState('')
  const [errList, seterrList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  function LoginValidation(user) {
    let schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/)
    });
    return schema.validate(user, { abortEarly: false });
  }

  function getUser(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);

  }



  async function submitReg(e) {
    e.preventDefault();
    setIsLoading(true)
    let validationRes = LoginValidation(user);
    if (validationRes.error) {
      setIsLoading(false)
      seterrList(validationRes.error.details)

    } else {
      let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, user)
      if (data.message === 'success') {
        setIsLoading(false)
        localStorage.setItem('userToken', data.token)
        props.getUserData();
        navigate('/Home')
      } else {
        setError(data.message)
        setIsLoading(false)

      }
    }

  }

  return (
    <div>
      <form onSubmit={submitReg}>
        <h2 className='my-3'>Login Now</h2>
        {errList.map((error, index) => {
          if (index == 4) {
            return <div key={index} className='alert alert-danger'>Password Format Invalid</div>

          }
          else {
            return <div key={index} className='alert alert-danger'>{error.message}</div>
          }
        })}

        {error ? <div className='alert alert-danger'>{error}</div> : ''}


        <label htmlFor="email">Email:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='email' id='email' />
        <label htmlFor="password">Password:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='password' id='password' />
        <button className='btn btn-outline-info fw-bold'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
        </button>

      </form>
    </div>
  )
}
