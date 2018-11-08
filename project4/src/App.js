import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MovieList from './components/MovieList.js';
import './App.css';

@inject('movieStore')
@observer
class App extends Component {
    constructor(props){
        super(props);
        this.searchValue = "";
    }

  componentDidMount(){


  }

  async fetchMovies(searchParam){
      await this.props.movieStore.fetchMovieData(searchParam);
      this.props.movieStore.movies.map(movie => {
          console.log(movie.title);
      })
  }

  //Function that is fired when serach button is clicked
  getResults = (search) => {

    document.getElementById("resultText").innerHTML = "Showing results for '" + search + "'";
    document.getElementById("movieList").style.display = "flex";
    document.getElementById("displayGrid").style.display = "inline-block";
    document.getElementById("displayList").style.display = "inline-block";
    console.log(search);
  };

  changeDisplay = (value) => {
    document.getElementById("movieList").style.flexDirection = value;
  };

  //-----RENDER----------
  render() {
    return (
      <div>
        <MuiThemeProvider className="App">
          <SearchBar
            onChange={(text) => this.searchText = text}
            onRequestSearch={() => this.fetchMovies(this.searchText)}
            placeholder={'Search for movies'}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
        </MuiThemeProvider>
        <center>
          <div id="resultText">
            Search for something
          </div>
          <button id="displayGrid" onClick={() => this.changeDisplay("row")}>Grid</button>
          <button id="displayList" onClick={() => this.changeDisplay("column")}>List</button>
        </center>
        <MovieList id="movieList"/>
      </div>
    );
  }
}

export default App;
