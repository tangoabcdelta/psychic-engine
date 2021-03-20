(function() {
  try {
    throw new Error();
  } catch (x) {
    var x = 1,
      y = 2;
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

for (var i = 0; i < 5; i++) {
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Button " + i));
  (function(i) {
    btn.addEventListener("click", function() {
      console.log(i);
    });
  })(i);
  document.body.appendChild(btn);
}

for (var i = 0; i < 5; i++) {
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Button " + i));

  btn.addEventListener("click", (e) => {
    console.log(i);
  });
  document.body.appendChild(btn);
}

for (var i = 0; i < 5; i++) {
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Button " + i));
  btn.addEventListener("click", function() {
    console.log(i);
  });
  document.body.appendChild(btn);
}

// [7:32 PM] Vivek Kumar Gupta (Guest)
(function(x) {
  return (function(y) {
    console.log(x);
  })(2);
})(1);

// [7:35 PM] Vivek Kumar Gupta (Guest)

console.log(typeof typeof 1); //typeof "number" // "string"
console.log({} instanceof Object);

const { Object, console } = require("globalthis/implementation");

const dispatcher = {
  foo: [
    {
      thisObjectReference,
      callback,
      data,
    },
  ],
  bar: [
    {
      thisObjectReference2,
      callback2,
      data2,
    },
  ],
};

Object.prototype.subscribe = function subscribe(callback) {
  if (!dispatcher[name]) {
    dispatcher[name] = [];
  } else {
    dispatcher[name].push({
      caller: this,
      data,
    });
  }
};

Object.prototype.register = function registerEvent(name, data) {
  if (!dispatcher[name]) {
    dispatcher[name] = [];
  } else {
    dispatcher[name].push({
      caller: this,
      data,
    });
  }
};

Object.prototype.dispatch = function dispatch(name) {
  dispatcher[name].map((item) => {
    item.callback(item.data);
  });
};

let a = new Object();
a.subscribe("foo", (e) => {
  console.log("hi");
});

let b = new Object();
b.dispatch("foo", {
  text: "hi",
});
