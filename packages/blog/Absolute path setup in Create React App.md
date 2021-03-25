# Absolute path setup in Create React App

Inspirations:
- Configuring React Absolute Imports For TypeScript
  - https://justinnoel.dev/2019/06/18/configuring-react-absolute-imports-for-typescript/
- 



## `jsconfig.json`
You can configure your application to support importing modules using absolute paths. This can be done by configuring a jsconfig.json or tsconfig.json file in the root of your project. If you're using TypeScript in your project, you will already have a tsconfig.json file.

Below is an example jsconfig.json file for a JavaScript project. You can create the file if it doesn't already exist:

{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
If you're using TypeScript, you can configure the baseUrl setting inside the compilerOptions of your project's tsconfig.json file.

Now that you've configured your project to support absolute imports, if you want to import a module located at src/components/Button.js, you can import the module like so:

import Button from 'components/Button';
For more information on these configuration files, see the jsconfig.json reference and tsconfig.json reference documentation.
https://create-react-app.dev/docs/importing-a-component/#absolute-imports


## Use TypeScript

In CRA that uses TypeScript, the `tsconfig.json` file can be modified to make absolute paths work:

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

### To fix subsequent issues with Visual Studio Code
- open settings
- search for "import module specifier"
- You'll find one for `TypeScript > Preferences > Import Module Specifier`.
- Change this setting to `Auto` or `Non-relative`

Visual Studio Code will now understand how to import modules based on your `tsconfig.json` file.
You may need to close and reopen the IDE again for it to take effect.

### To fix subsequent issues with Visual Studio Code
In your `jest.config.js` file, do this:
```json
const path = require("path");

module.exports = {
  ...
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
};
```




## Use `NODE_PATH=src` 

This is annoying:`import MyButton from ../../components/Button/MyButton.jsx`
This is better: `import Button from 'components/Button/MyButton.jsx`
The 2nd one saves timet too.
You won't have to calculate the path manually.

NOTE: I haven't tested this so let me know if it doesn't work.

If you don't already have one, add a .env file to your working directory. In it add:

NODE_PATH=/src
To read more about it, see : https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d





## Rewire

https://github.com/facebook/create-react-app/issues/4336

transitive-bullshit commented on 22 Apr 2018 • 
This is meant as a follow-up to #3596, as I'm testing out the newest CRA alpha react-scripts 2.0.0-next.66cc7a90.

The new CRA has solved several of my common reasons for having to use react-app-rewired, but there are a few pain points that remain.

One of them is adding the top-level src to the webpack resolve path so all components can import paths relative to the src root as opposed to relative to the file itself. I find this to be cleaner and more descriptive. E.g., this:

import Foo from 'components/Foo'
import Bar from 'store/Bar'
import Util from 'lib/Util'
instead of

import Foo from '../Foo'
import Bar from '../../store/Bar'
import Util from '../../lib/Util'
I generally accomplish this via react-app-rewired:

module.exports = (config, env) => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)

  return config
}
But I figure this has to be a pretty common practice, and I don't really see any downsides to allowing this in the base CRA webpack config, so I thought I'd suggest it as a very minor change for CRA@next.

I know the current suggestion is to add NODE_PATH=src to .env (#3596) with #1333 tracking a more permanent solution, but as of the latest alpha, this functionality is still not working.

To be clear, I generally add this via react-app-rewired because relying on .env which I've relegated to containing secrets means that the project will no longer "just work" for other devs out of the box.


