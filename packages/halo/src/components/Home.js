import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Jumbotron,
  Container,
} from "reactstrap";
// import angular from "../fixtures/angular.json";
// import issues from "../fixtures/issues.json";

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoData: [],
      issuesData: [],
    };
  }

  componentDidMount() {
    this.loadAPI();
    this.loadIssues();
  }

  loadAPI = async () => {
    const data = await import("../fixtures/angular.json");
    // fetch("https://api.github.com/repos/angular/angular")

    this.setState({
      repoData: data,
    });
  };

  search(value) {
    console.log(value);
    // console.log(encodeURIComponent(value));
    // encodeURIComponent("GitHub Octocat in:readme user:defunkt");

    let str = `${encodeURIComponent(
      value
    )} repo:angular/angular/node+type:issue+state:open`;

    // this.loadIssues(str, 10, 1);
    this.debouncedLoadIssues(str, 10, 1);
    this.setState();
  }

  loadIssues = async (
    str = "repo:angular/angular/node+type:issue+state:open",
    per_page = 10,
    page = 1
  ) => {
    console.log("Incoming", str, per_page, page); //able to receive inputs

    const issuesData = await import("../fixtures/issues.json");
    // const issuesData = await fetch(
    //   `https://api.github.com/search/issues?q=${str}&per_page=${per_page}&page=${page}`
    // )
    console.log(issuesData);
    this.setState({
      issuesData,
    });
  };

  debouncedLoadIssues = debounce(this.loadIssues, 600);

  getPagination = ({ total_count }) => {
    if (total_count) {
      return new Array(total_count).fill(0).map((num, index) => {
        if (index < 4) {
          return (
            <PaginationItem active>
              <PaginationLink
                // last
                href="#"
                onClick={() => {
                  this.loadIssues(10, index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        }
        if (index > total_count - 6) {
          return (
            <PaginationItem active>
              <PaginationLink
                href="#"
                // first
                onClick={() => {
                  this.loadIssues(10, index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        }
        if (index == 5) {
          return "...";
        } else {
          return;
        }
      });
    } else return <></>;
  };

  getMarkupForIssueList(data) {
    if (data && data.items) {
      const { items } = data;
      const pagination = this.getPagination(data);
      const issues = items.map((item, index) => {
        let {
          url,
          title,
          number,
          node_id,
          labels_url,
          comments_url,
          events_url,
          user: { login, avatar_url },
        } = item;
        return (
          <div key={index}>
            <div>{node_id}</div>
            <a href={url}>go</a>
            <div>{title}</div>
            <hr />
          </div>
        );
      });

      return (
        <>
          {issues}
          <Pagination>{pagination}</Pagination>
        </>
      );
    } else return <></>;
  }

  getMarkup(data) {
    if (data && data.owner) {
      const {
        id,
        name,
        full_name,
        description,
        owner: { login, avatar_url, gists_url },
        homepage,
        url,
        issues_url,
      } = data;
      return (
        <>
          <div></div>

          <div>{login}</div>

          <div>
            url:
            <a href={url}>{full_name}</a>
            <br />
            <br />
            <a href={issues_url}>issues</a>
          </div>

          <div>
            <Jumbotron fluid>
              <Container fluid>
                <Card body>
                  <CardImg top width="100" src={avatar_url} alt={full_name} />
                  <CardBody>
                    <CardTitle tag="h5">
                      {name} <div>{id}</div>
                    </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      <div>{homepage}</div>
                    </CardSubtitle>
                    <CardText>{description}</CardText>
                    <a href={gists_url}>
                      <Button>gists</Button>
                    </a>
                  </CardBody>
                </Card>
              </Container>
            </Jumbotron>
          </div>
        </>
      );
    } else return <></>;
  }

  render() {
    let markup = this.getMarkup(this.state.repoData);
    let markup2 = this.getMarkupForIssueList(this.state.issuesData);
    return (
      <Container>
        <div>{markup}</div>

        <hr />
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => {
            this.search(e.target.value);
          }}
        />
        <hr />
        <div>{markup2}</div>
      </Container>
    );
  }
}

export default Home;
