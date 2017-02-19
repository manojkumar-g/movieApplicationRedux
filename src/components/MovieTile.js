import React from 'react';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
//this is functional component for rendenring single tile
const movieTile = ({movieData}) =>(
  <div className = 'col-sm-2 content'>
    <div className = 'title'>
        <h5>{movieData.movie_title}</h5>
    </div>

    <img className = 'poster' src ='https://a.disquscdn.com/get?url=http%3A%2F%2Ffreedesignfile.com%2Fupload%2F2014%2F07%2FMovie-time-design-elements-vector-backgrounds-04.jpg&key=JbjQ9AXRb3A859danz1FIg'/>
    <div className ='information'>
      <div>
        <h6>Language : {movieData.language}</h6>
        <h6>Director : {movieData.director_name}</h6>
        <h6>Year : {movieData.title_year}</h6>

          <RaisedButton
            href={movieData.movie_imdb_link}
            target="_blank"
            label="More Details"
            secondary={true}
            style={{  margin: 15,}}
      />
  </div>
    </div>
  </div>
);

export default movieTile;
