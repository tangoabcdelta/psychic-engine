let SandBoxFrame = document.createElement("iframe");
let message = {}; // items to be evaluated
SandBoxFrame.contentWindow.postMessage(message, "*");

// Set up message event handler:
window.addEventListener("message", (event) => {
  let {
    data: { command, name, context },
  } = event;

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

chrome.browserAction.onClicked.addListener((event) => {
  let {
    data: { command, name, context },
  } = event;
  SandBoxFrame.contentWindow.postMessage(message, "*");
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
