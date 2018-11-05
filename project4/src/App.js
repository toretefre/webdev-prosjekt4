import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MovieList from './components/MovieList.js';
//styles
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    const searchValue="";
  }

  //Function that is fired when serach button is clicked
  getResults(search){
    document.getElementById("resultText").innerHTML = "Showing results for '" + search + "'";
    document.getElementById("movieList").style.display = "flex";
    console.log(search);
  }

  //Change searchValue to equal the input text
  changeValue(text){
    this.searchValue = text;
    //console.log(this.searchValue);
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
        </center>
        <MovieList id="movieList"/>
      </div>
    );
  }
}

export default App;
