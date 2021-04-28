file location: psychic-engine/README.md

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

```
ps ax
watch ps ax

# look at the tree of processes
pstree -p
```

#### Distro Installation

- Run `setup.sh` in `sudo` mode

```
$ sudo setup.sh
```

#### Permission `755`

`chmod 755`

`755` can be separated as

    7 user can read, write, execute
    5 group can read and execute
    5 others can read and execute

`rwxr-xr-x`

Another presentation form for 755 is rwxr-xr-x .

##### Change permission for all files in a directory

```bash
find . -name "*.sh" -exec chmod 755 {};
find . -wholename "./packages/server/bin/*" -exec chmod 755 {};
find ./packages/server/bin/ -type f -name "*.sh" -exec chmod 755 {};
```

```bash
$ chmod --help
  -c, --changes          like verbose but report only when a change is made
  -f, --silent, --quiet  suppress most error messages
  -v, --verbose          output a diagnostic for every file processed
      --no-preserve-root  do not treat '/' specially (the default)
      --preserve-root    fail to operate recursively on '/'
      --reference=RFILE  use RFILE's mode instead of MODE values
  -R, --recursive        change files and directories recursively
      --help     display this help and exit
      --version  output version information and exit
```

##### Shell scripting: -z and -n options with if

- `if [ -z "$xyz" ]`
- `if [ -n "$abc" ]`

source: https://tldp.org/LDP/abs/html/comparison-ops.html

```bash
-n
   string is not null.

-z
  string is null, that is, has zero length
  if [ -z "$STR" ]
  then
    echo "\$STR is null."
  else
    echo "\$STR is NOT null."
  fi
```

##### What Does `> /dev/null 2>&1` Mean?

Here’s an example command:

```bash
wibble > /dev/null 2>&1`
```

- greater-thans
- ampersands
- and numbers after the commands m

###### Output redirection

- The greater-thans (`>`) in commands like these redirect the program’s output somewhere.
- In this case, something is being redirected into `/dev/null`, and something is being redirected into `&1`.

###### Standard in, out, and error

There are three standard sources of input and output for a program. Standard input usually comes from the keyboard if it’s an interactive program, or from another program if it’s processing the other program’s output. The program usually prints to standard output, and sometimes prints to standard error. These three file descriptors (you can think of them as “data pipes”) are often called STDIN, STDOUT, and STDERR.

Sometimes they’re not named, they’re numbered! The built-in numberings for them are 0, 1, and 2, in that order. By default, if you don’t name or number one explicitly, you’re talking about STDOUT.

Given that context, you can see the command above is redirecting standard output into `/dev/null`, which is a place you can dump anything you don’t want (often called the bit-bucket), then redirecting standard error into standard output (you have to put an & in front of the destination when you do this).

The short explanation, therefore, is “all output from this command should be shoved into a black hole.” That’s one good way to make a program be really quiet!
