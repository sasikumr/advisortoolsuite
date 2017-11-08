"use strict";
//import * as WeatherForecasts from './WeatherForecasts';
//import * as Counter from './Counter';
Object.defineProperty(exports, "__esModule", { value: true });
var Loader = require("./loader");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    isLoading: Loader.reducer
};
