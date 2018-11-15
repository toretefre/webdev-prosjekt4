import React from 'react';
import renderer from 'react-test-renderer';
import MovieList from "../MovieList";
import {Provider} from "mobx-react";

describe("MovieList", () => {
    const testStore = {
        movies: [
            {
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
                type: "test",
                ratings: [1,2],
            },
            {
                _id: "testID2",
                title: "test2",
                year: 1969,
                rated: "S",
                runtime: 69,
                countries: [],
                genres: [
                    "test2"
                ],
                director: "test2",
                writers: [
                    "test2"
                ],
                actors: [
                    "test2",
                ],
                plot: null,
                poster: null,
                imdb: {
                    id: "tt0132969",
                    rating: 6.9,
                    votes: 69
                },
                awards: {
                    wins: 0,
                    nominations: 0,
                    text: ""
                },
                type: "test",

            },

    ]
    };

    //Simple snapshot testing
     test('MovieList renders correctly?', () => {
         const component =
             (<Provider movieStore = {testStore}>
                 <MovieList movieStore = {testStore}/>
             </Provider>);
         const instance = renderer.create(component).toJSON();
         expect(instance).toMatchSnapshot();
     });
});