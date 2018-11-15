import React from 'react';
import renderer from 'react-test-renderer';
import Movie from "../Movie";
import MovieStore from "../../stores/MovieStore";
import {Provider} from "mobx-react";

describe("MovieStore", () => {
    //Creating an instance of MovieStore
    const movieStore = MovieStore;

    movieStore.movies = [{
        _id: "testID",
        title: "test",
        year: 1962,
        rated: "S",
        runtime: 99,
        countries: [],
        genres: [
            "test"
        ],
        director: "test",
        writers: [
            "test"
        ],
        actors: [
            "test",
        ],
        plot: null,
        poster: null,
        imdb: {
            id: "tt0132936",
            rating: 5.1,
            votes: 25
        },
        awards: {
            wins: 0,
            nominations: 0,
            text: ""
        },
        type: "test"
    }];

    test("Movie Snapshot", () => {
        const stepTree = renderer.create(<Movie movieStore = {movieStore}/>);
        expect(stepTree).toMatchSnapshot();
    });

    test("function handleExpandMovie", () => {
        const movieComponent =
            <Provider movieStore = {MovieStore}>
                <Movie/>
            </Provider>;
        const movieInstance = renderer.create(movieComponent).getInstance();
    });
});