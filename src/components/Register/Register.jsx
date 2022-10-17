import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [error, setError] = useState('')
  const [errList, seterrList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0
  })

  function registerValidation(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(15).required(),
      last_name: Joi.string().alphanum().min(3).max(15).required(),
      age: Joi.number().min(16).max(45).required(),
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
    let validationRes = registerValidation(user);
    if (validationRes.error) {
      setIsLoading(false)
      seterrList(validationRes.error.details)

    } else {
      let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user)
      if (data.message === 'success') {
        setIsLoading(false)
        navigate('/Login')
      } else {
        setError(data.message)
        setIsLoading(false)

      }
    }

  }

  return (
    <div>
      <form onSubmit={submitReg}>
        <h2 className='my-3'>Register Now</h2>
        {errList.map((error, index) => {
          if (index == 4) {
            return <div key={index} className='alert alert-danger'>Password Format Invalid</div>

          }
          else {
            return <div key={index} className='alert alert-danger'>{error.message}</div>
          }
        })}

        {error ? <div className='alert alert-danger'>{error}</div> : ''}

        <label htmlFor="first_name">First_Name:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='first_name' id='first_name' />
        <label htmlFor="last_name">Last_Name:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='last_name' id='last_name' />
        <label onChange={getUser} htmlFor="age">Age:</label>
        <input onChange={getUser} type="number" className='form-control my-3' name='age' id='age' />
        <label htmlFor="email">Email:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='email' id='email' />
        <label htmlFor="password">Password:</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='password' id='password' />
        <button className='btn btn-outline-info fw-bold'>
          {isLoading ? <i className='fa fa-refresh fa-spin'></i> : 'Register'}
        </button>

      </form>
    </div>
  )
}
