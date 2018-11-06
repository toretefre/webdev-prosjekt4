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
                        imgSrc: movie.imgSrc,
                    })
                })

        }
        console.log(moviesToShow);
        moviesToShow = [];
    };

    @action addMovieToList(title){
        this.movies.push(
            {title : "Titanic", imgSrc: "noe1.png"},
            {title : "Terkel i knipe", imgSrc: "noe2.png"},
            {title: "Tenner et lys", imgSrc: "noe3.png"});
    }
}

export default new MovieStore();