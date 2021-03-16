import React from "react";
import logo from "../logo.svg";
import "../App.css";
import constants from "../config/constants";
import { renderObject } from "../config/utils";

const MarkUp = (props) => {
  return (
    <span style={{ wordWrap: "break-word" }}>{`${props.key}: ${value}`}</span>
  );
};

const F = () => {
  return (
    <React.Fragment>
      <code>process.env.NODE_ENV: {process.env.NODE_ENV}</code>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <p style={{ wordBreak: "break-all" }}>
          {JSON.stringify(process.env)}

          {renderObject(process.env, MarkUp)}
        </p>
      </div>
    </React.Fragment>
  );
};

function Home() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <F />
        </header>
      </div>
    </React.Fragment>
  );
}

export default Home;
