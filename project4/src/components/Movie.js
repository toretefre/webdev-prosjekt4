import React, { Component } from 'react';
import '../Movie.css';
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
        this.props.changeView();
    }

    //Function to handle a rating for a user
    //Saves the given stars for this session to this.tempStars
    onStarClick = (nextValue) =>{
        this.tempStars = nextValue;
        this.addNotification();
        this.props.movieStore.putMovieRating(this.props.id, nextValue);
    };

  //-----RENDER-----//
  render() {
    return (
        <React.Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <div id="mainMovieContainer" className={this.props.movieStore.expandMovie ? "movieContainerBig" : "movieContainerSmall"} >
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
                      <div onClick={() => this.handleExpandMovie()} className="movieRatings">
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
                    <div className={this.props.movieStore.expandMovie ? "smallImgStarHide" : "smallImgStarShow"}>
                        <a href={"https://www.imdb.com/title/" + this.props.imdbId} target="_blank" rel="noopener noreferrer">
                            <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                        </a>
                        <div>{this.props.imdbRating} / 10</div>
                    </div>
                    <a className="movieLink" href={"#"+this.props.id}>
                        <div className={this.props.movieStore.expandMovie ? "titleTextSmallHide" : "titleTextSmallShow"}>{this.props.title}</div>
                    </a>
                    <div className="rating">{this.props.imdb}</div>
                    <img className={this.props.movieStore.expandMovie ? "expandImage" : "hideExpandImage"} alt="" src={require("../assets/images/expanded.png")}/>
                </div>
            </div>
        </React.Fragment>
    )
  }
}

export default Movie;
