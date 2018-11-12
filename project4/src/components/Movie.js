import React, { Component } from 'react';
//styles
import '../Movie.css';
import {inject, observer} from "mobx-react";

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
        <a href={"#"+this.props.id} className={this.props.movieStore.expandMovie ? "movieContainerBig" : "movieContainerSmall"} >
            <div onClick={() => this.handleExpandMovie()} className={this.props.movieStore.expandMovie ? "innerMovieContainerBig" : "innerMovieContainerSmall"} id={this.props.id}>
                <img alt=""  className={this.props.movieStore.expandMovie ? "expandImageBig" : "expandImageSmall"}/>
                <img alt="" className={this.props.movieStore.expandMovie ? "movieImageBig" : "movieImageSmall"} src={this.props.poster}/>
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
                  <div className="movieRatings">
                      <a href={"https://www.imdb.com/title/" + this.props.imdbId}>
                          <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                      </a>
                      {" - " + this.props.imdbRating}
                      <img className="ratingImage" alt="" src={require("../assets/images/tomato.png")}/>
                      {" - " + this.props.tomatoRating}
                  </div>
                </div>
                <div className={this.props.movieStore.expandMovie ? "titleTextSmallShow" : "titleTextSmallHide"}>{this.props.title}</div>
                <div className="rating">{this.props.imdb}</div>
            </div>
        </a>
    )
  }
}

export default Movie;
