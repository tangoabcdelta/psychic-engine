# What's useEffect execution order and its internal clean-up logic in react hooks?

sauce: https://stackoverflow.com/questions/53781632/whats-useeffect-execution-order-and-its-internal-clean-up-logic-in-react-hooks

According to react document, `useEffect` will trigger clean-up logic before it re-runs `useEffect` part.

> If your effect returns a function, React will run it when it is time to clean up...
>
> There is no special code for handling updates because `useEffect` handles them by default. It cleans up the previous effects before applying the next effects...

However, when I use `requestAnimationFrame` and `cancelAnimationFrame` inside `useEffect`, I found the cancelAnimationFrame may not stop the animation normally. Sometimes, I found the old animation still exists, while the next effect brings another animation, which causes my web app performance issues (especially when I need to render heavy DOM elements).

I don't know whether react hook will do some extra things before it executes the clean-up code, which make my cancel-animation part not work well, will `useEffect` hook do something like closure to lock the state variable?

What's useEffect's execution order and its internal clean-up logic? Is there something wrong the code I write below, which makes cancelAnimationFrame can't work perfectly?

Thanks.

<!-- begin snippet: js hide: false console: true babel: true -->

<!-- language: lang-js -->

    //import React, { useState, useEffect } from "react";

    const {useState, useEffect} = React;

    //import ReactDOM from "react-dom";

    function App() {
      const [startSeconds, setStartSeconds] = useState(Math.random());
      const [progress, setProgress] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setStartSeconds(Math.random());
        }, 1000);

        return () => clearInterval(interval);
      }, []);

      useEffect(
        () => {
          let raf = null;

          const onFrame = () => {
            const currentProgress = startSeconds / 120.0;
            setProgress(Math.random());
            // console.log(currentProgress);
            loopRaf();
            if (currentProgress > 100) {
              stopRaf();
            }
          };

          const loopRaf = () => {
            raf = window.requestAnimationFrame(onFrame);
            // console.log('Assigned Raf ID: ', raf);
          };

          const stopRaf = () => {
            console.log("stopped", raf);
            window.cancelAnimationFrame(raf);
          };

          loopRaf();

          return () => {
            console.log("Cleaned Raf ID: ", raf);
            // console.log('init', raf);
            // setTimeout(() => console.log("500ms later", raf), 500);
            // setTimeout(()=> console.log('5s later', raf), 5000);
            stopRaf();
          };
        },
        [startSeconds]
      );

      let t = [];
      for (let i = 0; i < 1000; i++) {
        t.push(i);
      }

      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <text>{progress}</text>
          {t.map(e => (
            <span>{progress}</span>
          ))}
        </div>
      );
    }

    ReactDOM.render(<App />,
    document.querySelector("#root"));

<!-- language: lang-html -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0-alpha.2/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0-alpha.2/umd/react-dom.production.min.js"></script>
    <div id="root"></div>

<!-- end snippet -->



Put these three lines of code in a component and you'll see their order of priority.

      useEffect(() => {
        console.log('useEffect')
        return () => {
          console.log('useEffect cleanup')
        }
      })
    
      window.requestAnimationFrame(() => console.log('requestAnimationFrame'))
    
      useLayoutEffect(() => {
        console.log('useLayoutEffect')
        return () => {
          console.log('useLayoutEffect cleanup')
        }
      })

`useLayoutEffect > requestAnimationFrame > useEffect`

The problem you're experiencing is caused by `loopRaf` requesting another animation frame before the cleanup function for `useEffect` is executed.

Further testing has shown that `useLayoutEffect` is always called before `requestAnimationFrame` and that its cleanup function is called before the next execution preventing overlaps.

> Change `useEffect` to `useLayoutEffect` and it should solve your
> problem.

`useEffect` and `useLayoutEffect` are called in the order they appear in your code for like types just like `useState` calls.

You can see this by running the following lines:

      useEffect(() => {
        console.log('useEffect-1')
      })
      useEffect(() => {
        console.log('useEffect-2')
      })
      useLayoutEffect(() => {
        console.log('useLayoutEffect-1')
      })
      useLayoutEffect(() => {
        console.log('useLayoutEffect-2')
      })






One thing that's not clear in the above answers is the order in which the effects run when you have multiple components in the mix. We've been doing work that involves coordination between a parent and it's children via useContext so the order matters more to us. `useLayoutEffect` and `useEffect` work in different ways in this regard.

`useEffect` runs the clean up and the new effect before moving to the next component (depth first) and doing the same.

