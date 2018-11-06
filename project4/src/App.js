import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MovieList from './components/MovieList.js';
import './App.css';

@inject('movieStore')
@observer
class App extends Component {

  componentDidMount(){
      this.props.movieStore.addMovieToList();
  }

  //Function that is fired when serach button is clicked
  getResults(search){
    document.getElementById("resultText").innerHTML = "Showing results for '" + search + "'";
    document.getElementById("movieList").style.display = "flex";
    document.getElementById("displayGrid").style.display = "inline-block";
    document.getElementById("displayList").style.display = "inline-block";
    console.log(search);
  }

  //Change searchValue to equal the input text
  changeValue(text){
    this.searchValue = text;
    this.props.movieStore.findMovie(text);
  }

  changeDisplay(value){
    document.getElementById("movieList").style.flexDirection = value;
  }

  //-----RENDER----------
  render() {
    return (
      <div>
        <MuiThemeProvider className="App">
          <SearchBar
            onChange={(text) => this.changeValue(text)}
            onRequestSearch={() => this.getResults(this.searchValue)}
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
