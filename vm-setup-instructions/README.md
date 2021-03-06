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

- greater-than
- ampersands
- and numbers after the commands

###### Output redirection

- The greater-thans (`>`) in commands like these redirect the program’s output somewhere.
- In this case, something is being redirected into `/dev/null`, and something is being redirected into `&1`.

###### Standard in, out, and error

There are three standard sources of input and output for a program. Standard input usually comes from the keyboard if it’s an interactive program, or from another program if it’s processing the other program’s output. The program usually prints to standard output, and sometimes prints to standard error. These three file descriptors (you can think of them as “data pipes”) are often called STDIN, STDOUT, and STDERR.

Sometimes they’re not named, they’re numbered! The built-in numberings for them are 0, 1, and 2, in that order. By default, if you don’t name or number one explicitly, you’re talking about STDOUT.

Given that context, you can see the command above is redirecting standard output into `/dev/null`, which is a place you can dump anything you don’t want (often called the bit-bucket), then redirecting standard error into standard output (you have to put an & in front of the destination when you do this).

The short explanation, therefore, is “all output from this command should be shoved into a black hole.” That’s one good way to make a program be really quiet!

### GIT: Shallow Clone

##### How to Execute Git Shallow Clone

Provide an argument of `--depth 1` to the git clone command to copy only the latest revision of a repo:

```bash
git clone -–depth [depth] [remote-url]
You can also use git shallow clone to access a single branch:
git clone [remote-url] --branch [name] --single-branch [folder]
```

###### `X` was compiled against a different `Node.js` version using `NODE_MODULE_VERSION` `Y`

Sample error:

```bash
'/usr/share/code/resources/app/node_modules.asar.unpacked/node-pty/build/Release/pty.node' was compiled against a different Node.js version using NODE_MODULE_VERSION 87.
```

Solution: https://stackoverflow.com/questions/46384591/node-was-compiled-against-a-different-node-js-version-using-node-module-versio

You need to remove the module folder (bcrypt) from the node_modules folder and reinstall it, use the following commands:

```bash
$ rm -rf node_modules/bcrypt
$ npm install
// or
$ yarn
```

If the above doesn't work:

1. **The first important part** - Require all dependencies you need in the `main.js` file that is run by electron.
2. Run `npm i -D electron-rebuild` to add the [electron-rebuild][1] package
3. Remove the `node-modules` folder, as well as the `packages-lock.json` file.
4. Run `npm i` to install all modules.
5. Run `./node_modules/.bin/electron-rebuild` (`.\node_modules\.bin\electron-rebuild.cmd` for Windows) to rebuild everything. It is **very important** to run `./node_modules/.bin/electron-rebuild` directly after `npm i` otherwise it won't work.

[1]: https://github.com/electron/electron-rebuild

### OpenSSH Config - Create and setup config file as shortcuts for frequently accessed servers

sauce: https://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/

- global or local configuration file for SSH client can create shortcuts for sshd server including advanced ssh client options.

- System-wide OpenSSH config file client configuration
  - `/etc/ssh/ssh_config`
  - Default configuration for all users of OpenSSH clients on the machine
  - Readable by all users on the system
- User-specific OpenSSH file client configuration
  - `~/.ssh/config`
  - `$HOME/.ssh/config`
  - User’s own configuration file
  - Overrides global client configuration file `/etc/ssh/ssh_config`

**`~/.ssh/config` file rules**

First, we need to create `.ssh` directory

```
mkdir -p $HOME/.ssh
chmod 0700 $HOME/.ssh
```

- per line, only one config parameter is allowed
- `parameter name` must be followed by its `value` or `values`
- comments start with `#`
- values are **case-sensitive**
- parameter names are **not case-sensitive**

Syntax is:

```bash
config value
config1 value1 value2
```

- an equal sign (=) instead of whitespace between the parameter name and the values can also be used

```
config=value
config1=value1 value2
```

If your SSH login looks like the following:

```bash
$ ssh -i ~/.ssh/id_rsa -p 4242 nixcraft@server1.cyberciti.biz
```

Then, your config file will look like this:

```bash
Host server1
     HostName server1.cyberciti.biz
     User nixcraft
     Port 4242
     IdentityFile /nfs/shared/users/nixcraft/keys/server1/id_rsa
```

- Save and close the file in `vi/vim` by pressing `Esc` key, type `:w` and hit `Enter` key.
- To open your new SSH session to `server1.cyberciti.biz`, type the following command:`$ ssh server1`

**Add another host**

```bash
Host server1
     HostName server1.cyberciti.biz
     User nixcraft
     Port 4242
     IdentityFile /nfs/shared/users/nixcraft/keys/server1/id_rsa

Host nas01
     HostName 192.168.1.100
     User root
     IdentityFile ~/.ssh/nas01.key
```

Now, this is how you login

```bash
$ ssh nas01
$ ssh server1
```

**Sample Big Config File**

```bash
### default for all ##
Host *
     ForwardAgent no
     ForwardX11 no
     ForwardX11Trusted yes
     User nixcraft
     Port 22
     Protocol 2
     ServerAliveInterval 60
     ServerAliveCountMax 30

## override as per host ##
Host server1
     HostName server1.cyberciti.biz
     User nixcraft
     Port 4242
     IdentityFile /nfs/shared/users/nixcraft/keys/server1/id_rsa

## Home nas server ##
Host nas01
     HostName 192.168.1.100
     User root
     IdentityFile ~/.ssh/nas01.key

## Login AWS Cloud ##
Host aws.apache
     HostName 1.2.3.4
     User wwwdata
     IdentityFile ~/.ssh/aws.apache.key

## Login to internal lan server at 192.168.0.251 via our public uk office ssh based gateway using ##
## $ ssh uk.gw.lan ##
Host uk.gw.lan uk.lan
     HostName 192.168.0.251
     User nixcraft
     ProxyCommand  ssh nixcraft@gateway.uk.cyberciti.biz nc %h %p 2> /dev/null

## Our Us Proxy Server ##
## Forward all local port 3128 traffic to port 3128 on the remote vps1.cyberciti.biz server ##
## $ ssh -f -N  proxyus ##
Host proxyus
    HostName vps1.cyberciti.biz
    User breakfree
    IdentityFile ~/.ssh/vps1.cyberciti.biz.key
    LocalForward 3128 127.0.0.1:3128
```

Refer to tips:

- Speed up ssh session
- Understand `~/.ssh/config` entries
