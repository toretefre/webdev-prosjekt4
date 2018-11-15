import { observable, action } from "mobx";
import { Component } from 'react';
import axios from "axios";

//This is our store, where all the state is stored.
class MovieStore extends Component {
    @observable fetchedMovies = 0;
    @observable expandMovie = false;
    @observable movies = [];
    @observable genre  = "All genres";
    @observable genres =
        ["All genres", "Western","Comedy", "Action", "Crime", "Drama", "Musical", "Thriller", "Animation", "Adventure", "Family",
            "Fantasy", "Documentary", "Sci-Fi", "Romance", "Biography", "Mystery", "Horror", "Music", "History",
            "War", "Short", "Film-Noir", "Sport", "Talk-Show", "News", "Reality-TV", "Game-Show"];
    @observable minRating = 1;
    @observable tempSearchString = "";
    @observable endpoint = "";
    @observable putEndpoint = "";
    @observable searchParam = "";
    @observable searchBarValue = "";
    @observable sortValue = "title";

    //Function to retrieve data from our api.
    //It fetches data together a given searchparam from the user.
    //Axios will try to retrieve data, and then store the data in the "movies"-list
    @action fetchMovieData = async () => {
        if (!this.searchParam){this.searchParam = "";}
        if (this.tempSearchString !== this.searchParam){
            this.fetchedMovies = 0;
            this.movies = [];
            this.tempSearchString = this.searchParam;
        }

        if(this.genre === "All genres"){
            this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/' + this.searchParam + "?startindex=" + this.fetchedMovies + '&threshold='+this.minRating + '&sort=' + this.sortValue;
        }
        else{
            this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/' + this.searchParam + "?startindex=" + this.fetchedMovies + '&genre='+this.genre + '&threshold='+this.minRating + '&sort=' + this.sortValue;
        }
        try{
            await axios.get(this.endpoint)
                .then(res => {
                    this.movies = this.movies.slice().concat(res.data);
                });
        } catch (error) {
            throw error;
        }
    };

    //Function to post data to the database (ratings)
    @action putMovieRating = async (movieID, rating) => {
        this.putEndpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+movieID+'/'+rating;
        try{
            axios.put(this.putEndpoint);
        } catch (error) {
            throw error;
        }

    };

    //Function to set the searchParameter when the user search for a movie
    //Fetchedmovies, movies are cleared so the user the the first results from the database
    @action setSearchParam = async (val) => {
        this.searchParam = val;
        this.fetchedMovies = 0;
        this.movies = [];
        await this.fetchMovieData();
    };

    @action setExpandMovie = (val) => {
        this.expandMovie = val;
    };

    //Function to set the genre when the user filters on a genre
    //Fetchedmovies, movies are cleared so the user the the first results from the database
    @action setGenre = async (val) => {
        this.genre = val;
        this.fetchedMovies = 0;
        this.movies = [];
        await this.fetchMovieData();
    };

    //Function to set the searchParameter when the sets the minrating for a movie
    //Fetchedmovies, movies are cleared so the user the the first results from the database
    @action setMinRating = async (val) => {
        this.minRating = val;
        this.fetchedMovies = 0;
        this.movies = [];
        await this.fetchMovieData();
    };

    //Function to clear all and fetch the first 20 movies from the database
    @action clearAll = async () => {
        this.minRating = 1;
        this.fetchedMovies = 0;
        this.movies = [];
        this.searchParam = "";
        this.sortValue = "title";
        this.genre = "All genres";
        if(document.getElementById("infoText")){
            document.getElementById("infoText").innerHTML = "Showing all movies";
        }
        await this.fetchMovieData();
    };

    //Fetchedmovies, movies are cleared so the user the the first results from the database
    @action increaseFetchedMovies = async () =>{
        this.fetchedMovies += 20;
        await this.fetchMovieData();
    };

    @action setSortValue = async (val) => {
        this.sortValue = val;
        this.fetchedMovies = 0;
        this.movies = [];
        await this.fetchMovieData();
    };
}

export default new MovieStore();