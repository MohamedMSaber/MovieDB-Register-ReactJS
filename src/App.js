import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import About from './components/About/About'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Movies from './components/Movies/Movies'
import Navbar from './components/Navbar/Navbar'
import Network from './components/Network/Network'
import Register from './components/Register/Register'
import jwtDecode from 'jwt-decode'
import MovieDetailes from './components/MovieDetailes/MovieDetailes'
import { MediaContextProvider } from './MediaContext'

export default function App() {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData();
    }


  }, [])

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to={'/login'} />
    }
    else {
      return children;
    }
  }


  let navigate = useNavigate();
  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setuserData(decodedToken);
    console.log(userData);
  }

  function logout() {
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/Login');

  }

  return (
    <div >
      <Navbar userData={userData} logout={logout} />
      <div className='container'>
        <MediaContextProvider>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} ></Route>
          <Route path='movies' element={<Movies />} ></Route>
          <Route path='about' element={<About />} ></Route>
          <Route path='moviedetailes' element={<MovieDetailes />} >
            <Route path=':movieId' element={<MovieDetailes />} ></Route>
          </Route>
          <Route path='network' element={<Network />} ></Route>
          <Route path='login' element={<Login getUserData={getUserData} />} ></Route>
          <Route path='register' element={<Register />} ></Route>
          <Route path='*' element={<h2>404 Not Found</h2>} ></Route>

        </Routes>
        </MediaContextProvider>
      </div>

    </div>
  )
}

