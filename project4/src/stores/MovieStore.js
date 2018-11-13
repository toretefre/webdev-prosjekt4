import { observable, action } from "mobx";
import { Component } from 'react';
import axios from "axios";

//This is our store, where all the state is stored.
class MovieStore extends Component {
    @observable fetchedMovies = 0;
    @observable expandMovie = false;
    @observable movies = [];
    @observable genre  = "All";
    @observable genres =
        ["All", "Western","Comedy", "Action", "Crime", "Drama", "Musical", "Thriller", "Animation", "Adventure", "Family",
            "Fantasy", "Documentary", "Sci-Fi", "Romance", "Biography", "Mystery", "Horror", "Music", "History",
            "War", "Short", "Film-Noir", "Sport", "Talk-Show", "News", "Reality-TV", "Adult", "Game-Show"];
    @observable minRating = 1;
    @observable tempSearchString = "";
    @observable endpoint = "";
    @observable searchParam = "";

    //Function to retrieve data from our api.
    //It fetches data together a given searchparam from the user.
    //Axios will try to retrieve data, and then store the data in the "movies"-list
    @action async fetchMovieData() {
        if (!this.searchParam){this.searchParam = "";}
        if (this.tempSearchString !== this.searchParam){
            this.fetchedMovies = 0;
            this.movies = [];
            this.tempSearchString = this.searchParam;
        }

        if(this.genre === "All"){
            this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/' + this.searchParam + "?startindex=" + this.fetchedMovies + '&threshold='+this.minRating;
        }
        else{
            this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/' + this.searchParam + "?startindex=" + this.fetchedMovies + '&genre='+this.genre + '&threshold='+this.minRating;
        }

        await axios.get(this.endpoint)
            .then(res => {
                if(res.data.error){
                    throw res.data.error;
                }
                this.movies = this.movies.slice().concat(res.data);
            });

    }

    @action setSearchParam(val){
        this.searchParam = val;
        this.fetchedMovies = 0;
        this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+ this.searchParam+ "?startindex="+this.fetchedMovies;
        this.fetchMovieData();
    }

    @action setExpandMovie(val){
        this.expandMovie = val;
    }

    @action setGenre(val){
        this.genre = val;
        if(this.genre !== "All") {
            this.movies = [];
            this.fetchedMovies = 0;
            this.endpoint += '&genre='+this.genre;
        }
        else{
            this.movies = [];
            this.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+ this.searchParam+ "?startindex="+this.fetchedMovies;
        }
        this.fetchMovieData();
    }

    @action setMinRating(val){
        this.minRating = val;
        this.fetchedMovies = 0;
        this.movies = [];
        this.fetchMovieData();
    }

    @action increaseFetchedMovies(){
        this.fetchedMovies += 20;
        this.fetchMovieData();
    }
}

export default new MovieStore();