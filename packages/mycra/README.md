# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was deployed on netlify at [hopeful-hawking-554179](https://hopeful-hawking-554179.netlify.app)

## Release

### Step 0: Adhere to conventional commit standards

- https://www.conventionalcommits.org/en/v1.0.0/
- **summary:** https://www.conventionalcommits.org/en/v1.0.0/#summary

The commit message should be structured as follows:

    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]

**Type:**

    build:
    chore:
    ci:
    docs:
    style:
    refactor:
    perf:
    test:
    feat:
    fix:
    BREAKING CHANGE: !

**Examples:**

    feat: allow provided config object to extend other configs
    BREAKING CHANGE: `extends` key in config file is now used for extending other config files

### Step 1: Create a changelog

Run `yarn changelog`

    yarn changelog
    # should generate a file akin to `changelog.v0.1.6.md`
    # follows the template contained within the `scripts` folder
    # has a dev dependency: `git-release-notes`

### Step 2: Create <patch | minor | major> releases:

- Run `npm version <insert type of change>`
- The type of change can be any from these: `patch`, `minor`, `major`
- It'll obey the sem-ver and it will bump the number accordingly

  npm version patch
  npm version minor
  npm version major

#### Create an annotated tag in git:

To create an annotated tag in git run the following command in terminal:

    git tag -a v1.0.1 -m "31st December, 2020 Release"
    # to push all tags
    git push origin --tags

    # to push a single tag
    git push origin <tag>

#### Count Lines of code

    cloc $(git ls-files)

    # or
    cloc . --exclude-dir=node_modules --exclude-ext=JSON

    # to save the output in a file
    cloc . --exclude-dir=node_modules --exclude-ext=JSON --out=results.txt

## Generate Dependency Graph

- Install the pre-requisites

```bash
sudo apt install graphviz
yarn add -D dependency-cruiser@9.23.1
```

- Run `yarn deps`
- It'll run `depcruise --exclude "^node_modules" --output-type dot src | dot -T svg > dependencygraph.$(git describe --tags --abbrev=0).svg` under the hood
- Commit the `dependencygraph.vx.x.x` file

## ESLint

To get started with `eslint`, do the following:

```bash
./node_modules/.bin/eslint --init
```

## Node Sass problems

Node Sass = Pain in the \*ss.

### To deal with the node-sass issues

You can watch individual files or directories with the --watch flag.
The watch flag tells Sass to watch your source files for changes.
And re-compile CSS each time you save your Sass.
If you wanted to watch (instead of manually build) your `input.scss` file,
you'd just add the watch flag to your command, like so:

```bash
# syntax:sass --watch src/assets/scss/argon-design-system/:src/assets/css/argon-design-system/
# sass --watch input.scss output.css

sass --watch src/assets/scss/argon-design-system/nav.scss src/assets/css/argon-design-system/nav.css
```

You can watch and output to directories by using folder paths as your input and output, and separating them with a colon.
In this example:

```bash
sass --watch app/sass:public/stylesheets
sass --watch src/assets/scss/argon-design-system/:src/assets/css/argon-design-system/

# now that the file has been moved
# do this

sass --watch .scss/:src/assets/css/argon-design-system/

```

## Absolute Imports Enabled

rootdir set by using: `jsconfig.json`
`rootdir`: `src`
`sample`: `src/assets/scss/argon-design-system/input-group.scss`

You can configure your application to support importing modules using absolute paths. This can be done by configuring a jsconfig.json or tsconfig.json file in the root of your project. If you're using TypeScript in your project, you will already have a tsconfig.json file.

Below is an example `jsconfig.json` file for a JavaScript project. You can create the file if it doesn't already exist:
https://create-react-app.dev/docs/importing-a-component/#absolute-imports

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

If you're using TypeScript, you can configure the baseUrl setting inside the compilerOptions of your project's tsconfig.json file.

Now that you've configured your project to support absolute imports, if you want to import a module located at src/components/Button.js, you can import the module like so:

```js
import Button from "components/Button";
```

For more information on these configuration files, see the jsconfig.json reference and tsconfig.json reference documentation.

### Issues with Create-React-App

The default webpack configuration can not be altered.
So, you must use `https://github.com/timarney/react-app-rewired`
This helps you alter the configuration without needing to `eject` the code.

#### `[object Module]` instead of image links after Webpack processing

It's because the asset urls with require statements expect CommonJS modules.
While the recent major release of url-loader or file-loaders generates ES modules by default.

`<img src="[object Module]" alt=""/>`

**Solution:**

- Set `esModule: false` option for `file-loader`.
- Update `style-loader` to latest version

If you use `file-loader`, upgrade it to 6.0.0 version and specify esModule: false in options:
And enable the common js format just for Images

```js

{
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        outputPath: 'static/img',
        esModule: false // <- here
      }
    }
  ]
}
```

**Instructions to Disable / Enable `esModule`:**

By default, file-loader generates JS modules that use the ES modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of module concatenation and tree shaking.

**Read More:**
https://github.com/webpack-contrib/file-loader#esmodule

