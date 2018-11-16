import React from 'react';
import App from "../App";
import {Provider} from "mobx-react";
import MovieStore from "../../stores/MovieStore";
import { mount, shallow } from "enzyme";

describe("App", () => {
    const movieStore = MovieStore;
    const testStore = {
        fetchMovieData : jest.fn(),
        setSortValue : jest.fn(),
        clearAll : jest.fn(),
        setGenre: jest.fn(),
        setMinRating : jest.fn(),
        genres : ["test"],
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
        ],
    };

    beforeAll(() => {
        const div = document.createElement('div');
        window.domNode = div;
        document.body.appendChild(div);
    });


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

    test('Test go to top btn', () => {
        const appComponent = mount(
            <Provider movieStore = {movieStore}>
                <App/>
            </Provider>);

        appComponent.find("#goToTopBtn").simulate("click");
        expect(movieStore.expandMovie).toBeFalsy();
        appComponent.unmount();
    });

    test('Test clearAll', () => {
        const appComponent = mount(
            <Provider movieStore = {testStore}>
                <App movieStore = {testStore}/>
            </Provider>);

        appComponent.find("#sortPicker").simulate("change", {target:{value:"title"}});
        appComponent.find("#genrePicker").simulate("change", {target:{value:"All genres"}});
        appComponent.find("#clearSearchContainer").simulate("click");
        expect(movieStore.searchBarValue).toBe("");
        expect(movieStore.minRating).toBe(1);
        expect(movieStore.genre).toBe("All genres");
        expect(movieStore.sortValue).toBe("title");
        appComponent.unmount();
    });
});