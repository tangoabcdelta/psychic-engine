import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import routes from "./config/routes";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" render={(props) => <Home {...props} />} /> */}
          {routes.map((route, index) => {
            const { component } = route;
            console.log(component);
            return (
              <Route
                key={index}
                path={route.path}
                {...route}
                render={(props) => {
                  return <component {...props} />;
                }}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
