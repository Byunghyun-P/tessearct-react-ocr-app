import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";

import Camera from "./Components/Camera";

import "./App.css";

const store = configureStore({ reducer });

function App() {
  return (
    <Provider store={store}>
      <Camera />
    </Provider>
  );
}

export default App;
