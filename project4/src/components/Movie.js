import React, { Component } from 'react';
//styles
import '../Movie.css';

class Movie extends Component {
  //-----RENDER----------
  render() {
    return (
        <div className="movieContainer" id={this.props.movieID}>
          <div className="movieTitle">
            <div className="titleText">{this.props.title}</div>
            <a className="movieLink" href={"#"+this.props.movieID}>
              <img onClick={this.props.showInfo} className="expandImage" src={require("../assets/images/expand-arrow.png")}/>
            </a>
          </div>
          <div className="imageAndInfo">
            <img className="movieImage" src={this.props.imgsrc}/>
            <div className="movieInfo">
              <div className="bigMovieTitle">
                {this.props.title}
              </div>
              <div className="movieDescription">
                {this.props.description}
              </div>
              <div className="movieGenre">
                Genre: {this.props.genre}
              </div>
              <div className="movieActors">
                Actors: {this.props.actors}
              </div>
            </div>
          </div>
          <div className="rating">Rating: {this.props.imdb}/10</div>
        </div>
    );
  }
}

export default Movie;
