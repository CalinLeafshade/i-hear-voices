import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import App from "./App";

import "normalize.css";
import "roboto-fontface";
import "./index.css";

const theme = {
  darkGrey: "#333",
  lightGrey: "#999"
};

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
