import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import routes from "./config/routes";
// import ListingOfIssues from "./components/ListingOfIssues";
// import AnotherPage from "./components/AnotherPage";

function App() {
  return (
    <div className="App">
      <div>
        <p>Routes</p>
        <Navbar color="faded" light>
          <Nav navbar>
            {routes.map((route, index) => {
              return (
                <NavItem>
                  <NavLink href={route.path} title={route.name}>
                    {route.name.toUpperCase()}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Navbar>
      </div>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                {...route}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
        </Switch>

        {/* 

          <Route
            path={route.path}
            render={ListingOfIssues}
          />
          
          <Route
            path="/listing/label/:label?"
            render={(props) => <ListingOfIssues Controls {...props} />}
          /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
