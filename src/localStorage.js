
//this is the function which will return movie data which is prasent in local storage

// this fuction returns a promise which will check and returns data in localStore
export const localMoviePromise = () =>
    new Promise(function(resolve, reject) {
      var localData = localStorage.getItem('movieData');
      if(localData ===null){
        reject('no data found');
      }
      else {
        resolve(localData)
      }
    });
// this function returns a promise which will store data in localstore
export const setMovieDataPromise = (data) =>
    new Promise(function(resolve, reject) {
      try{
          localStorage.setItem('movieData',JSON.stringify(data));
      }catch(err){
        reject('no Data')
      }
      resolve();
    });
