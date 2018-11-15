import React from 'react';
import renderer from 'react-test-renderer';
import App from "../../App";
import {Provider} from "mobx-react";
import MovieStore from "../../stores/MovieStore";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount, shallow } from "enzyme";
import {observable} from "mobx";

describe("App", () => {
    const movieStore = MovieStore;
    const testStore = {
        genres : ["All genres", "Western","Comedy", "Action", "Crime", "Drama", "Musical", "Thriller", "Animation", "Adventure", "Family",
                "Fantasy", "Documentary", "Sci-Fi", "Romance", "Biography", "Mystery", "Horror", "Music", "History",
                "War", "Short", "Film-Noir", "Sport", "Talk-Show", "News", "Reality-TV", "Game-Show"],
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

        ],
        sortValue : "title",
    };


    test('Switching from gridview to listview', () => {
        const appComponent = mount(
            <Provider movieStore = {movieStore}>
                <App/>
            </Provider>);

        movieStore.expandMovie = false;
        appComponent.find("#displayList").simulate("click");
        expect(movieStore.expandMovie).toBeTruthy();
        appComponent.unmount();
    });

    test('Switching from listView to gridView', () => {
        const appComponent = mount(
            <Provider movieStore = {movieStore}>
                <App/>
            </Provider>);

        movieStore.expandMovie = true;
        appComponent.find("#displayGrid").simulate("click");
        expect(movieStore.expandMovie).toBeFalsy();
        appComponent.unmount();
    });
});