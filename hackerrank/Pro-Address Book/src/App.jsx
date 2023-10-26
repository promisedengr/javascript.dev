import React from "react";
import { Provider } from "react-redux";

import AddressBook from "./AddressBook";

import "./App.css";

export const App = ({ reduxStore }) => (
  <Provider store={reduxStore}>
    <main className="App">
      <AddressBook />
    </main>
  </Provider>
);
