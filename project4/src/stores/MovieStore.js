import { observable, action } from "mobx";
import { Component } from 'react';
import axios from "axios";

//This is our store, where all the state is stored.
class MovieStore extends Component {
    @observable fetchedMovies = 0;
    @observable expandMovie = false;
    @observable movies = [];
    @observable tempList = [];
    @observable resList = [];
    @observable genre = "All";
    @observable minRating = 1;
    @observable tempSearchString = "";

    //Function to retrieve data from our api.
    //It fetches data together a given searchparam from the user.
    //Axios will try to retrieve data, and then store the data in the "movies"-list
    @action async fetchMovieData(searchParam) {
        if (!searchParam){
            searchParam = "";
        }
        if (this.tempSearchString !== searchParam){
            this.fetchedMovies = 0;
            this.movies = [];
            this.tempSearchString = searchParam;
        }
        let endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+ searchParam+ "?startindex="+this.fetchedMovies;
        /*if(genreslece) {
            endpoint += "&genre="+this.valggjasner;
        }
        if(thresholdnoe){
            endpoint += "&threshold="+this.novalgt;
        }*/
        await axios.get(endpoint)
            .then(res => {
                if(res.data.error){
                    throw res.data.error;
                }
                this.movies = this.movies.slice().concat(res.data);
            });

    }

    @action setExpandMovie(val){
        this.expandMovie = val;
    }

    @action setGenre(val){
        this.genre = val;
    }

    @action setMinRating(val){
        this.minRating = val;
    }

    @action increaseFetchedMovies(){
        this.fetchedMovies += 20;
    }
}

export default new MovieStore();