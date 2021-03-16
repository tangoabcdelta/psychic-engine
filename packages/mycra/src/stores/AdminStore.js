/* eslint-disable react/no-access-state-in-setstate */
import React from "react";
import axios from "axios";

export const AdminStoreContext = React.createContext();
export const AdminStoreProvider = AdminStoreContext.Provider;
export const AdminStoreConsumer = AdminStoreContext.Consumer;

export class AdminStore extends React.Component {
  someconstant = "1";
  hostname = "https://www.example.com";

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      settings: undefined,
      something: undefined,
      somethingelse: undefined,
      error: undefined,
    };
  }

  componentDidCatch(error, info) {
    console.log("error captured:", error, info);
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
      <span>Error</span>
    ) : (
      <AdminStoreProvider
        value={{
          data: this.state.data,
          settings: this.state.settings,
          something: this.something,
          somethingelse: this.somethingelse,
        }}
      >
        {this.props.children}
      </AdminStoreProvider>
    );
  }
}