`useLayoutEffect` runs the clean ups of each component (depth first), then runs the new effects of all components (depth first).


```
render parent
render a
render b
layout cleanup a
layout cleanup b
layout cleanup parent
layout effect a
layout effect b
layout effect parent
effect cleanup a
effect a
effect cleanup b
effect b
effect cleanup parent
effect parent
```

```
const Test = (props) => {
  const [s, setS] = useState(1)

  console.log(`render ${props.name}`)

  useEffect(() => {
    const name = props.name
    console.log(`effect ${props.name}`)
    return () => console.log(`effect cleanup ${name}`)
  })

  useLayoutEffect(() => {
    const name = props.name
    console.log(`layout effect ${props.name}`)
    return () => console.log(`layout cleanup ${name}`)
  })

  return (
    <>
      <button onClick={() => setS(s+1)}>update {s}</button>
      <Child name="a" />
      <Child name="b" />
    </>
  )
}

const Child = (props) => {
  console.log(`render ${props.name}`)

  useEffect(() => {
    const name = props.name
    console.log(`effect ${props.name}`)
    return () => console.log(`effect cleanup ${name}`)
  })

  useLayoutEffect(() => {
    const name = props.name
    console.log(`layout effect ${props.name}`)
    return () => console.log(`layout cleanup ${name}`)
  })

  return <></>
}
```







There are two different hooks that you would need to set your eyes on when working with hooks and trying to implement lifecycle functionalities.

As per the docs:

> `useEffect` runs after react renders your component and ensures that
> your effect callback does not block browser painting. This differs
> from the behavior in class components where `componentDidMount` and
> `componentDidUpdate` run synchronously after rendering.

 and hence using `requestAnimationFrame` in these lifecycles works seemlessly but has a slight glitch with `useEffect`. And thus useEffect should to be used to when the changes that you have to make do not block visual updates like making API calls that lead to a change in DOM after a response is received.

Another hook that is less popular but is extremely handy when dealing with visual DOM updates is `useLayoutEffect`.  **[As per the docs][1]**


> The signature is identical to useEffect, but it fires synchronously
> after all DOM mutations. Use this to read layout from the DOM and
> synchronously re-render. Updates scheduled inside `useLayoutEffect` will
> be flushed synchronously, before the browser has a chance to paint.

So, if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time that it is rendered and your effect mutates it, then **you don’t want to use `useEffect`**. You’ll want to use `useLayoutEffect`. Otherwise the user could see a flicker when your DOM mutations take effect which is exactly the case with `requestAnimationFrame`


<!-- begin snippet: js hide: false console: true babel: true -->

<!-- language: lang-js -->

    //import React, { useState, useEffect } from "react";

    const {useState, useLayoutEffect} = React;

    //import ReactDOM from "react-dom";

    function App() {
      const [startSeconds, setStartSeconds] = useState("");
      const [progress, setProgress] = useState(0);

      useLayoutEffect(() => {
        setStartSeconds(Math.random());

        const interval = setInterval(() => {
          setStartSeconds(Math.random());
        }, 1000);

        return () => clearInterval(interval);
      }, []);

      useLayoutEffect(
        () => {
          let raf = null;

          const onFrame = () => {
            const currentProgress = startSeconds / 120.0;
            setProgress(Math.random());
            // console.log(currentProgress);
            loopRaf();
            if (currentProgress > 100) {
              stopRaf();
            }
          };

          const loopRaf = () => {
            raf = window.requestAnimationFrame(onFrame);
            // console.log('Assigned Raf ID: ', raf);
          };

          const stopRaf = () => {
            console.log("stopped", raf);
            window.cancelAnimationFrame(raf);
          };

          loopRaf();

          return () => {
            console.log("Cleaned Raf ID: ", raf);
            // console.log('init', raf);
            // setTimeout(() => console.log("500ms later", raf), 500);
            // setTimeout(()=> console.log('5s later', raf), 5000);
            stopRaf();
          };
        },
        [startSeconds]
      );

      let t = [];
      for (let i = 0; i < 1000; i++) {
        t.push(i);
      }

      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <text>{progress}</text>
          {t.map(e => (
            <span>{progress}</span>
          ))}
        </div>
      );
    }

    ReactDOM.render(<App />,
    document.querySelector("#root"));




<!-- language: lang-html -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0-alpha.2/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0-alpha.2/umd/react-dom.production.min.js"></script>
    <div id="root"></div>

<!-- end snippet -->

  [1]: https://reactjs.org/docs/hooks-reference.html#uselayouteffect