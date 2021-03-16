### Adding custom Typescript type declaration for a node module in Create React App

I am struggling to add a type declaration for `react-load-script` within a Create React App application.

Within the `src` folder, I created a `react-load-script.d.ts` file and added the following:

    // Type definitions for React Load Script

    declare module 'react-load-script' {
      import * as React from 'react'
      interface Script {
        url: string
      }
    }

With the above I am getting the error:

> JSX element type 'Script' does not have any construct or call
> signatures.

Where am I going wrong? This is the module: https://github.com/blueberryapps/react-load-script

This is my current use of it within the app:

    <Script url="https://maps.googleapis.com/maps/api/js?                               key=your_api_key&libraries=places"
        />

I also need to add types for the onLoad:

    <Script url="https://maps.googleapis.com/maps/api/js?                               key=your_api_key&libraries=places"
          onLoad={this.handleScriptLoad}
        />

Thanks so much.

**Update from comments**

I moved and renamed the declaration file to `/@types/react-load-script/index.d.ts`

In `tsconfig.json` I added the following to `compilerOptions`:

`"typeRoots": ["./node_modules/@types", "./@types"]`

This is the `index.d.ts` entire contents:

    // Type definitions for React Load Script
    import React from 'react'

    export interface ScriptProps {
      url: string
      onLoad: () => void
      // etc...
    }

    export default class Script extends React.Component<ScriptProps> {}

With this I am still getting the error:

> Could not find a declaration file for module 'react-load-script'.
> '/Users/sb/git/fl-app/node_modules/react-load-script/lib/index.js'
> implicitly has an 'any' type.

---

It's because `Script` is the component, but your interface define its `props`.

Following the lib [sources](https://github.com/blueberryapps/react-load-script/blob/master/src/index.jsx), you may have to do:

```typescript
export interface ScriptProps {
  url: string;
  onLoad: () => void;
  // etc...
}

export default class Script extends React.Component<ScriptProps> {}
```

---

**Edit after comments**

Your types concerns a third-party _module_. You have to advise Typescript about it. For that you'll encapsulate your types in a module declaration, like that:

```typescript
// index.d.ts
declare module "react-load-script" {
  // imports here...

  export interface ScriptProps {
    url: string;
    onLoad: () => void;
    // etc...
  }

  export default class Script extends React.Component<ScriptProps> {}
}
```

### Cannot use JSX unless the '--jsx' flag is provided

I have looked around a bit for a solution to this problem. All of them suggest adding `"jsx": "react"` to your tsconfig.json file. Which I have done. Another one was to add `"include: []"`, which I have also done. However, I am still getting the error when I am trying to edit `.tsx`files. Below is my tsconfig file.

    {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es5",
            "allowJs": true,
            "checkJs": false,
            "jsx": "react",
            "outDir": "./build",
            "rootDir": "./lib",
            "removeComments": true,
            "noEmit": true,
            "pretty": true,
            "skipLibCheck": true,
            "strict": true,
            "moduleResolution": "node",
            "esModuleInterop": true
        },
        "include": [
            "./lib/**/*"
        ],
        "exclude": [
            "node_modules"
        ]
    }

Any suggestions would be helpful. I am using babel 7 to compile all the code with the env, react and typescript presets. If you guys need more files to help debug this, let me know.

---

The problem is VSCode using an older version of typescript (4.0.3), while the typescript version shipped with the project is (4.1.2).
If you are seeing this issue after running create-react-app with Typescript You can solve this problem by adding `"typescript.tsdk": "node_modules/typescript/lib"` to `.vscode/settings.json`.

For IntelliSense, if you use `"jsx": "react-jsx"` you need to switch your workspace to use TS 4.1+

The following did the trick for me:

1. Go to the command palette <kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.
2. Choose "TypeScript: Select a TypeScript Version...". (Probably 4.x.x something)
3. "Select TypeScript Version"
4. Select "Use Workspace Version version" which should reference `node_modules/typescript/lib`
