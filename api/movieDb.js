/* eslint-disable prettier/prettier */

import axios from "axios";
import { apiKey } from './apikey.js';

const baseURL = 'https://api.themoviedb.org/3';

const trendingMoviesEndPoint = `${baseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseURL}/search/movie?api_key=${apiKey}`;

//dynamic endpoints
export const movieDetailEndPoint = movie_id => `${baseURL}/movie/${movie_id}?api_key=${apiKey}`;
export const movieCastEndPoint = movie_id => `${baseURL}/movie/${movie_id}/credits?api_key=${apiKey}`;
export const similarMovieEndPoint = movie_id => `${baseURL}/movie/${movie_id}/similar?api_key=${apiKey}`;
export const castInfoEndPoint = person_id => `${baseURL}/person/${person_id}?api_key=${apiKey}`;
export const castMovies = person_id => `${baseURL}/person/${person_id}/movie_credits?api_key=${apiKey}`;


export const fallbackMoviePoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s'

export const image500 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
};
export const image300 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : null;
};
export const image200 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w200${path}` : null;
};

const apiCall = async (endpoint, params) => {
    const config = {
        method: 'GET',
        params: params ? params : {},
    };

    try {
        const response = await axios.get(endpoint, config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
};
export const fetchMovieDetail = (id) => {
    return apiCall(movieDetailEndPoint(id));
};
export const fetchCastDetail = (id) => {
    return apiCall(movieCastEndPoint(id));
};
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMovieEndPoint(id));
};
export const fetchCastInfo = (id) => {
    return apiCall(castInfoEndPoint(id));
};
export const fetchCastMovies = (id) => {
    return apiCall(castMovies(id));
};
export const fetchSearchResult = (params) => {
    return apiCall(searchMoviesEndpoint, params);
};
