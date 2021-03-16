
##### Plugin installation and Usage

```json
{
  "plugins": [["@babel/plugin-proposal-class-properties", { "loose": true }]]
}
```

Without `{ "loose": true }`, the above code will compile to the following, using `Object.defineProperty`
This compilation process does what the browser engine does anyway - it's de-sugaring we are talking about.
The class is syntactic sugar anyway.
Internally they are still functions.

```js
class Bork {
  static a = "foo";
  static b;

  x = "bar";
  y;
}
```

```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, "x", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "bar",
  });
  Object.defineProperty(this, "y", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo",
});
Object.defineProperty(Bork, "b", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
});
```
