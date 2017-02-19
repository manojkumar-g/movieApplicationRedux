import {combineReducers} from 'redux';


//reducer funtion to load the Movie data based on the action
const movieData = (
                      state = {
                        isLoadingFromApi : false,
                        isLoadingFromLocal: false,
                        movieData :[],
                        movieNames:[]
                      },
                      action
                    ) => {
                      switch (action.type) {
                        case 'SET_MOVIE_DATA':
                          return {...state,
                                  movieData : action.movieData,
                                  isLoadingFromApi : false,
                                  isLoadingFromLocal : false
                                  };
                          break;

                        case 'LOADING_MOVIE_DATA':
                            return {
                              ...state,
                              isLoadingFromApi : true
                            };
                          break;
                        case 'LOADING_LOCAL_MOVIE_DATA':
                            return {
                              ...state,
                              isLoadingFromLocal : true
                            };
                          break;
                        default:
                          return state
                      }
}
//reducer function for filtering data
const filter = (state = 'movie_title',action) =>{
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
      break;
    default:
      return state;
  }
}
//reducer function from filtering based of genre
const genre = (state = 'all',action) =>{
  switch (action.type) {
    case 'SET_GENRES':
      return action.genre;
      break;
    default:
      return state;
  }
}
//reducer function to get all the movie names which we will use in AutoComplete
const movieNames = (state = [],action) =>{
  switch (action.type) {
    case 'SET_MOVIE_NAMES':
      return action.movieNames
      break;
    default:
      return state;

  }
}

//combining all the reducers and exporting them
export default combineReducers({movieData,filter,genre,movieNames});
