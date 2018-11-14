import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactSimpleRange from 'react-simple-range';
import MovieList from './components/MovieList.js';
import './App.css';


@inject('movieStore')
@observer
class App extends Component {

  //ComponentDidMount loads 20 movies when the user enters the code
  //Adding eventlistener for scrolling (which is being used in handlescroll)
  componentDidMount() {
      console.log(document.getElementById("searchBar").value);
      this.props.movieStore.fetchMovieData();
      document.addEventListener('scroll', this.handleScroll);
  }

  //ComponentWillUnmount is removing the eventlistener
  componentWillUnmount() {
      document.removeEventListener('scroll', this.handleScroll);
  }

  //Function to change the view between grid and list.
  //The function sets the value of the observable variable "expandmovie" to the opposite value (true/false)
  //Changes the color of the grid and list buttons.
  changeView = () => {
    this.props.movieStore.setExpandMovie(!this.props.movieStore.expandMovie);
  };

  //Gets the chosen genre from the the dropdown and passes this to the moviestore, which retrieves a new set of movies based on the genre
  setGenre = () => {
      this.props.movieStore.setGenre(document.getElementById("genrePicker").value);
  };

  //Function to handle change of selected minimum rating
  handleRatingChange = (value) => {
      this.props.movieStore.setMinRating(value);
  };

  //Function to fetch movies from API
  fetchMovies = (searchText) => {
      document.getElementById("infoText").innerHTML = "Showing results for '" + searchText + "'";
      this.props.movieStore.setSearchParam(searchText);
  };

  //Detects whether the user is scrolled to the bottom or not
    // It also checks whether to hide or show the button that navigates to the top
  handleScroll = () =>{
      //If user scrolls down a little, show the button that navigates to the top
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          document.getElementById("goToTopBtn").style.opacity = "1";
      }
      //If the site is not scrolled down, hide the button that navigates to the top
      else {
          document.getElementById("goToTopBtn").style.opacity = "0";
      }
      //If the user is scrolled to the bottom, it will increase the number of movie fetched.
      if((document.documentElement.scrollTop + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight){
          this.props.movieStore.increaseFetchedMovies();
      }
  };

  //Function to clear searchparam and all filters
  clearAll = () => {
      document.getElementById("genrePicker").value = "All genres";
      this.props.movieStore.searchBarValue = "";
      this.props.movieStore.clearAll();
  };

  //Function that goes to the top of the page
  goToTop = () =>{
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //-----RENDER----------
  render() {
    return (
        <React.Fragment>
             <div id="headerContainer">
                <MuiThemeProvider className="App">
                  <SearchBar id="searchBar"
                    value={this.props.movieStore.searchBarValue}
                    onChange={(text) => this.props.movieStore.searchBarValue = text}
                    onRequestSearch={() => this.fetchMovies(this.props.movieStore.searchBarValue)}
                    hintText='Search for movies'
                    style={{
                      margin: '5px 0',
                      width: "60%",
                      borderRadius: "7px",
                    }}

                  />
                </MuiThemeProvider>
                  <div id="optionBar">
                      <div id="filterAndButtonContainer">
                          <div className="filtersContainer">
                              <div id="genreContainer">
                                  <select className="genrePicker" id={"genrePicker"} onChange={() => this.setGenre()}>
                                      {this.props.movieStore.genres.map((genre) =>
                                          <option key={genre} value={genre} label={genre}/>
                                      )}
                                  </select>
                              </div>
                              <div id="sliderContainer">
                                  <img className="ratingImage" alt="" src={require("./assets/images/imdb.png")}/>
                                  <div>Rating:</div>
                                  <div id={"mySlider"}>
                                      <ReactSimpleRange
                                          label
                                          onChangeComplete={(element) => this.handleRatingChange(element.value)}
                                          min={1}
                                          max={10}
                                          step={1}
                                          defaultValue={this.props.movieStore.minRating}
                                          trackColor={"#000000"}
                                          thumbColor={"#f5de50"}
                                          sliderColor={"#f5de50"}
                                          sliderSize={6}
                                          thumbSize={13}
                                      />
                                  </div>
                                  <div id="label">{this.props.movieStore.minRating} / 10</div>
                              </div>

                          </div>
                          <div id={"displayButtons"}>
                              <button id={this.props.movieStore.expandMovie ? "displayList" : "displayGrid"} onClick={() => this.changeView()}>
                                  <img className="displayImg" alt="" src={this.props.movieStore.expandMovie ? require("./assets/images/gridwhite.png") : require("./assets/images/gridblack.png")}/>
                              </button>
                              <button id={this.props.movieStore.expandMovie ? "displayGrid" : "displayList"} onClick={() => this.changeView()}>
                                  <img className="displayImg" alt="" src={this.props.movieStore.expandMovie ? require("./assets/images/listblack.png") : require("./assets/images/listwhite.png")}/>
                              </button>
                          </div>
                      </div>
                  </div>
                <div id="infoTextContainer">
                  <div id="infoText">
                    Showing all movies
                  </div>
                    <div onClick={() => this.clearAll()} id="clearSearchContainer">
                        <img id="infoContainerImg" alt="" src={require("./assets/images/waste-bin.png")}/>
                        Clear search
                    </div>
                </div>
              </div>
            <div id="moviesContainer">
                <MovieList fetchMoreData = {() => this.fetchMovies()} changeView = {() => this.changeView()} minRating={this.props.movieStore.minRating} genre={this.props.movieStore.genre}/>
                <aside
                    id={"goToTopBtn"}
                    role={"button"}
                    onClick={this.goToTop}
                >
                    <img className="toTopImg" alt="Go to top" src={require("./assets/images/up.png")}/>
                </aside>
            </div>
        </React.Fragment>
    );
  }
}

export default App;