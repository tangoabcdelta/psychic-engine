https://bigfatsoftwareinc.wordpress.com/2020/11/05/wip-react-error-logging-with-sentry-md/


React Error and
Performance Monitoring


```bash
npm install @sentry/react
```



```js
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import App from "./App";

Sentry.init({
  dsn: "__PUBLIC_DSN__"
});

ReactDOM.render(<App />, document.getElementById("root"));
```


1. Resolve React errors with max efficiency, not max effort
2. Improve workflow with a full view of releases so you can mark errors as resolved and prioritize live issues.
3. Learn in which version a bug first appeared, merge duplicates, and know if things regress in a future release.
4. Add commit data to automatically suggest an owner of each React error and instantly send deploy emails.
