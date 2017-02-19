import React from 'react';
import {connect} from 'react-redux';
import {checkLocalStorage,setFilter} from '../actions';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList'

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.checkLocalStorage();
  }
  render(){
    return(
      <div>
        <Header/>
        <div className="well well-lg">
          <SearchForm/>
          <MovieList/>
        </div>
        <div>

        </div>
      </div>
    )
  }
}
//connecing app to redux store
App =connect (
              (state) =>({
                ...state
              }),
              {checkLocalStorage,setFilter}
            )(App);

export default App;
