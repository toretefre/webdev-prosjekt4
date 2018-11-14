import React from 'react';
import renderer from 'react-test-renderer';
import MovieStore from "../../stores/MovieStore";
import App from "../../App";
import {Provider} from "mobx-react";
import ShallowRenderer from "react-test-renderer/shallow";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';




describe("MovieStore", () => {
    //Creating an instance of MovieStore
    const movieStore = MovieStore;
    const appInstance =
        <Provider movieStore = {movieStore}>
            <App/>
        </Provider>;
    const appComponent = renderer.create(appInstance).getInstance();

    //Shallowrenderer
    const shallow = new ShallowRenderer();
    shallow.render(<App movieStore = {movieStore}/>);
    const appResult = shallow.getRenderOutput();

    /*//Simple snapshot testing
    test('Movie renders correctly?', () => {
        const stepTree = renderer.create(<Movie movieStore = {movieStore}/>);
        expect(stepTree).toMatchSnapshot();
    });*/

    test("function setSearchParam(test)", () =>{
        movieStore.setSearchParam("test");
        expect(movieStore.searchParam).toBe("test");
    });

    test("function setExpandMovie(true)", () => {
        movieStore.setExpandMovie(true);
        expect(movieStore.expandMovie).toBeTruthy();
    });

    test("function setExpandMovie(false)", () => {
        movieStore.setExpandMovie(false);
        expect(movieStore.expandMovie).toBeFalsy();
    });

    test("function setGenre('Family')", () => {
        movieStore.setGenre("Family");
        expect(movieStore.genre).toBe("Family");
    });

    test("function setMinRating(8)", () => {
        movieStore.setMinRating(8);
        expect(movieStore.minRating).toBe(8);
    });

    /*test("function clearAll()", () => {
        movieStore.setGenre("Family");
        movieStore.setMinRating(8);
        movieStore.setSearchParam("test");
        document.body.innerHTML =
            '<div id="infoText">'+
            '</div>';

        const app = App;
        app.mockImplementation(e => {
            e("test");
        });

        movieStore.clearAll();
        expect(document.body.innerHTML).toBe("test");
        expect(movieStore.genre).toBe("All");
        expect(movieStore.minRating).toBe(1);
        expect(movieStore.searchParam).toBe("");
    });*/

    test("function increaseFetchedMovies", () =>{
        movieStore.increaseFetchedMovies();
        expect(movieStore.fetchedMovies).toBe(20);
    });

    //Testing Axios
    test("function fetchMovieData", () => {

        const testAPI = {
            _id: "5b107bec1d2952d0da904a42",
            title: "'Ei se mitään!' sanoi Eemeli",
            year: 1962,
            rated: "S",
            runtime: 99,
            countries: [ ],
            genres: [
                "Comedy"
            ],
            director: "Åke Lindman",
            writers: [
                "Reino Helismaa"
            ],
            actors: [
                "Siiri Angerkoski",
                "Eemeli",
                "Paavo Hukkinen",
                "Pentti Irjala"
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
            type: "movie"
        };

        //Setting values to variables in MovieStore
        movieStore.setGenre("All genres");
        movieStore.setMinRating(1);
        movieStore.setSearchParam("");

        //Creating endpoint to our server and mocking an Axiosadapter
        const endpoint = "http://it2810-32.idi.ntnu.no:8080/movies/";
        let mock = new MockAdapter(axios);

        //Creating a variable (data), where the response is set to true
        const data = { response : true };

        //Trying to get data from our api and check whether the response is the same or not.
        mock.onGet(testAPI).reply(200, data);
        movieStore.fetchMovieData()
            .then(res => {
                expect(res).toEqual(data);
            })
    });

    test("function putMovieRating", () => {
        //Creating endpoint to our server and mocking an Axiosadapter
        const putEndpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+"testID"+'/'+5;
        let mock = new MockAdapter(axios);

        //Creating a variable (data), where the response is set to true
        const data = { response : 200 };

        //Trying to get data from our api and check whether the response is the same or not.
        mock.onPut(putEndpoint).reply(200, data);
        movieStore.putMovieRating("testID", 5)
            .then(res => {
                console.log(res);
                expect(res).toEqual(data);
            })
    });
});