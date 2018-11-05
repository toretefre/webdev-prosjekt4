import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import './App.css';

@inject('movieStore')
@observer
class App extends Component {
    constructor(props){
        super(props);
        let inputText = "";
    }

    handleOnChange = (text) => {
        this.props.movieStore.addMovieToList();
        this.props.movieStore.findMovie(document.getElementById("inputTest").value);
    };
    render() {
        return (
        <React.Fragment>
            {/*<input className="inputTest" id="inputTest" type="text" onChange={(text) => this.handleOnChange(text)}/>*/}


        </React.Fragment>
    );
  }
}

export default App;