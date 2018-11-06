import React, { Component } from 'react';
//styles
import '../Movie.css';

class Movie extends Component {
  constructor(props){
    super(props);
  }
  //-----RENDER----------
  render() {
    return (
      <div className="movieContainer">
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
    );
  }
}

export default Movie;
