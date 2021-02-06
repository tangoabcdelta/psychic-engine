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





echo "# psychic-engine" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:tangoabcdelta/psychic-engine.git
git push -u origin main