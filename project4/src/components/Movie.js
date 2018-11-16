import React, { Component } from 'react';
import './styles/Movie.css';
import {inject, observer} from "mobx-react";
import ReplacementImage from "../assets/images/noimage.png";
import StarRatings from 'react-star-ratings';
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

@inject('movieStore')
@observer
class Movie extends Component {
    constructor(props){
        super(props);
        this.tempStars = 0;
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    //-----FUNCTIONS-----//

    //Function from 'react-notificaitons-componenent' to show a popup when the user rates a movie
    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Thank for rating the movie!",
            message: "You gave " + this.tempStars + " stars to " + this.props.title + "!    ",
            type: "success",
            insert: "top",
            isMobile: true,
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }

    //Function to change the observable variable "expandMovie".
    //Changes between grid and listview
    handleExpandMovie(){
        this.props.changeView(!this.props.movieStore.expandMovie);
    }

    //Function to handle a rating for a user
    //Saves the given stars for this session to this.tempStars
    onStarClick = async (nextValue) =>{
        this.tempStars = nextValue;
        this.props.changeView(this.props.movieStore.expandMovie);
        this.addNotification();
        await this.props.movieStore.putMovieRating(this.props.id, nextValue);
    };

  //-----RENDER-----//

  render() {
    return (
        <React.Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            {/*Switching between gridview and listview (depends on the variable expandmovie in movieStore*/}
            <div id="mainMovieContainer" className={this.props.movieStore.expandMovie ? "movieContainerBig" : "movieContainerSmall"} >
                <div className={this.props.movieStore.expandMovie ? "innerMovieContainerBig" : "innerMovieContainerSmall"} id={this.props.id}>
                    <a className="movieLink" href={"#"+this.props.id}>
                        <img onClick={() => this.handleExpandMovie()} alt="Img not found.." onError={(e) => {
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
                        <div className="movieExtraInfo">
                          <div className="movieActors">
                              <h5>Actors</h5>
                              {this.props.actors}
                          </div>
                          <div className="runTime">
                              <h5>Runtime</h5>{this.props.runtime} min
                          </div>
                          <div className="movieGenre">
                              <h5>Genres</h5>{this.props.genres}
                          </div>

                          <div className="movieRatings">
                              <div className="imdbRatings">
                                  <a href={"https://www.imdb.com/title/" + this.props.imdbId} target="_blank" rel="noopener noreferrer">
                                      <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                                  </a>
                                  {"(" + this.props.imdbRating + ")"}
                              </div>
                              <div className="userRatings">
                                  <p className="userRatingText">User rating:</p>
                                  <StarRatings
                                      isSelectable={false}
                                      rating={this.props.userRating}
                                      starRatedColor="#eac600"
                                      numberOfStars={1}
                                      name='rating1'
                                      starHoverColor={"#eac600"}
                                      starDimension="20px"
                                      starSpacing="2px"
                                  />
                                  <p className="userRatingText">({Number(this.props.userRating).toFixed(2)}) - {this.props.userRatingLength} votes</p>
                              </div>
                              <div className="giveUserRating">
                                  <p className="userRatingText">Give user-rating: </p>
                                  <div onClick={() => this.props.changeView(this.props.movieStore.expandMovie)}>
                                      <StarRatings
                                          id={"star"+this.props.id}
                                          starRatedColor="#eac600"
                                          rating={this.tempStars}
                                          changeRating={this.onStarClick}
                                          numberOfStars={5}
                                          name='rating2'
                                          starHoverColor={"#eac600"}
                                          starDimension="20px"
                                          starSpacing="2px"
                                      />
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className={this.props.movieStore.expandMovie ? "smallImgImdbHide" : "smallImgImdbShow"}>
                        <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                        <div>{this.props.imdbRating} / 10</div>
                    </div>
                    <a className="movieLink" href={"#"+this.props.id}>
                        <div onClick={() => this.handleExpandMovie()} className={this.props.movieStore.expandMovie ? "titleTextSmallHide" : "titleTextSmallShow"}>{this.props.title}</div>
                    </a>
                    <div className="rating">{this.props.imdb}</div>
                    <a className={this.props.movieStore.expandMovie ? "expandMovie" : "hideExpandMovie"} href={"#"+this.props.id}>
                        <img onClick={() => this.handleExpandMovie()} className={this.props.movieStore.expandMovie ? "expandImage" : "hideExpandImage"} alt="" src={require("../assets/images/expanded.png")}/>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
  }
}

export default Movie;