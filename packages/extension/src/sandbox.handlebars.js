let templates = [];
let source = document.getElementById("hello-world-template").innerHTML;
templates["hello"] = Handlebars.compile(source);

// Set up message event handler:
window.addEventListener("message", function(event) {
  let command = event.data.command;
  let name = event.data.name || "hello";
  switch (command) {
    case "render":
      event.source.postMessage(
        {
          name: name,
          html: templates[name](event.data.context),
        },
        event.origin
      );
      break;

    // You could imagine additional functionality. For instance:
    //
    // case 'new':
    //   templates[event.data.name] = Handlebars.compile(event.data.source);
    //   event.source.postMessage({name: name, success: true}, event.origin);
    //   break;
  }
});

chrome.browserAction.onClicked.addListener(function() {
  var iframe = document.getElementById("theFrame");
  var message = {
    command: "render",
    context: { thing: "world" },
  };
  iframe.contentWindow.postMessage(message, "*");
});

window.addEventListener("message", function(event) {
  if (event.data.html) {
    new Notification("Templated!", {
      icon: "icon.png",
      body:
        'HTML Received for "' +
        event.data.name +
        '": `' +
        event.data.html +
        "`",
    });
  }
});
