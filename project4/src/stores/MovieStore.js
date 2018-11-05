import { observable, action } from "mobx";
import React, { Component } from 'react';

class Movies extends Component {
    @observable movies = ({
        titleID : 1,
        title : "Terkel i knipe",
    });

    @action findMovie = (titleID) => {
        console.log(this.movies.filter(movie => movie.id === titleID));
    };
}

export default new Movies();