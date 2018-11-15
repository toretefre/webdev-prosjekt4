import React from 'react';
import MovieStore from "../../stores/MovieStore";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("MovieStore", () => {
    //Creating an instance of MovieStore which is being used throughout the entire test
    const movieStore = MovieStore;

    //Function to test the function setSearchParam, which is being async since it is calling fetchMovieData
    test("function setSearchParam(test)", async () =>{
        try{
            await movieStore.setSearchParam("test");
        } catch (e) {
            throw e;
        }
        expect(movieStore.searchParam).toBe("test");
    });

    //Function to test the function setExpandMovie when the value is true
    test("function setExpandMovie(true)", () => {
        movieStore.setExpandMovie(true);
        expect(movieStore.expandMovie).toBeTruthy();
    });

    //Function to test the function setExpandMovie when the value is false
    test("function setExpandMovie(false)", () => {
        movieStore.setExpandMovie(false);
        expect(movieStore.expandMovie).toBeFalsy();
    });

    //Function to test the function setGenre, which is being async since it is calling fetchMovieData
    test("function setGenre('Family')", async () => {
        try{
            await movieStore.setGenre("Family");
        } catch (e) {
            throw e;
        }
        expect(movieStore.genre).toBe("Family");
    });

    //Function to test the function setMinRating, which is being async since it is calling fetchMovieData
    test("function setMinRating(8)", async () => {
        try{
            await movieStore.setMinRating(8);
        } catch (e) {
            throw e;
        }
        expect(movieStore.minRating).toBe(8);
    });

    //Function to test the function clearAll, which is being async since it is calling fetchMovieData
    //Setting the variables in MovieStore first to check if they are cleared afterwards.
    test("function clearAll()", async () => {
        try{
            await movieStore.setGenre("Family");
            await movieStore.setMinRating(8);
            await movieStore.setSearchParam("test");
            await movieStore.clearAll();
        } catch (e) {
            throw e;
        }

        expect(movieStore.genre).toBe("All genres");
        expect(movieStore.minRating).toBe(1);
        expect(movieStore.searchParam).toBe("");
    });

    //Function to test the function increaseFetchedMovies, which is being async since it is calling fetchMovieData
    //Increasing the value of fetchMovies to 20
    test("function increaseFetchedMovies", async () =>{
        try{
            await movieStore.increaseFetchedMovies();
        } catch (e) {
            throw e;
        }
        expect(movieStore.fetchedMovies).toBe(20);
    });

    //---------------------------------------//
    //-------------Testing Axios-------------//

    test("function fetchMovieData", async () => {
        //--------------------------------------------------------------------------------------------//
        //Setting values to variables in MovieStore to ensure the endpoint is correct for testing
        try{
            await movieStore.setGenre("All genres");
            await movieStore.setMinRating(1);
            await movieStore.setSearchParam("testtest");
            movieStore.fetchedMovies = 20;
            await movieStore.setSortValue("Title");
            movieStore.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'
                + movieStore.searchParam
                + "?startindex=" + movieStore.fetchedMovies
                + '&threshold=' + movieStore.minRating
                + '&sort=' + movieStore.sortValue;
        } catch (e) {
            throw e;
        }
        //--------------------------------------------------------------------------------------------//
        //Mocking an Axiosadapter
        const mock = new MockAdapter(axios);

        //Creating testData, which exists in the database to have something to compare the resultset retrieved from Axios
        const testData = {
            _id: "5bed81a049be63e27ce07509",
            title: "testtest",
        };

        //Mocking Axios
        mock.onGet(movieStore.endpoint)
            .reply(200, testData);

        //Triggering fetchMovieData in MovieStore.js
        try{
            await movieStore.fetchMovieData();
        } catch (e) {
            throw e;
        }

        //Expecting the @observable this.movies' title to equal the title in the testdata.
        movieStore.movies.map(movie => {
            expect(movie.title).toEqual(testData.title);
        })
    });

    test("function putMovieRating", async () => {
        //--------------------------------------------------------------------------------------------//
        //Setting values to variables in MovieStore to ensure the endpoint is correct for testing
        try{
            await movieStore.setGenre("All genres");
            await movieStore.setMinRating(1);
            await movieStore.setSearchParam("testtest");
            movieStore.fetchedMovies = 20;
            await movieStore.setSortValue("Title");
            movieStore.endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'
                + movieStore.searchParam
                + "?startindex=" + movieStore.fetchedMovies
                + '&threshold=' + movieStore.minRating
                + '&sort=' + movieStore.sortValue;
        } catch (e) {
            throw e;
        }
        //--------------------------------------------------------------------------------------------//
        //Mocking an Axiosadapter
        const mock = new MockAdapter(axios);

        //Creating testData, which exists in the database to have something to compare the resultset retrieved from Axios
        const testData = {
            _id: "5bed81a049be63e27ce07509",
            title: "testtest",
            ratings: 5,
        };

        //Mocking Axios (put)
        mock.onPut(movieStore.putEndpoint)
            .reply(200, testData);

        //Triggering putMovieRating in MovieStore.js with the given parameters to put the rating into the testmovie
        try{
            await movieStore.putMovieRating("5bed81a049be63e27ce07509", 5);
        } catch (e) {
            throw e;
        }

        //Mocking Axios (get)
        mock.onGet(movieStore.endpoint)
            .reply(200, testData);

        //Triggering fetchMovieData in MovieStore.js to check if the rating actually was put into the database
        try{
            await movieStore.fetchMovieData();
        } catch (e) {
            throw e;
        }

        //Expecting the @observable this.movies' rating to equal the title in the testdata.
        movieStore.movies.map(movie => {
            if(movie.ratings !== undefined){
                expect(movie.ratings).toEqual(testData.ratings);
            }
        })
    });

    //---------------------------------------//
});