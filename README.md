- Workspaces can only be enabled in private projects.

```
parcel index.html
parcel watch index.html
```

- Format all: `prettier --write`

```js
{
  "start:app-ant-design": "yarn workspace @project/app-ant-design-rewired start",
  "start:app-multi": "yarn workspace @project/app-multi-comps start",
  "start:app-single": "yarn workspace @project/app-single-comp start",
  "start:app-ts": "yarn workspace @project/app-typescript start",
  "start:storybook": "yarn workspace @project/storybook storybook",
  "start:storybook-ts": "yarn workspace @project/storybook-typescript storybook",
  "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet --fix",
  "lint": "eslint --fix --ext .js,.jsx .",
  "lint:scss": "stylelint 'src/**/\*.scss' --syntax scss",
  "lint:scss:fix": "stylelint 'src/**/\*.scss' --syntax scss --fix",
  "lint:js": "eslint . --ext .js,.jsx",
  "lint:js:fix": "npm run lint:js -- --fix",
}
```

yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --devs
yarn add eslint-plugin-react --dev -W
yarn add eslint-config-airbnb eslint-plugin-import --dev -W





```bash
echo "# psychic-engine" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:tangoabcdelta/psychic-engine.git
git push -u origin main
```


yarn run v1.22.10
info Commands available from binary scripts: JSONStream, acorn, ansi-to-html, atob, brfs, browserslist, conventional-changelog-writer, conventional-commits-parser, conventional-recommended-bump, cssesc, envinfo, escodegen, esgenerate, eslint, esparse, esvalidate, get-pkg-repo, git-raw-commits, git-semver-tags, handlebars, import-local-fixture, is-ci, js-yaml, jsesc, json5, lerna, lint, loose-envify, miller-rabin, mime, mkdirp, node-gyp, node-which, nopt, parcel, parser, prettier, purgecss, quote-stream, regjsparser, replace-in-file, rimraf, semver, sha.js, sl-log-transformer, sshpk-conv, sshpk-sign, sshpk-verify, svgo, terser, tsc, tsserver, uglifyjs, uncss, uuid
