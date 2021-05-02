const protocols = ["one", "two"];
const webSocket = new WebSocket(url, protocols);

webSocket.onopen = (event) => {
  webSocket.send("Here's some text that the server is urgently awaiting!");
};

webSocket.onerror = (event) => {
  console.log(`WebSocket error: ${error}`);
};

webSocket.onmessage = function(event) {
  console.log(event.data);
  switch (event.data) {
    case "REFRESH_NOW":
      document.getElementById("text").value = "Refresssssh";
      // window.location.reload();
      break;

    default:
      // Send text to all users through the server
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      const msg = {
        type: "message",
        text: document.getElementById("text").value,
        id: clientID,
        date: Date.now(),
      };

      // Send the msg object as a JSON-formatted string.
      webSocket.send(JSON.stringify(msg));

      // Blank the text input element, ready to receive the next line of text from the user.
      document.getElementById("text").value = "";
  }
};