Type:
`Boolean`

Default:
`true`

If you want to enable a `CommonJS` module syntax, then use the following in your `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Upgrade

To upgrade to a newer version of `create-react-app` library you need to update the `react-scripts` module to the latest version.
You've to be careful about the incoming breaking changes before upgrading.

Run:

    yarn upgrade --latest react-scripts

Rebuild your app after installation.
Look for breaking changes.
Sauce: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases

### Monitor CPU Usage

Sauce: https://www.npmjs.com/package/os-utils

Sample Usage:

```js
var os = require("os-utils");
os.cpuUsage(function (v) {
  console.log("CPU Usage (%): " + v);
});
```

API:

```js
os.cpuUsage(callback);
os.cpuFree(callback);
os.countCPUs(); // Get number of CPU
os.platform(); // Get the platform name
os.freemem(); // Get current free memory
os.totalmem(); // Get total memory
os.freememPercentage(); // Get a percentage reporesentinf the free memory
os.sysUptime(); // Get the number of miliseconds that the system has been running for.
os.processUptime(); // Get the number of miliseconds that the process has been running for.
os.loadavg(1); // Get average load for the 1, 5 or 15 minutes
os.loadavg(5); // Get average load for the 1, 5 or 15 minutes
os.loadavg(15); // Get average load for the 1, 5 or 15 minutes
```

## Environment Variables and Configurations

### Install `env-cmd`

Ideally, in a CRA, you should use the built-in `dot-env` configuration picker. `env-cmd` is another suitable alternative for this exact purpose.

Notice the folder location differences before applying

```json
{
  ...
  "scripts": {
    ...
    "start": "env-cmd -f environments/.env.dev react-scripts start",
    "build-uat": "env-cmd -f environments/.env.uat react-scripts build",
    "build-qa": "env-cmd -f environments/.env.qa react-scripts build",
    "build-dev": "env-cmd -f environments/.env.dev react-scripts build",
    "build-prod": "env-cmd -f environments/.env.prod react-scripts build"
  ...
  }
  ...
}
```

## Coding

#### htmltojsx

https://magic.reactjs.net/htmltojsx.htm

## VSCode Configurations

### Current list of Installed extensions

- CoenraadS.bracket-pair-colorizer
- dsznajder.es7-react-js-snippets
- eamodio.gitlens
- Gigabyte-Giant.vscode-file-header-comment-helper
- hollowtree.vue-snippets
- jcbuisson.vue
- johnpapa.Angular2
- johnpapa.vscode-peacock
- kiteco.kite
- ms-azuretools.vscode-docker
- ms-python.python
- ms-toolsai.jupyter
- msjsdiag.debugger-for-chrome
- ritwickdey.live-sass
- ritwickdey.LiveServer
- shd101wyy.markdown-preview-enhanced
- silvenon.mdx
- stevencl.addDocComments
- svipas.prettier-plus
- WallabyJs.quokka-vscode

#### How to Export all extensions into the clipboard

1. https://github.com/kentcdodds/ama/issues/406
1. https://www.youtube.com/watch?v=LdF2RcelRg0

##### The Easy (and recommended way)

    code --list-extensions

Want more?
Export of your configuration and extensions
And Copy-Paste the echo output to machine B

    #Unix:
    code --list-extensions | xargs -L 1 echo code --install-extension

    #Windows (PowerShell, e. g. using Visual Studio Code's integrated Terminal):
    code --list-extensions | % { "code --install-extension $_" }

    # store in a string all installation commands for each plugin.
    cmd=${cat vscode-extensions | xargs -L 1 echo code --install-extension}

    # run the commands
    echo 'installing extensions'; eval cmd

##### The Hard Way

- Install Quokka.js
- Run the following to generate alist:

```js
const { execSync, spawn } = require("child_process");

const result = execSync("code --list-extensions");

const list = String(result)
  .split("\n")
  .filter(Boolean)
  .map(
    (x) => `- [${x}](https://marketplace.visualstudio.com/items?itemName=${x})`
  )
  .join("\n");

const proc = spawn("pbcopy");
proc.stdin.write(list);
proc.stdin.end();
```

I just load that up in a Quokka buffer​​​​ and it's just waiting in my clipboard.

And here's my config because someone asked me once:

## Ubuntu Starter Pack

```bash
# for all sound related
sudo apt-get install ffmpeg

