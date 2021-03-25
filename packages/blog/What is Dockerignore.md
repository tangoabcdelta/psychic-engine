#### Dockerignore

There’s an important concept you need to internalize—always keep your Docker image as lean as possible. This means packaging only what your applications need to run. Please don’t do otherwise.

In reality, source code usually contain other files and directories like .git, .idea, .vscode, or travis.yml. Those are essential for our development workflow, but won’t stop our app from running. It’s a best practice not to have them in your image—that’s what .**dockerignore** is for. We use it to prevent such files and directories from making their way into our build.

Create a file with the name **.dockerignore** at the root folder with this content:

```
.git
.gitignore
node_modules
npm-debug.log
Dockerfile*
docker-compose*
README.md
LICENSE
.vscode
```

