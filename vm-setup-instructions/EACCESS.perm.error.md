# Resolving EACCES permissions errors when installing packages globally

documentation: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

Manually change npm's default directory
**Note:** This section does not apply to Microsoft Windows.

To minimize the chance of permissions errors, you can configure npm to use a different directory. In this example, you will create and use hidden directory in your home directory. **Back up your computer.**

On the command line, in your home directory, create a directory for global installations:

```
mkdir ~/.npm-global
```

Configure `npm` to use the new directory path:

```
npm config set prefix '~/.npm-global'
```

In your preferred text editor, open or create a `~/.profile` file and add this line:

```
export PATH=~/.npm-global/bin:$PATH
```

On the command line, update your system variables:

```
source ~/.profile
```

To test your new configuration, install a package globally without using sudo:

```
npm install -g jshint
```

Instead of steps 2-4, you can use the corresponding ENV variable (e.g. if you don't want to modify ~/.profile):

```
NPM_CONFIG_PREFIX=~/.npm-global
```
