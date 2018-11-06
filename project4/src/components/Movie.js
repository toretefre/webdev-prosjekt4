import React, { Component } from 'react';
//styles
import '../Movie.css';

class Movie extends Component {

  //-----RENDER----------
  render() {
    return (
      <div className="movieContainer">
        <center className="movieTitle">
          Tittel
        </center>
        <img className="movieImage" src={require('../assets/images/movie.jpg')}/>
      </div>
    );
  }
}

export default Movie;
