import { observable, action } from "mobx";
import { Component } from 'react';
import axios from "axios";

//This is our store, where all the state is stored.
class MovieStore extends Component {
    @observable expandMovie = false;
    @observable movies = [];
    @observable genre = "All";
    @observable minRating = 1;

    //Function to retrieve data from our api.
    //It fetches data together a given searchparam from the user.
    //Axios will try to retrieve data, and then store the data in the "movies"-list
    @action async fetchMovieData(searchParam) {
        const endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+searchParam;
        await axios.get(endpoint)
            .then(res => {
                if(res.data.error){
                    throw res.data.error;
                }
                this.movies = res.data;
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
}

export default new MovieStore();