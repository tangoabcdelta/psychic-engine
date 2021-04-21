# System Designing

- AI Assisted cataloging
  - CATALOGUE
  - RECOMMENDATION
  - ENGAGEMENT
  - ANALYZE
  - PERSONALIZE

# Segment Visual Tagger

https://segment.com/docs/connections/sources/visual-tagger/

# Glossary

https://developer.mozilla.org/en-US/docs/Glossary

## TOFU

Trust On First Use (TOFU) is a security model in which a client needs to create a trust relationship with an unknown server. To do that, clients will look for identifiers (for example public keys) stored locally. If an identifier is found, the client can establish the connection. If no identifier is found, the client can prompt the user to determine if the client should trust the identifier.

TOFU is used in the SSH protocol, in HTTP Public Key Pinning (HPKP) where the browsers will accept the first public key returned by the server, and in Strict-Transport-Security (HSTS) where a browser will obey the redirection rule.

**sauce**: https://developer.mozilla.org/en-US/docs/Glossary/TOFU

**Learn more**

- HTTP Public Key Pinning (HPKP)
- Public-Key-Pins
- Wikipedia: TOFU

## Application Context, Browsing context and BroadcastChannel

- https://developer.mozilla.org/en-US/docs/Glossary/application_context

  - An application context is a top-level browsing context that has a manifest applied to it.
  - If an application context is created as a result of the user agent being asked to navigate to a deep link, the user agent must immediately navigate to the deep link with replacement enabled. Otherwise, when the application context is created, the user agent must immediately navigate to the start URL with replacement enabled.
  - Please note that the start URL is not necessarily the value of the start_url member: the user or user agent could have changed it when the application was added to home-screen or otherwise bookmarked.

- https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context

  - A browsing context is the environment a browser displays a Document. In modern browsers, it usually is a tab, but can be a window or even only parts of a page, like a frame or an iframe.
  - Each browsing context has a specific origin, the origin of the active document and a history that memorize all the displayed documents, in order.
  - Communication between browsing context is severely constrained.
  - Between browsing context of the same origin, a BroadcastChannel can be opened and used.

- https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
  - The BroadcastChannel interface represents a named channel that any browsing context of a given origin can subscribe to. It allows communication between different documents (in different windows, tabs, frames or iframes) of the same origin. Messages are broadcasted via a message event fired at all BroadcastChannel objects listening to the channel.

## Finite Automata

Finite Automata(FA) is the simplest machine to recognize patterns.The finite automata or finite state machine is an abstract machine which have five elements or tuple. It has a set of states and rules for moving from one state to another but it depends upon the applied input symbol. Basically it is an abstract model of digital computer. Following figure shows some essential features of a general automation.

https://www.geeksforgeeks.org/introduction-of-finite-automata

##### Deterministic finite automaton

https://en.wikipedia.org/wiki/Deterministic_finite_automaton

## Compare Two Objects

- https://javascript.info/keys-values-entries

```js
let user = {
  name: "John",
  age: 30,
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

##### JS Tutorial: Find if Two Object Values are Equal to Each Other

- https://www.youtube.com/watch?v=GgfIby_T8yg
- https://javascript.plainenglish.io/comparing-objects-in-javascript-ce2dc1f3de7f
- `===`
- `Object.is()`
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
- `JSON.stringify`

### Transforming objects

Objects lack many methods that exist for arrays, e.g. map, filter and others.

If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:

Use Object.entries(obj) to get an array of key/value pairs from obj.
Use array methods on that array, e.g. map.
Use Object.fromEntries(array) on the resulting array to turn it back into an object.
For example, we have an object with prices, and would like to double them:

```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.

### Sum the properties

There is a salaries object with arbitrary number of salaries.

Write the function sumSalaries(salaries) that returns the sum of all salaries using Object.values and the for..of loop.

If salaries is empty, then the result must be 0.

For instance:

```js
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

alert(sumSalaries(salaries)); // 650
```

### `Object.prototype.toString()`

sauce: https://tc39.es/ecma262/#sec-object.prototype.tostring

##### 20.1.3.6 `Object.prototype.toString()`

