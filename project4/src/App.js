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

  async fetchMovies(searchText){
      await this.props.movieStore.fetchMovieData(searchText);
      //this.showMovies(searchText);
  }

  setGenre(){
      let selectedGenre = document.getElementById("genrePicker").value;
      this.props.movieStore.setGenre(selectedGenre)
  }


    handleRatingChange = (event, value) => {
      console.log(value);
        this.props.movieStore.setMinRating(value);
    };

  //Function to fetch movies from API
  async fetchMovies(searchText){
      document.getElementById("infoText").innerHTML = "Showing results for '" + searchText + "'";
      await this.props.movieStore.fetchMovieData(searchText);
  }


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
                <MovieList changeView = {() => this.changeView()} minRating={this.props.movieStore.minRating} genre={this.props.movieStore.genre}}/>
            </div>
        </React.Fragment>
    );
  }
}

export default App;