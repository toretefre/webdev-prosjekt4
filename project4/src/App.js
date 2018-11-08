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
<<<<<<< project4/src/App.js
      this.props.movieStore.addMovieToList();
      document.getElementById("movieList").style.flexDirection = "row";
  }

  //Function that is fired when serach button is clicked
  getResults(search){
    console.log(search);
    document.getElementById("resultText").innerHTML = "Showing results for '" + search + "'";
    document.getElementById("movieList").style.display = "flex";
    document.getElementById("movieList").style.justifyContent = "flex-start";
    document.getElementById("displayButtons").style.display = "inline-block";
  }

  //Change searchValue to equal the input text
  changeValue(text){
    this.searchValue = text;
    this.props.movieStore.findMovie(text);
  }

  movieClicked(){
    const view = document.getElementById("movieList").style.flexDirection;
    console.log(view);
    //If view is grid, change to list
    if(view==="row"){
      this.changeDisplay("column");
    }
    //If view is list, change to grid
    else{
      this.changeDisplay("row");
    }
  }

  changeDisplay(value){
    document.getElementById("movieList").style.flexDirection = value;
    //Get all expand buttons
    let expandButtons = document.getElementsByClassName("expandImage");
    //Get all movieInfo boxes
    let movieInfo = document.getElementsByClassName("movieInfo");
    //Get all titles
    let titles = document.getElementsByClassName("titleText");
    //Get all movie containers
    let movies = document.getElementsByClassName("movieContainer");
    //If list will be shown, make movieinfo visible
    if(value==="column"){
      //Change expand button
      for(let i=0; i<expandButtons.length; i++){
        expandButtons[i].src=require("./assets/images/expanded.png");
      }
      //Change button colors
      document.getElementById("displayGrid").style.background="none";
      document.getElementById("displayList").style.backgroundColor="lightgreen";
      //Hide titles below images
      for(let i=0; i<titles.length; i++){
        titles[i].style.display = "none";
      }
      //Set height and widht of movieContainer
      for(let i=0; i<movies.length; i++){
        movies[i].style.height = "300px";
        movies[i].style.width = "100%";
      }
      for(let i=0; i<movieInfo.length; i++){
        movieInfo[i].style.display = "flex";
      }
    }
    //If grid will be shown, hide movie info
    else{
      //Change expand button
      for(let i=0; i<expandButtons.length; i++){
        expandButtons[i].src=require("./assets/images/expand-arrow.png");
      }
      //Change button colors
      document.getElementById("displayList").style.background="none";
      document.getElementById("displayGrid").style.backgroundColor="lightgreen";
      for(let i=0; i<movieInfo.length; i++){
        movieInfo[i].style.display = "none";
      }
      //Show titles below image
      for(let i=0; i<titles.length; i++){
        titles[i].style.display = "flex";
      }
      //Set height and widht of movieContainer
      for(let i=0; i<movies.length; i++){
        movies[i].style.height = "300px";
        movies[i].style.width = "19%";
      }
    }
  }
=======


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
        <div id="infoContainer">
          <div id="resultText">
            No results to show.
          </div>
          <div id="displayButtons">
            <button id="displayGrid" onClick={() => this.changeDisplay("row")}>Grid</button>
            <button id="displayList" onClick={() => this.changeDisplay("column")}>List</button>
          </div>
        </div>
        <MovieList id="movieList" showInfo={() => this.movieClicked()}/>
      </div>
    );
  }
}

export default App;