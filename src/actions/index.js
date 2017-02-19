import fetch from 'isomorphic-fetch';
import {localMoviePromise,setMovieDataPromise} from '../localStorage';

    //this action function is a thunkMiddleware used to check the localstorage and load the data
    export const checkLocalStorage = () =>
      dispatch =>{
        try {
          //dispatching another action
          dispatch(loadingLocalMovieData());
          //checking the localstorage
          return localMoviePromise().then(
              (data) =>{
                console.log('datafound');
                dispatch(setMovieData(JSON.parse(data)));
              }
              ).catch(
                () =>{
                  console.log('no data found');
                  dispatch(getMovieData());
                }
              )
          } catch (e) {

          }
      }
    //this action funtion is used to get movie data from api throw thunk middle ware
    export const getMovieData = () =>
      dispatch => {
        dispatch(loadingMovieData());
        return fetch('http://starlord.hackerearth.com/simility/movieslisting')
              .then(response => response.json())
              .then(data =>{
                  console.log('got data from api');
                  setMovieDataPromise(data)
                  .then(
                    () => {
                      console.log('setting data');
                      console.log(data);
                      dispatch(setMovieData(data))
                      console.log('setted data');
                    }
                  )
                }
                )
              .catch(
                err =>
                  console.log(`Error occured ${err}`)
              );
      }
    //there are the rest of the actions we will use
    export const setMovieData = (movieData) => ({
      type : 'SET_MOVIE_DATA',
      movieData
    });
    export const setMovieNames = (movieNames) => ({
      type : 'SET_MOVIE_NAMES',
      movieNames
    });
    export const loadingMovieData = () => ({
    type:'LOADING_MOVIE_DATA'
  });
    export const loadingLocalMovieData = () => ({
      type : 'LOADING_LOCAL_MOVIE_DATA'
    });
    export const setFilter = (filter) =>({
      type:'SET_FILTER',
      filter
    });
    export const setGenre = (genre) =>({
      type:'SET_GENRES',
      genre
    });
