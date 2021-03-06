import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactSimpleRange from 'react-simple-range';
import MovieList from './MovieList.js';
import './styles/App.css';

@inject('movieStore')
@observer
class App extends Component {

  //-----LIFECYCLE-----//

  //ComponentDidMount loads 20 movies when the user enters the code
  //Adding eventlistener for scrolling (which is being used in handlescroll)
  componentDidMount () {
      this.props.movieStore.fetchMovieData();
      document.addEventListener('scroll', this.handleScroll);
  }

  //ComponentWillUnmount is removing the eventlistener
  componentWillUnmount() {
      document.removeEventListener('scroll', this.handleScroll);
  }

  //-----FUNCTIONS-----//

  //Function to change the view between grid and list.
  //The function sets the value of the observable variable "expandmovie" to the opposite value (true/false)
  changeView = () => {
    this.props.movieStore.setExpandMovie(!this.props.movieStore.expandMovie);
  };

  //Gets the chosen genre from the the dropdown and passes this to the moviestore, which retrieves a new set of movies based on the genre
  setGenre = async (e) => {
      await this.props.movieStore.setGenre(e.target.value);
  };

  //Function to handle change of selected minimum rating
  handleRatingChange = async (value) => {
      await this.props.movieStore.setMinRating(value);
  };

  //Function to fetch movies from API
  fetchMovies = async (searchText) => {
      document.getElementById("infoText").innerHTML = "Showing results for '" + searchText + "'";
      await this.props.movieStore.setSearchParam(searchText);
  };

  //Detects whether the user is scrolled to the bottom or not
  //It also checks whether to hide or show the button that navigates to the top
  handleScroll = async () =>{
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
          await this.props.movieStore.increaseFetchedMovies();
      }
  };

  //Function to clear searchparam and all filters
  clearAll = async () => {
      this.props.movieStore.setSearchBarValue("");
      await this.props.movieStore.clearAll();
  };

  //Function that goes to the top of the page
  goToTop = () =>{
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //Setting the searchbarvalue which is being stored in movieStore
  setSearchBarValue = (val) => {
      this.props.movieStore.setSearchBarValue(val);
  };

  //Function that alters the sort value
  setSortValue = async (e) => {
      await this.props.movieStore.setSortValue(e.target.value);
  };

  //-----RENDER-----//

  render() {
    return (
        <React.Fragment>
             <div id="headerContainer">
                <MuiThemeProvider className="App">
                  <SearchBar id={"searchBar"}
                    value={this.props.movieStore.searchBarValue}
                    onChange={(text) => this.setSearchBarValue(text)}
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
                                  <select className="dropdown" id={"genrePicker"} value={this.props.movieStore.genre} onChange={(e) => this.setGenre(e)}>
                                      {this.props.movieStore.genres.map((genre) =>
                                          <option key={genre} value={genre} label={genre}/>
                                      )}
                                  </select>
                              </div>
                              <div id="sliderContainer">
                                  <img className="ratingImage" alt="" src={require("../assets/images/imdb.png")}/>
                                  <div>Rating:</div>
                                  <div id={"mySlider"}>
                                      <ReactSimpleRange
                                          id={"slider"}
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

                          <div id={"sortAndViewBigContainer"}>
                              <div id={"sortAndViewSmallContainer"}>
                                  <div id={"sortContainer"}>
                                      <div id={"sortText"}>Sort by</div>
                                      <select className="dropdown" id={"sortPicker"} value={this.props.movieStore.sortValue} onChange={(e) => this.setSortValue(e)}>
                                          <option key={"sortTitle"} value={"title"} label={"Title"}/>
                                          <option key={"sortRating"} value={"imdb"} label={"IMDB Rating"}/>
                                      </select>
                                  </div>
                                  <div id={"viewButtons"}>
                                      <button id={this.props.movieStore.expandMovie ? "displayList" : "displayGrid"} onClick={() => this.changeView()}>
                                          <img className="displayImg" alt="" src={this.props.movieStore.expandMovie ? require("../assets/images/gridwhite.png") : require("../assets/images/gridblack.png")}/>
                                      </button>
                                      <button id={this.props.movieStore.expandMovie ? "displayGrid" : "displayList"} onClick={() => this.changeView()}>
                                          <img className="displayImg" alt="" src={this.props.movieStore.expandMovie ? require("../assets/images/listblack.png") : require("../assets/images/listwhite.png")}/>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                <div id="infoTextContainer">
                  <div id="infoText">
                    Showing all movies
                  </div>
                    <div onClick={() => this.clearAll()} id="clearSearchContainer">
                        <img id="infoContainerImg" alt="" src={require("../assets/images/waste-bin.png")}/>
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
                    <img className="toTopImg" alt="Go to top" src={require("../assets/images/arrow-up.png")}/>
                </aside>
            </div>
        </React.Fragment>
    );
  }
}

export default App;