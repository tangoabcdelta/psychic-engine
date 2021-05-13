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

###### Minimist Usage

- Parses argument options
- This module is the guts of optimist's argument parser without all the fanciful decoration.
- Previous versions had a prototype pollution bug that could cause privilege escalation in some circumstances when handling untrusted user input.

```js
var argv = require("minimist")(process.argv.slice(2));
console.log(argv);
```

```bash
$ node example/parse.js -a beep -b boop
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
```

```js
{ _: [], a: 'beep', b: 'boop' }
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

##### rsync - Basic Syntax

The basic syntax of rsync is very straightforward, and operates in a way that is similar to `ssh`, `scp`, and `cp`.

```bash
cd ~
mkdir dir1
mkdir dir2

touch dir1/file{1..100}
# We now have a directory called dir1 with 100 empty files in it.


ls dir1

# Output
file1    file18  file27  file36  file45  file54  file63  file72  file81  file90
file10   file19  file28  file37  file46  file55  file64  file73  file82  file91
file100  file2   file29  file38  file47  file56  file65  file74  file83  file92
file11   file20  file3   file39  file48  file57  file66  file75  file84  file93
file12   file21  file30  file4   file49  file58  file67  file76  file85  file94
file13   file22  file31  file40  file5   file59  file68  file77  file86  file95
file14   file23  file32  file41  file50  file6   file69  file78  file87  file96
file15   file24  file33  file42  file51  file60  file7   file79  file88  file97
file16   file25  file34  file43  file52  file61  file70  file8   file89  file98
file17   file26  file35  file44  file53  file62  file71  file80  file9   file99

# We also have an empty directory called dir2.
# To sync the contents of dir1 to dir2 on the same system, type:
rsync -r dir1/ dir2
```

###### How To Use Rsync to Sync with a Remote System

Syncing to a remote system is trivial if you have SSH access to the remote machine and rsync installed on both sides. Once you have SSH access verified between the two machines, you can sync the dir1 folder from earlier to a remote computer by using this syntax (note that we want to transfer the actual directory in this case, so we omit the trailing slash):

This is called a “push” operation because it pushes a directory from the local system to a remote system.

```bash
rsync -a ~/dir1 username@remote_host:destination_directory
```

The opposite operation is “pull”. It is used to sync a remote directory to the local system. If the dir1 were on the remote system instead of our local system, the syntax would be:

```

rsync -a username@remote_host:/home/username/dir1 place_to_sync_on_local_machine


```