```

## State Management Libraries

## APIs

### Apollo State Management library

https://www.youtube.com/results?search_query=apollo+state+management+react
https://www.youtube.com/watch?v=N2q-ZYuQWI8

### Giphy

- GraphQL wrapper around Giphy's API.

  - https://github.com/galnir/giphy-graphql

- https://github.com/lakshmistrom/Giphy-App
- https://github.com/kushthaker/giphy-app
- https://github.com/kushthaker/giphy-app/blob/master/searchResults.html
- https://github.com/kushthaker/giphy-app/blob/master/js/apiService.js
- https://github.com/kushthaker/giphy-app/blob/master/js/app.js
- https://github.com/kushthaker/giphy-app/blob/master/js/apiService.js
- https://github.com/denisura/giphy
-

### Inspirations

- https://www.speakpipe.com/voice-recorder?rf=https%3A%2F%2Fwww.speakpipe.com%2Fvoice-recorder
- https://www.google.com/search?q=recording+audio+on+the+web&oq=recording+audio+on+the+web&aqs=chrome..69i57j0i22i30i457j0i22i30l6.5372j0j7&sourceid=chrome&ie=UTF-8
- https://www.dynamsoft.com/codepool/capture-record-audio-html5.html
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
- https://mdn.github.io/web-dictaphone/
- https://github.com/mdn/web-dictaphone
- https://github.com/mdn/web-dictaphone/blob/28f4bea6994f2f7b74317144659ad02161015ab4/scripts/app.js#L26

## Using Experimental Properties

### Using Babel

##### Example

Below is a class with four class properties which will be transformed.

```js
class Bork {
  //Property initializer syntax
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  };

  //Static class properties
  static staticProperty = "babelIsCool";
  static staticFunction = function () {
    return Bork.staticProperty;
  };
}

let myBork = new Bork();

//Property initializers are not on the prototype.
console.log(myBork.__proto__.boundFunction); // > undefined

//Bound functions are bound to the class instance.
console.log(myBork.boundFunction.call(undefined)); // > "bork"

//Static function exists on the class.
console.log(Bork.staticFunction()); // > "babelIsCool"
```

##### Plugin installation and Usage

```json
{
  "plugins": [["@babel/plugin-proposal-class-properties", { "loose": true }]]
}
```

Without `{ "loose": true }`, the above code will compile to the following, using `Object.defineProperty`
This compilation process does what the browser engine does anyway - it's de-sugaring we are talking about.
The class is syntactic sugar anyway.
Internally they are still functions.

```js
class Bork {
  static a = "foo";
  static b;

  x = "bar";
  y;
}
```

```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, "x", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "bar",
  });
  Object.defineProperty(this, "y", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo",
});
Object.defineProperty(Bork, "b", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
});
```

## Production

#### Best practices and utilities for building a production site or application.

```js
 |- webpack.config.js
 |- webpack.common.js
 |- webpack.dev.js
 |- webpack.prod.js
```

## Origin:

git@github.com:tangoabcdelta/shiny-guide.git

## Quick Links:

- https://stackoverflow.com/questions/59786811/typewriter-effect-in-react
  - https://codesandbox.io/s/boring-greider-824nd
  - https://github.com/TaylorBriggs/react-native-typewriter
  - https://github.com/ianbjorndilling/react-typewriter
  - https://www.npmjs.com/package/typewriter-effect
  - https://pard0x.dev/

#### The Hotwire website

- https://twitter.com/dhh/status/1341420143239450624?s=20
  - https://github.com/hotwired/hotwire-site

* https://web.dev/web-otp/
* https://medium.com/oyotech/implementing-automatic-sms-verification-for-websites-oyo-9375feba0749

#### Webpack

- https://webpack.js.org/guides/tree-shaking/

- https://webpack.js.org/guides/production/

```json
 |- webpack-merge
 |- webpack.config.js
 |- webpack.common.js
 |- webpack.dev.js
 |- webpack.prod.js
```

#### usefetch hooks

- https://github.com/ava/use-http#usefetch

### Examples

```js
const [value, setValueAndReRender] = React.useState("initial value");
function usePersistentValue(initialValue) {
  return React.useState({
    current: initialValue,
  })[0];
}
JS Tip - React’s useRef Hook
The marketing pitch for React.useState is that it allows you to add state to function components. This is true, but we can break it down even further. Fundamentally, the useState Hook gives you two things - a value that will persist across renders and an API to update that value and trigger a re-render.

const [value, setValueAndReRender] = React.useState(

  'initial value'

)

When building UI, both are necessary. Without the ability to persist the value across renders, you’d lose the ability to have dynamic data in your app. Without the ability to update the value and trigger a re-render, the UI would never update.

Now, what if you had a use case where you weren’t dealing with any UI, so you didn’t care about re-rendering, but you did need to persist a value across renders? In this scenario, it’s like you need the half of useState that lets you persist a value across renders but not the other half that triggers a re-render — Something like this.

function usePersistentValue (initialValue) {

  return React.useState({

    current: initialValue

  })[0]

}

Spoiler alert, the functionality of our custom usePersistentValue Hook is very similar to the built-in React.useRef Hook.

If you want to add state to your component that persists across renders and can trigger a re-render when it’s updated, go with useState (or useReducer). If you want to add state to your component that persists across renders but doesn’t trigger a re-render when it’s updated, go with useRef.

For more info on useRef (and a deeper explanation of how useState is similar to useRef), visit Understanding React’s useRef Hook
```

## Pre-deployment activities

-

- Use `husky` to enable pre-commit hooks which will prevent a developer to commit code into the directory
  - This can be used to enforce `.eslint` rules
  - This can also be used to run unit tests
