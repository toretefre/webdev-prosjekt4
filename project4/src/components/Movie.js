import React, { Component } from 'react';
//styles
import '../Movie.css';

class Movie extends Component {
  //-----RENDER----------
  render() {
    return (
      <a className="movieLink" href={"#"+this.props.movieID}>
        <div className="movieContainer" onClick={this.props.showInfo} id={this.props.movieID}>
          <center className="movieTitle">
            {this.props.title}
          </center>
          <div className="imageAndInfo">
            <img className="movieImage" src={this.props.imgsrc}/>
            <div className="movieInfo">
              <div className="bigMovieTitle">
                {this.props.title}
              </div>
              <div className="movieDescription">
                {this.props.description}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default Movie;
