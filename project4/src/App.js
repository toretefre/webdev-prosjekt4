import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from '@material-ui/lab/Slider';
import MovieList from './components/MovieList.js';
import './App.css';



@inject('movieStore')
@observer
class App extends Component {

   //ComponentDidMount loads 20 movies when the user enters the code
   //Adding eventlistener for scrolling (which is being used in handlescroll)
   componentDidMount() {
        this.props.movieStore.fetchMovieData("");
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
    if (this.props.movieStore.expandMovie){
        document.getElementById("displayGrid").style.backgroundColor="transparent";
        document.getElementById("displayList").style.backgroundColor="lightgreen";
    }
    else{
        document.getElementById("displayGrid").style.backgroundColor="lightgreen";
        document.getElementById("displayList").style.backgroundColor="transparent";
    }
  };

  //Gets the chosen genre from the the dropdown and passes this to the moviestore, which retrieves a new set of movies based on the genre
  setGenre(){
      let selectedGenre = document.getElementById("genrePicker").value;
      this.props.movieStore.setGenre(selectedGenre)
  }

  handleRatingChange = (event, value) => {
    this.props.movieStore.setMinRating(value);
  };

  //Function to fetch movies from API
  async fetchMovies(searchText){
      document.getElementById("infoText").innerHTML = "Showing results for '" + searchText + "'";
      await this.props.movieStore.fetchMovieData(searchText);
  }

  //Detects whether the user is scrolled to the bottom or not
  //If the user is scrolled to the bottom, it will increase the number of movie fetched.
  handleScroll = () =>{
      if((document.documentElement.scrollTop + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight){
          this.props.movieStore.increaseFetchedMovies();
          this.props.movieStore.fetchMovieData(this.searchText);
      }
  };


  //-----RENDER----------
  render() {
    return (
        <React.Fragment>
              <div id="headerContainer">
                <MuiThemeProvider className="App">
                  <SearchBar
                    onChange={(text) => this.searchText = text}
                    onRequestSearch={() => this.fetchMovies(this.searchText)}
                    hintText='Search for movies'
                    style={{
                      margin: '5px 0',
                      width: "60%",
                      borderRadius: "7px",
                    }}
                  />
                </MuiThemeProvider>
                  <div id="optionBar">
                      IMDB Rating:
                      <Slider
                        value={this.props.movieStore.minRating}
                        min={1}
                        max={10}
                        step={0.5}
                        onChange={this.handleRatingChange}
                        style={{width:'10%', margin: '1%'}}
                      />
                       Genre:
                      <select id="genrePicker" onChange={() => this.setGenre()}>
                          <option value="All">All</option>
                          <option value="Action">Action</option>
                          <option value="Adult">Adult</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Drama">Drama</option>
                      </select>
                      <button id="displayGrid" onClick={() => this.changeView()}>Grid</button>
                      <button id="displayList" onClick={() => this.changeView()}>List</button>
                  </div>
                <div id="infoTextContainer">
                  <div id="infoText">
                    No results to show.
                  </div>
                </div>
              </div>
            <div id="moviesContainer">
                <MovieList fetchMoreData = {() => this.fetchMovies()} changeView = {() => this.changeView()} minRating={this.props.movieStore.minRating} genre={this.props.movieStore.genre}/>
            </div>
        </React.Fragment>
    );
  }
}

export default App;