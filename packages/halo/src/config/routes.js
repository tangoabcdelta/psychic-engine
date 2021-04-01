import ListingOfIssues from "../components/ListingOfIssues";
import AnotherPage from "../components/AnotherPage";
import Home from "../components/Home";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "ListingOfIssues",
    component: ListingOfIssues,
    path: "/listing?",
  },
  {
    name: "AnotherPage",
    component: AnotherPage,
    path: "/another?",
  },
  ,
];

export default routes;
