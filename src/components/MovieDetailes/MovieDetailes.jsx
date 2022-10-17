import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetailes() {
    let baseImageUrl = 'https://image.tmdb.org/t/p/original/'

    const [movie, setmovie] = useState({})
    let params = useParams();
    async function getMovieDetailes() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=dbd2415d319b398087f89de1b0274754&language=en-US`)
        setmovie(data)
        console.log(data);
    }

    getMovieDetailes();

    return (
        <div>
            <div className="row ">
                <div className="col-md-6 mt-5 ">
                    <img src={baseImageUrl + movie.backdrop_path} className="w-100 mh-100" />
                </div>
                <div className="col-md-6 mt-5">
                    <h3 className='fw-bolder '>{movie.original_title}</h3>
                    <ul className='fs-5'>
                        <li className='mt-4'>Popularity : {movie.popularity}</li>
                        <li className='my-3'>Vote Average : {movie.vote_average}</li>
                        <li>Vote Count : {movie.vote_count}</li>
                    </ul>
                    <h3 className='mt-5 fw-bold'>Over View</h3>
                    <p >{movie.overview}</p>
                </div>
            </div>

        </div>
    )
}
