import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
                <MovieList changeView = {() => this.changeView()} showInfo={() => this.changeDisplay()}/>
            </div>
        </React.Fragment>
    );
  }
}

export default App;