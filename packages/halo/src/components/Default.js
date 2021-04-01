import logo from "../logo.svg";
import "../App.css";
import AppNav from "./AppNav";

function Home() {
  return (
    <div className="App">
      <div>
        <AppNav />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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

          <ul>
            <li>1. Listing of issues</li>
            <li>2. Pagination Controls (Server side pagination)</li>
            <li>3. Search open issues</li>
            <li>4. Issue Details page Fig (2)</li>
            <li>5. Labels Filter (Bonus feature)</li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default Home;
