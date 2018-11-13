import React, { Component } from 'react';
import '../Movie.css';
import {inject, observer} from "mobx-react";
import ReplacementImage from "../assets/images/noimage.png";

@inject('movieStore')
@observer
class Movie extends Component {


    //Function to change the observable variable "expandMovie".
    //Changes between grid and listview
    handleExpandMovie(){
        this.props.changeView();
    }

  //-----RENDER----------
  render() {
    return (
        <div className={this.props.movieStore.expandMovie ? "movieContainerBig" : "movieContainerSmall"} >
            <div onClick={() => this.handleExpandMovie()} className={this.props.movieStore.expandMovie ? "innerMovieContainerBig" : "innerMovieContainerSmall"} id={this.props.id}>
                <a className="movieLink" href={"#"+this.props.id}>
                    <img alt="Img not found.." onError={(e) => {
                        e.target.src = ReplacementImage; //replacement image imported above
                    }} className={this.props.movieStore.expandMovie ? "movieImageBig" : "movieImageSmall"} src={this.props.poster}/>
                </a>
                <div className={this.props.movieStore.expandMovie ? "movieInfoShow" : "movieInfoHide"}>
                  <div className="bigMovieTitle">
                    {this.props.title}
                  </div>
                  <div className="movieDescription">
                    {this.props.plot}
                  </div>
                  <div className="movieGenre">
                    Genre: {this.props.genres}
                  </div>
                    {/*<div className="movieActors">
                    Actors: {this.props.actors}
                  </div>*/}
                  <div onClick={() => this.handleExpandMovie()} className="movieRatings">
                      <a href={"https://www.imdb.com/title/" + this.props.imdbId} target="_blank" rel="noopener noreferrer">
                          <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                      </a>
                      {" - " + this.props.imdbRating}
                  </div>
                </div>
                <a className="movieLink" href={"#"+this.props.id}>
                    <div className={this.props.movieStore.expandMovie ? "titleTextSmallHide" : "titleTextSmallShow"}>{this.props.title}</div>
                </a>
                <div className="rating">{this.props.imdb}</div>
            </div>
        </div>
    )
  }
}

export default Movie;
