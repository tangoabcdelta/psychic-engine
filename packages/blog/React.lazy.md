```js

import React, { Suspense, useEffect, useState } from 'react';


let MyComponent;

const WrapperComponent = (props) => {
  const [shouldLazyLoadComponent, loadComponent] = useState(false);

  const onButtonClick = () => {
    // .. do some bizniss here
    loadComponent(true);
    /* eslint-disable import/first */
    MyComponent = React.lazy(() => import('./heavyComponent'));
  }

  useEffect(() => {
        setTimeout(() => load(true), 5000);
    }, []);

  return (
    <div>
      <h3>Lazy Loading</h3>
      <button onClick={onButtonClick}>LOAD</button>
      <Suspense fallback={'loading...'}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
```


You can create a different component to handle the state and add an if statement in that component to handle the view that you want to render.

You can see the example here [codesandbox.io/embed/6wx2rzjrr3][1]

App.js

```js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import View1 from "./View1";
import View2 from "./View2";

import "./styles.css";

class App extends Component {
  state = {
    renderView: 0
  };

  clickBtn = e => {
    this.setState({
      renderView: +e.target.value
    });
  };

  render() {
    switch (this.state.renderView) {
      case 1:
        return <View1 />;
      case 2:
        return <View2 />;
      default:
        return <Main clickBtn={this.clickBtn} />;
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```


Main.js

    import React from "react";
    
    export default props => (
      <>
        Main view{" "}
        <button value={1} onClick={props.clickBtn}>
          View 1
        </button>{" "}
        <button value={2} onClick={props.clickBtn}>
          View 2
        </button>{" "}
      </>
    );

View1.js

    import React from "react";
    
    export default props => "View 1";

View2.js

    import React from "react";
    
    export default props => "View 2";


  [1]: https://codesandbox.io/embed/6wx2rzjrr3




```js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Spinner } from 'reactstrap';
import Main from "./Main";
import View1 from "./View1";
import View2 from "./View2";

import "./styles.css";


const View1 = (props) => {
  const LazyView = React.lazy(() => import('./View1'));
  return (
    <Suspense fallback={<Spinner />}>
      <LazyView />
    </Suspense>
  );
}



class App extends Component {
  state = {
    renderView: 0
  };

  clickBtn = e => {
    this.setState({
      renderView: +e.target.value
    });
  };

  render() {
    switch (this.state.renderView) {
      case 1:
        return <View1 />;
      case 2:
        return <View2 />;
      default:
        return <Main clickBtn={this.clickBtn} />;
    }
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


function LazyComponentFactory(path, preload: boolean) {
  const factory = () => import(path);
  const Component = React.lazy();

  preload ? Component.preload = factory : React.noop();
  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  );
}
```



































https://medium.com/@MCapoz/how-to-use-react-lazy-6ff434aeed51
Mae Capozzi
Oct 29, 2018·4 min read


# React.lazy



Anton Korzunov
@theKashey
·
Oct 26, 2018


Replying to @MCapoz and @TheLarkInn


What’s the difference from react-loadable, loadable-components, react-universal-component, and so and so and so?
Sean Thomas Larkin 廖肖恩


@TheLarkInn
Well lazy() let's you not need a separate library to have easy code splitting.
It's now out of the box through React.lazy.
What loadable-component and react-universal-component do in addition handle some SSR stuff.
They should also just use the lazy() API instead internally.




New React.lazy API in 60 seconds (Code-Splitting with Suspense)
https://www.youtube.com/watch?v=-gJ29DMkqo0


```js
import React, { PureComponent, Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}


```

When the user clicks to interact with that component for the first time
﻿


Deferring load of that component until the browser triggers the `requestIdleCallback`.
