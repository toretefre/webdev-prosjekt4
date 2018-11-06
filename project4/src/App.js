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

    let resultMovies = [];
  }


  componentDidMount(){
      this.props.movieStore.addMovieToList();
  }

  //Function that is fired when serach button is clicked
  getResults(search){
    document.getElementById("resultText").innerHTML = "Showing results for '" + search + "'";
    document.getElementById("movieList").style.display = "flex";
    document.getElementById("displayButtons").style.display = "inline-block";
    console.log(search);
  }

  //Change searchValue to equal the input text
  changeValue(text){
    this.searchValue = text;
    this.props.movieStore.findMovie(text);
  }

  changeDisplay(value){
    document.getElementById("movieList").style.flexDirection = value;
    //Get all movieInfo boxes
    let movieInfo = document.getElementsByClassName("movieInfo");
    //Get all titles
    let titles = document.getElementsByClassName("movieTitle");
    //Get all movie containers
    let movies = document.getElementsByClassName("movieContainer");
    //If list will be shown, make movieinfo visible
    if(value==="column"){
      //Hide titles below images
      for(let i=0; i<titles.length; i++){
        titles[i].style.display = "none";
      }
      //Set height and widht of movieContainer
      for(let i=0; i<movies.length; i++){
        movies[i].style.height = "350px";
        movies[i].style.width = "900px";
      }
      for(let i=0; i<movieInfo.length; i++){
        movieInfo[i].style.display = "flex";
      }
    }
    //If grid will be shown, hide movie info
    else{
      for(let i=0; i<movieInfo.length; i++){
        movieInfo[i].style.display = "none";
      }
      //Show titles below image
      for(let i=0; i<titles.length; i++){
        titles[i].style.display = "block";
      }
      //Set height and widht of movieContainer
      for(let i=0; i<movies.length; i++){
        movies[i].style.height = "350px";
        movies[i].style.width = "250px";
      }
    }
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
        <div id="infoContainer">
          <div id="resultText">
            No results to show.
          </div>
          <div id="displayButtons">
            <button id="displayGrid" onClick={() => this.changeDisplay("row")}>Grid</button>
            <button id="displayList" onClick={() => this.changeDisplay("column")}>List</button>
          </div>
        </div>
        <MovieList id="movieList"/>
      </div>
    );
  }
}

export default App;
