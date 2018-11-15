import React from 'react';
import renderer from 'react-test-renderer';
import Movie from "../Movie";
import {Provider} from "mobx-react";
import { mount } from 'enzyme';

describe("Movie", () => {
    const testStore = {
        movies: [
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


        ]};

    //Simple snapshot testing
    /*test('Movie renders correctly?', () => {
        const component =
            (<Provider movieStore = {testStore}>
                <Movie
                    movieStore = {testStore}
                    key={testStore._id}
                    id={testStore._id}
                    title={testStore.title}
                    plot={testStore.plot}
                    poster={testStore.poster}
                    genres={testStore.genres}

                    userRating={testStore.ratings !== undefined
                        ? testStore.ratings.reduce(function(a,b){return a+b;}) / testStore.ratings.length
                        : 0}
                    userRatingLength={testStore.ratings !== undefined
                        ? testStore.ratings.length
                        : 0}
                />
            </Provider>);
        const instance = renderer.create(component).toJSON();
        expect(instance).toMatchSnapshot();
    });*/

    //Test handleExpandMovie()
    test('Test handleExpandMovie()', () => {
        const testFunction = jest.fn();
        const component = mount(
            <Provider movieStore = {testStore}>
                <Movie
                    changeView={testFunction}
                    key={testStore._id}
                    id={"filmID"}
                    title={testStore.title}
                    plot={testStore.plot}
                    poster={testStore.poster}
                    genres={testStore.genres}
                    userRating={testStore.ratings !== undefined
                        ? testStore.ratings.reduce(function(a,b){return a+b;}) / testStore.ratings.length
                        : 0}
                    userRatingLength={testStore.ratings !== undefined
                        ? testStore.ratings.length
                        : 0}
                />
            </Provider>);
        component.find("div#filmID").simulate("click");
        expect(component.find(".movieContainerSmall").length).toEqual(1);
        component.unmount();
    });

    //Test onStarClick()
    test('Test onStarClick()', () => {
        const testFunction = jest.fn();
        const component = mount(
            <Provider movieStore = {testStore}>
                <Movie
                    changeView={testFunction}
                    key={testStore._id}
                    id={"filmID"}
                    title={testStore.title}
                    plot={testStore.plot}
                    poster={testStore.poster}
                    genres={testStore.genres}
                    userRating={testStore.ratings !== undefined
                        ? testStore.ratings.reduce(function(a,b){return a+b;}) / testStore.ratings.length
                        : 0}
                    userRatingLength={testStore.ratings !== undefined
                        ? testStore.ratings.length
                        : 0}
                />
            </Provider>);
        component.find("#starfilmID").simulate("click",{target:{value:1}});
        expect(component.find("#mainMovieContainer").length).toEqual(1);
        component.unmount();
    });
});