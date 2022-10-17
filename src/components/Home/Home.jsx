
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { mediaContext } from '../../MediaContext';
import styles from './Home.module.css'



export default function Home() {

  const { trendingMovies  , trendingTv ,trendingPerson} = useContext(mediaContext)
  let baseImageUrl = 'https://image.tmdb.org/t/p/original/'


  return (
    <>
      {
        trendingMovies ?
          <div className='row'>
            <div className="col-md-4 d-flex align-items-center ">
              <div className='w-100'>
                <div className={`${styles.brdr} w-25 mb-3`}></div>
                <h2>Trending</h2>
                <h2>Movies</h2>
                <h2>To Watch Now</h2>
                <br />
                <p className='secondColor'>Most Watched Movies By Day</p>
                <div className={`${styles.brdr} w-100`}></div>
              </div>
            </div>
            {trendingMovies.map((movie, index) =>
              <div className='col-md-2 mb-3' key={index} >
                <div>
                  <Link to={`/moviedetailes/${movie.id}`}>
                    <img src={baseImageUrl + movie.poster_path} alt="" className='w-100 my-3' />
                    <h5>{movie.title}</h5>
                  </Link>

                </div>

              </div>)}
          </div>:''
    }


      {
        trendingTv?
        <div className='row'>
        <div className="col-md-4 d-flex align-items-center ">
          <div className='w-100'>
            <div className={`${styles.brdr} w-25 mb-3`}></div>
            <h2>Trending</h2>
            <h2>TV Shows</h2>
            <h2>To Watch Now</h2>
            <br />
            <p className='secondColor'>Most Watched Movies By Day</p>
            <div className={`${styles.brdr} w-100`}></div>
          </div>
        </div>
        {trendingTv.map((tv, index) =>
          <div className='col-md-2 mb-3' key={index} >
            <div>
              <img src={baseImageUrl + tv.poster_path} alt="" className='w-100 my-3' />
              <h5>{tv.name}</h5>
            </div>

          </div>)}
      </div>:''
      }

      {
        trendingPerson?
        <div className='row'>
        <div className="col-md-4 d-flex align-items-center ">
          <div className='w-100'>
            <div className={`${styles.brdr} w-25 mb-3`}></div>
            <h2>Trending</h2>
            <h2>Persons</h2>
            <h2>To Watch Now</h2>
            <br />
            <p className='secondColor '>Most Watched Person By Day</p>
            <div className={`${styles.brdr} w-100 `}></div>
          </div>
        </div>
        {trendingPerson.map((person, index) =>
          <div className='col-md-2 mb-3' key={index} >
            <div>
              <img src={baseImageUrl + person.profile_path} alt="" className='w-100 my-3' />
              <h5>{person.name}</h5>
            </div>

          </div>)}
      </div>:""
      }
    </>


  )
}
