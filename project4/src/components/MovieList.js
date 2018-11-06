import React, { Component } from 'react';
import Movie from './Movie';
//styles
import '../MovieList.css';

class MovieList extends Component {


  //-----RENDER----------
  render() {
    return (
      <div id="movieList">
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </div>
    );
  }
}

export default MovieList;
