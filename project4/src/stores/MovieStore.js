import { observable, action } from "mobx";
import { Component } from 'react';

class MovieStore extends Component {
    @observable movies = [];
    @action findMovie = (searchText) => {
        //På linje 12 skal filmene hentes ut og vises på skjermen
        let moviesToShow = [];
        if(searchText){
            this.movies
                .filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()))
                .map((movie) => {
                    moviesToShow.push({
                        title:movie.title,
                        imgSrc:"http:www.lol.no"
                    })
                })

        }
        moviesToShow = [];
    };

    @action addMovieToList(title){
        this.movies.push({title : "Titanic"},{title : "Terkel i knipe"},{title: "Tenner et lys"});
    }
}

export default new MovieStore();