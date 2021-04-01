import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import routes from "../config/routes";
import { Link } from "react-router-dom";

function AppNav() {
  return (
    <Navbar color="faded" light>
      <Nav navbar>
        <NavItem>
          <p>Routes</p>
        </NavItem>
        {routes.map((route, index) => {
          return (
            <NavItem key={index}>
              <Link to={route.path}>{route.name}</Link> {"---------"}
              <NavLink href={route.path} title={route.name}>
                {route.name.toUpperCase()}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </Navbar>
  );
}

export default AppNav;
