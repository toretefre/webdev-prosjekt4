import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieStore from "./stores/MovieStore";
import {Provider} from "mobx-react";

const Root = (
    <Provider movieStore = {MovieStore}>
        <App/>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();