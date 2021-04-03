keep the file extension of ejs file as .html

While developing an expressjs app using ejs templating engine you may want to use keep the extension as `*.html` instead of `*.ejs` e.g. `home.html` instead of using home.ejs. Main reason for using html is generally to use more effective code hint, formatting and syntax highlighting without adding any extra settings. To accomplish it, you can perform any of the following:

##### 1

- use `app.engine('.html', require('ejs').__express);` of ejs npm module.

  app.engine('.html', require('ejs').\_\_express);
  app.set('view engine', 'ejs');

##### 2

- You can also use :`[app.engine(ext, callback)][1]`
- Source: http://expressjs.com/en/4x/api.html#app.engine
- Set the following up with your view engine and views settings near the top:

  app.engine('html', require('ejs').renderFile);

- Call `res.render`
- The only difference is that you need to specify the extension:
- In the following example, you'll see that the variables are handled as you would expect it to in an `.ejs` file.


    app.get('/',function(req,res){
        res.render("home.html", { myString: "I'm a normal string!" });
        // `<%=myString%>` is handled like it'd be in a normal `.ejs` file
    });

##### 2

- Alternatively,

```js
const app = require("express")();
const engine = require("ejs");
app.engine("html", engine.__express);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "html");

app.engine(".html", require("ejs").__express);
app.set("view engine", "ejs");

//this route will open profil.html in folder ./views
app.get("/", (req, res) => {
  //render file profil.html
  res.render("profil", {
    name: "Danang Ponorogo",
  });
});

var server = http.createServer(app);
server.listen(3001, () => {
  console.log("Server is running at port 3001");
});
```

### EJS

#### Tags

    <% 'Scriptlet' tag, for control-flow, no output
    <%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
    <%= Outputs the value into the template (HTML escaped)
    <%- Outputs the unescaped value into the template
    <%# Comment tag, no execution, no output
    <%% Outputs a literal '<%'
    %> Plain ending tag
    -%> Trim-mode ('newline slurp') tag, trims following newline
    _%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it

#### Includes

    <%- include('user/show'); %>

Use the raw output tag (`<%-`) with your include to avoid double-escaping the HTML output

    <ul>
      <% users.forEach(function(user){ %>
        <%- include('user/show', {user: user}); %>
      <% }); %>
    </ul>

### Threadpool

#### Using libuv

`libuv` is a multi-platform support library with a focus on asynchronous I/O.

It was primarily developed for use by Node.js, but it's also used by Luvit, Julia, pyuv, and others.

##### Feature highlights

- Async I/O
- Async TCP and UDP sockets
- Async DNS resolution
- Threading and synchronization primitives
- Child processes
- Thread pool
- Signal handling
- Full-featured event loop backed by epoll, kqueue, IOCP, event ports.
- High resolution clock
- FS events (file system events)
- ANSI escape code controlled TTY (TeleTYpewriter)
- IPC (inter-process communication) with socket sharing, using Unix domain sockets or named pipes (Windows)
