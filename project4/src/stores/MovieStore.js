import { observable, action, computed, toJS } from "mobx";
import { Component } from 'react';
import axios from "axios";

class MovieStore extends Component {
    @observable movies = [];
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
}

export default new MovieStore();