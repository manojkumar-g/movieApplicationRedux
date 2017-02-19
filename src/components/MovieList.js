import React,{ PropTypes } from 'react';
import {connect} from 'react-redux';
import MovieTile from './movieTile';
import {setMovieNames} from '../actions';
import filterArray from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import slice from 'lodash/slice';
class MovieList extends React.Component{
  constructor(props) {
    super(props);
    this.state ={visibleData : [],page:1,pageData:[]};
    this.filter = this.filter.bind(this);
    this.pageButton = this.pageButton.bind(this)
  }
  //this will check the next Props and decides whether filters  changed or not
  componentWillReceiveProps(nextProps){
    var arr = nextProps.movieData.movieData;
    // converting Object of elements to Array
    //var arr = Object.keys(data).map(function (key) { return data[key]; });
    //checking the filter Changed or not
    if(this.props.filter != nextProps.filter){
      this.filter(arr,nextProps.filter);
    }
    else if(this.props.genre != nextProps.genre){
      this.filterGenre(arr,nextProps.genre);
    }
  }
  //function to handle filtering
  filter(arr,filter){
    //extracting names for auto compleate filed
    var names = arr.map(
      movie =>
        {
          switch (filter) {
            case 'movie_title':
              return movie.movie_title;
              break;
            case 'director_name':
              return movie.director_name;
              break;
            case 'actor_1_name':
              return movie.actor_1_name;
              break;
            case 'actor_2_name':
              return movie.actor_2_name;
              break;
            case 'title_year':
              return movie.title_year;
              break;
            default:
          }
        }
    );
    this.props.setMovieNames(names);
  }
  //this function used to filter based on genres
  filterGenre(arr,genre){
    //checking if genre is all so we can return function as it is
    if(genre == 'All'){
      // setting state to show results based on filters
      this.setState({visibleData:arr,
        pageData :arr.slice(0,10)
      });
      //setting moviename for auto compleate
      this.props.setMovieNames(
        (arr.map(
          (movie) => {
            switch (this.props.filter) {
              case 'movie_title':
                return movie.movie_title;
                break;
              case 'director_name':
                return movie.director_name;
                break;
              case 'actor_1_name':
                return movie.actor_1_name;
                break;
              case 'actor_2_name':
                return movie.actor_2_name;
                break;
              case 'title_year':
                return movie.title_year;
                break;
              default:
            }
          }
        ))
      )
    }
    else{
      //filtering all movies based on genre
      let fu = filterArray(arr,
            (movie) =>{
                if(movie){
                  let g = movie.genres;
                  if(g){
                    g = g.split('|');
                    return indexOf(g,genre) != -1;
                  }
                   return false;
                }
                else
                  return false;
            }
      );
      this.setState({visibleData : fu,
          pageData :fu.slice(0,10)
        })
      this.props.setMovieNames(
        (fu.map(
          (movie) => {
            switch (this.props.filter) {
              case 'movie_title':
                return movie.movie_title;
                break;
              case 'director_name':
                return movie.director_name;
                break;
              case 'actor_1_name':
                return movie.actor_1_name;
                break;
              case 'actor_2_name':
                return movie.actor_2_name;
                break;
              case 'title_year':
                return movie.title_year;
                break;
              default:
            }
          }
        ))
      )
    }

  }
  //funtional component to render pagination
  pageButton(){
    let pageCount = Math.floor(this.state.visibleData.length / 10);
    let pages = [];
    const Onclick = (p) => {
      var content = slice(this.state.visibleData,p*10,(p*10)+10);
      this.setState({page:p,pageData:content});
    }
    for(let i=1 ; i <= pageCount ; i++){
      if(i == this.state.page){
        pages.push(<li className="active" key = {i} onClick ={()=>{Onclick(i)}}><a href="#">{i}</a></li>);
      }
      else{
        pages.push(<li key = {i}><a href="#" onClick ={()=>{Onclick(i)}} >{i}</a></li>);
      }
    }
    return(
      <ul className="pagination">
        {pages}
      </ul>
    )
  }

  render(){
    var arr = this.state.pageData;
    //var arr = Object.keys(data).map(function (key) { return data[key]; });
    return (
      <div>
        <this.pageButton/>
        <div className = 'row'>
            {
              arr.map(
                (movie,ind) => {
                  return (<MovieTile key = {ind} movieData = {movie}/>)
                }
              )
            }
        </div>
    </div>
    );
  }
}
//connecting to redux
export default connect(
  (state) =>({
    ...state
  }),
  {setMovieNames}
)(MovieList)
