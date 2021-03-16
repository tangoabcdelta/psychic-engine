/* eslint-disable react/no-access-state-in-setstate */
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "reactstrap";

export const TemplateStoreContext = React.createContext();
export const TemplateStoreProvider = TemplateStoreContext.Provider;
export const TemplateStoreConsumer = TemplateStoreContext.Consumer;

export class TemplateStore extends React.Component {
  define = 0;
  your = "1";
  constants = parseInt("2.0");
  here = process.env.REACT_APP_BASE_URL; // contains: "https://www.example.com";

  constructor(props) {
    this.state = {
      define: this.define,
      your: this.your,
      state: {},
      andAlso: null,
      error: undefined,
      here: this.here,
    };
  }

  componentDidCatch(error, info) {
    console.log("try to make this an error boundary");
    console.log("error captured:", error, info);
    toast.error(`error captured:${error}, ${info}`);
    this.setState({ error });
  }

  loadSettings = async (param) => {
    const { state } = this;
    const results = await axios.get(`${this.hostname}/settings/${param.id}/`);
    this.setState({ settings: results.settings });
    this.setState({
      ...state,
      ...{
        settings: results.settings,
      },
    });
  };

  loadData = async (param) => {
    const results = await axios.get(`${this.hostname}/settings/${param.id}/`);
    this.setState({ data: results.data });
  };

  loadSomethingelse = async (param1, param2) => {};

  loadSomething = async (param1, param2) => {
    const status1 = param1 ? "active" : "inactive";
    const status2 = param2 ? "active" : "inactive";
    const settings = this.state.settings;
    await axios.post(
      `${this.hostname}/${this.status1}/`,
      {},
      {
        params: {
          status1,
          status2,
          [`${settings}_name`]: status2,
        },
      }
    );
    this.setState({
      data: this.state.data.map((data) =>
        data[`${this.state.settings}_name`] === status2
          ? { ...data, status1 }
          : data
      ),
    });
  };

  render() {
    return this.state.error ? (
      <span className="d-flex justify-content-center align-items-center">
        Error
        <Spinner></Spinner>
      </span>
    ) : (
      <TemplateStoreProvider
        value={{
          data: this.state.data,
          settings: this.state.settings,
          something: this.something,
          somethingelse: this.somethingelse,
        }}
      >
        {this.props.children}
      </TemplateStoreProvider>
    );
  }
}
