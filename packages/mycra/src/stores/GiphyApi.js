/* eslint-disable react/no-access-state-in-setstate */
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const GiphyStoreContext = React.createContext();
export const GiphyStoreProvider = GiphyStoreContext.Provider;
export const GiphyStoreConsumer = GiphyStoreContext.Consumer;

export class GiphyStore extends React.Component {
  API = process.env.REACT_APP_GIPHY_URL;
  constructor(props) {
    this.state = {};
  }

  componentDidCatch(error, info) {
    console.log("try to make this an error boundary");
    console.log("error captured:", error, info);
    this.setState({ error });
  }

  loadSettings = async (param) => {};

  render() {
    return this.state.error ? (
      <span>Error</span>
    ) : (
      <GiphyStoreProvider
        value={{
          data: this.state.data,
          settings: this.state.settings,
          something: this.something,
          somethingelse: this.somethingelse,
        }}
      >
        {this.props.children}
      </GiphyStoreProvider>
    );
  }
}
