import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import MovieStore from "./stores/MovieStore";
import {Provider} from "mobx-react";

//Passing the movieStore as a prop to App by a Provider
const Root = (
    <Provider movieStore = {MovieStore}>
        <App/>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();