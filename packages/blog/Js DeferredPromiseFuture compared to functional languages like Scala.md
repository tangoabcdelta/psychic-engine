# Js Deferred/Promise/Future compared to functional languages like Scala

I'm mostly using programming languages like Scala and JavaScript. I'm trying to understand the similarities and differences in how async reactive programming is used in both languages. Can you help me?

I'm not taking any particular Js Promise framework because it seems many implement the similar specifications (like Promise/A). I've only used Q so far.

It seems that in Javascript we call a Deferred the object we resolve to complete a Promise. In Scala, it seems the Promise is the object you resolve to get a Future monad.

Can someone tell me if this is right? Is there any good reason for a different usage of the term Promise between Js and Scala?

Also, in Scala we usually chain Future monads with further computations using operators like map and flatMap (also called bindin Haskell). What is the equivalent of these in Js?

I may be wrong but it appears to me that in Js the then on a Promise kind of handle both map and flatMap operators right? If so, is it possible to obtain a promise of promise of result in Js? Like we can get a Future[Future[Result]] in Scala (which can be flattened to a Future[Result] anyway).

Is Js Promise a monad? It kind of seems so even if the method names do not really match those we find on monad literature.

-------------

### Yes, and no.

While extremely similar. With JavaScript Promises that comply to the Promises/A+ spec `.then` is not really a monadic bind and does `.map` and `.flatMap` both. Inside a `.then` handler when you return a promise it will recursively unwrap it.

```
Promise.delay(1000).then(function() {
    return Promise.delay(1000).then(function () {
        return Promise.delay(2000);
    }).then(function () {
        return Promise.delay(5000)
    });
}).then(function () {
    alert("This is only shown after 8 seconds and not one");
});
```

[(fiddle)](http://jsfiddle.net/bm5vF/)

You are correct that the standard JS promise libraries and the A+ spec does not feature monadic promises. They have been discussed, and implementations like [fantasy-promises](https://github.com/fantasyland/fantasy-promises) exist. They follow a differnet spec and have little adoption. Also see [this](https://github.com/promises-aplus/promises-spec/issues/94). There has been ongoing discussion about it in the language design discussion forum - esdiscuss and a monadic `.chain` method that does not flatmap and allows for monadic promises is considered but unlikely to make it.

This is for pragmatic reasons. The current way promises are implemented is immensely useful. Rare are the cases you actually want a `Future[Future` and normally you want continuations to just work in the language. Promises 'borrow' from monads and are 'monadic' in a sense themselves. `.then` is *very* close to bind and in my head I use them interchangeably :)

It is impossible to have a `Promise[Promise[Value]]` like a `Future[Future[Value]]` in Scala with most promise libraries. You'd have to wrap it in an object and have `Promise[Container[Promise[Value]]]`.

```
Promise.delay(1000).then(function () {
    return Promise.delay(1000).then(function () {
        return {
            wrap: Promise.delay(2000).then(function () {
                return Promise.delay(5000);
            })
        };
    });
}).then(function () {
    alert("This logs after 1 second");
    // I've also not seen a really solid use case 
    // except TypeScript type inference which is meh
});
```

[(fiddle)](http://jsfiddle.net/7VK8Y/)

There are also a number of other smaller differences between the two, but generally you are correct in your assertions.









-------

> It seems that in Javascript we call a Deferred the object we resolve to >complete a Promise. In Scala, it seems the Promise is the object you >resolve to get a Future monad.
>
> Can someone tell me if this is right? Is there any good reason for a >different usage of the term Promise between Js and Scala?

In Scala, Promise and Future have separated functionality, Future is a asynchronous computation container, which return you some value in the future, and Promise is the writing part for async-computation, which you can do something as follow

```
val promise = Promise[String]
val future1 = promise.future
val future2 = future1.map { case s => println(s); s }

future2.onSuccess { case s => println(s + " 2nd time") }

promise.success("promise completed")
```

Once you execute the last statement, the output will be

```
promise completed
promise completed 2nd time
```

In Scala,you read value from Future using onComplete, or you chain it using map, and you write to a Future using it's Promise counterpart

In JS Promise A+ specs, they are bundled together, `Promise.then` is used for both chaining and retrieving value for side-effect (eg. console.log), to write you will use `resolve` like code snippet below

```js
var promise = new Promise(function(resolve, reject){
    Thread.sleep(10000);
    resolve("promise completed");
}
```



---------





This document here doesn't compare Javascript promises with Scala, but instead Javascript promises with C++ C# and Python: https://github.com/KjellSchubert/promise-future-task. I know thats not exactly what you had asked for, but this might give you some interesting pointers nonetheless.



--------------

In contrast to Scala, [the JS Promise is not a monad, due to the implicit "thenable" unwrapping breaking monadic law](https://stackoverflow.com/a/50173415/1614973). You can, however, implement a callback-based monadic semantics and functionality, serving the same purpose.

See e.g. [the `cpsfy` library](https://github.com/dmitriz/cpsfy).

In addition, there is a structural difference due to `.then` accepting 2 functions, while `.chain` accepts only one. However, a `chain` accepting 2 or even any number of argument functions can be implemented, like e.g. with [`CPS` wrapper from `cpsfy`](https://github.com/dmitriz/cpsfy#quick-demo):

```scala
//function returning CPS function with 2 callbacks
const readFileCps = file => (onRes, onErr) =>  
  require('fs').readFile(file, (err, content) => {
    err ? onErr(err) : onRes(content)
  })

// CPS wraps a CPS function to provide the API methods
const getLines = CPS(readFileCps('name.txt'))
  // map applies function to the file content
  .map(file => file.trim()) 
  .filter(file => file.length > 0)
  // chain applies function that returns CPS function
  .chain(file => readFileCps(file))
  .map(text => text.split('\n'))
// => CPS function with 2 callbacks

// To use, simply pass callbacks in the same order
getLines(
  lines => console.log(lines),  // onRes callback
  err => console.error(err)  // onErr callback
)
```