When the `toString` method is called, the following steps are taken:

    1. If the this value is undefined, return "[object Undefined]".
    2. If the this value is null, return "[object Null]".
    3. Let O be ! ToObject(this value).
    4. Let isArray be ? IsArray(O).
    5. If isArray is true, let builtinTag be "Array".
    6. Else if O has a [[ParameterMap]] internal slot, let builtinTag be "Arguments".
    7. Else if O has a [[Call]] internal method, let builtinTag be "Function".
    8. Else if O has an [[ErrorData]] internal slot, let builtinTag be "Error".
    9. Else if O has a [[BooleanData]] internal slot, let builtinTag be "Boolean".
    10. Else if O has a [[NumberData]] internal slot, let builtinTag be "Number".
    11. Else if O has a [[StringData]] internal slot, let builtinTag be "String".
    12. Else if O has a [[DateValue]] internal slot, let builtinTag be "Date".
    13. Else if O has a [[RegExpMatcher]] internal slot, let builtinTag be "RegExp".
    14. Else, let builtinTag be "Object".
    15. Let tag be ? Get(O, @@toStringTag).
    16. If Type(tag) is not String, set tag to builtinTag.
    17. Return the string-concatenation of "[object ", tag, and "]".

### 10.4 Built-in Exotic Object Internal Methods and Slots

    10.4.1 Bound Function Exotic Objects
      10.4.1.1 [[Call]]
      10.4.1.2 [[Construct]]
        The [[Construct]] internal method of a bound function exotic object F takes arguments argumentsList (a List of ECMAScript language values) and newTarget (a constructor). It performs the following steps when called:
      10.4.1.3 BoundFunctionCreate
    10.4.2 Array Exotic Objects
      An object is an Array exotic object (or simply, an Array object) if its [[DefineOwnProperty]] internal method uses the following implementation, and its other essential internal methods use the definitions found in 10.1. These methods are installed in ArrayCreate.
      10.4.2.1 [[DefineOwnProperty]]
    10.4.3 String Exotic Objects
      An object is a String exotic object (or simply, a String object) if its [[GetOwnProperty]], [[DefineOwnProperty]], and [[OwnPropertyKeys]] internal methods use the following implementations, and its other essential internal methods use the definitions found in 10.1. These methods are installed in StringCreate.

### REPL

https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop

A read–eval–print loop (REPL), also termed an interactive toplevel or language shell, is a simple interactive computer programming environment that takes single user inputs, executes them, and returns the result to the user; a program written in a REPL environment is executed piecewise. The term is usually used to refer to programming interfaces similar to the classic Lisp machine interactive environment. Common examples include command line shells and similar environments for programming languages, and the technique is very characteristic of scripting languages.[1]

##### Piecewise Function

sauce: https://en.wikipedia.org/wiki/Piecewise

In mathematics, a piecewise-defined function (also called a piecewise function, a hybrid function, or definition by cases) is a function defined by multiple sub-functions, where each sub-function applies to a different interval in the domain.[1][2][3] Piecewise definition is actually a way of expressing the function, rather than a characteristic of the function itself.

A distinct, but related notion is that of a property holding piecewise for a function, used when the domain can be divided into intervals on which the property holds. Unlike for the notion above, this is actually a property of the function itself. A piecewise linear function (which happens to be also continuous) is depicted as an example.

##### JIT

### Parts of Visual Form: Computational Aspects

##### Abstract

Abstract—Underlying recognition is an organization of objects and their parts into classes and hierarchies. A representation of parts for recognition requires that they be invariant to rigid transformations, robust in the presence of occlusions, stable with changes in viewing geometry, and be arranged in a hierarchy. These constraints are captured in a general framework using notions of a PART-LINE and a PARTITIONING SCHEME. A proposed general principle of “form from function” motivates a particular partitioning scheme involving two types of parts, NECK-BASED and LIMB-BASED, whose psychophysical relevance was demonstrated in [39]. Neck-based parts arise from narrowings in shape, or the local minima in distance between two points on the boundary, while limb-based parts arise from a pair of negative curvature minima which have “co-circular” tangents. In this paper, we present computational support for the limb-based and neck-based parts by showing that they are invariant, robust, stable and yield a hierarchy of parts. Examples illustrate that the resulting decompositions are robust in the presence of occlusion and clutter for a range of man-made and natural objects, and lead to natural and intuitive parts which can be used for recognition.

sauce: https://www.computer.org/csdl/journal/tp/1995/03/i0239/13rRUxAASX6

### Russian Dolls and Enevelopes

Russian doll envelopes is a very interesting and often occurring problem in life. Let's look at the problem first:
You have a number of envelopes with widths and heights given as a pair of integers (w, h). One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.
What is the maximum number of envelopes can you Russian doll? (put one inside other)

sauce: https://labuladong.gitbook.io/algo-en/iii.-algorithmic-thinking/russiandollenvelopes

### Properties of recursive algorithms

https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/properties-of-recursive-algorithms

#### Towers of Hanoi
