import { createContext } from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'


export let mediaContext = createContext([]);


export function MediaContextProvider(pros) {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPerson, setTrendingPerson] = useState([]);

    async function getTrendingItems(mediaType, cb) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=dbd2415d319b398087f89de1b0274754`);

        cb(data.results)
    }



    useEffect(() => {
        getTrendingItems('movie', setTrendingMovies);
        getTrendingItems('tv', setTrendingTv);
        getTrendingItems('person', setTrendingPerson);
    }, [])





    return <mediaContext.Provider value={{ trendingMovies, trendingPerson, trendingTv }}>
        {pros.children}
    </mediaContext.Provider>
}
