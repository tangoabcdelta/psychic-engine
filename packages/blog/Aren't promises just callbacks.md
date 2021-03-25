# Aren't promises just callbacks?
I've been developing JavaScript for a few years and I don't understand the fuss about promises at all.

It seems like all I do is change:

api(function(result){
    api2(function(result2){
        api3(function(result3){
             // do work
        });
    });
});
Which I could use a library like async for anyway, with something like:

api().then(function(result){
     api2().then(function(result2){
          api3().then(function(result3){
               // do work
          });
     });
});
Which is more code and less readable. I didn't gain anything here, it's not suddenly magically 'flat' either. Not to mention having to convert things to promises.

So, what's the big fuss about promises here?

------



Promises are not callbacks. A promise represents the **future result of an asynchronous operation**. Of course, writing them the way you do, you get little benefit. But if you write them the way they are meant to be used, you can write asynchronous code in a way that resembles synchronous code and is much more easy to follow:

```js
api().then(function(result){
    return api2();
}).then(function(result2){
    return api3();
}).then(function(result3){
     // do work
});
```

Certainly, not much less code, but much more readable.

But this is not the end. Let's discover the true benefits: What if you wanted to check for any error in any of the steps? It would be hell to do it with callbacks, but with promises, is a piece of cake:

```js
api().then(function(result){
    return api2();
}).then(function(result2){
    return api3();
}).then(function(result3){
     // do work
}).catch(function(error) {
     //handle any error that may occur before this point
});
```

Pretty much the same as a `try { ... } catch` block.

Even better:

```js
api().then(function(result){
    return api2();
}).then(function(result2){
    return api3();
}).then(function(result3){
     // do work
}).catch(function(error) {
     //handle any error that may occur before this point
}).then(function() {
     //do something whether there was an error or not
     //like hiding an spinner if you were performing an AJAX request.
});
```

And even better: What if those 3 calls to `api`, `api2`, `api3` could run simultaneously (e.g. if they were AJAX calls) but you needed to wait for the three? Without promises, you should have to create some sort of counter. With promises, using the ES6 notation, is another piece of cake and pretty neat:

```js
Promise.all([api(), api2(), api3()]).then(function(result) {
    //do work. result is an array contains the values of the three fulfilled promises.
}).catch(function(error) {
    //handle the error. At least one of the promises rejected.
});
```

Hope you see Promises in a new light now.



---------------

Yes, Promises are asynchronous callbacks. They can't do anything that callbacks can't do, and you face the same problems with asynchrony as with plain callbacks.

However, Promises are *more* than just callbacks. They are a very mighty abstraction, allow cleaner and better, functional code with less error-prone boilerplate.

> So what's the main idea?

Promises are objects representing the result of a single (asynchronous) computation. They [*resolve* to that result](https://stackoverflow.com/a/29269515/1048572) only once. There's a few things what this means:

Promises implement an observer pattern:

- You don't need to know the callbacks that will use the value before the task completes.
- Instead of expecting callbacks as arguments to your functions, you can easily `return` a Promise object
- The promise will store the value, and you can *transparently* add a callback whenever you want. It will be called when the result is available. "Transparency" implies that when you have a promise and add a callback to it, it doesn't make a difference to your code whether the result has arrived yet - the API and contracts are the same, simplifying caching/memoisation a lot.
- You can add multiple callbacks easily

[Promises are chainable](http://domenic.me/2012/10/14/youre-missing-the-point-of-promises/) (*monadic*, [if you want](https://stackoverflow.com/a/45772042/1048572)):

- If you need to transform the value that a promise represents, you *map* a transform function over the promise and get back a new promise that represents the transformed result. You cannot synchronously get the value to use it somehow, but you can easily *lift* the transformation in the promise context. No boilerplate callbacks.
- If you want to chain two asynchronous tasks, you can use the `.then()` method. It will take a callback to be called with the first result, and returns a promise for the result of the promise that the callback returns.

Sounds complicated? Time for a code example.

```js
var p1 = api1(); // returning a promise
var p3 = p1.then(function(api1Result) {
    var p2 = api2(); // returning a promise
    return p2; // The result of p2 …
}); // … becomes the result of p3

// So it does not make a difference whether you write
api1().then(function(api1Result) {
    return api2().then(console.log)
})
// or the flattened version
api1().then(function(api1Result) {
    return api2();
}).then(console.log)
```

Flattening does not come magically, but you can easily do it. For your heavily nested example, the (near) equivalent would be

```js
api1().then(api2).then(api3).then(/* do-work-callback */);
```

If seeing the code of these methods helps understanding, [here's a most basic promise lib in a few lines](https://stackoverflow.com/a/15668353/1048572).

> What's the big fuss about promises?

The Promise abstraction allows much better composability of functions. For example, next to `then` for chaining, the `all` function creates a promise for the combined result of multiple parallel-waiting promises.

Last but not least Promises come with integrated error handling. The result of the computation might be that either the promise is *fulfilled* with a value, or it is *rejected* with a reason. All the composition functions handle this automatically and propagate errors in promise chains, so that you don't need to care about it explicitly everywhere - in contrast to a plain-callback implementation. In the end, you can add a dedicated error callback for all occurred exceptions.

> Not to mention having to convert things to promises.

That's quite trivial actually with good promise libraries, see [How do I convert an existing callback API to promises?](https://stackoverflow.com/q/22519784/1048572)



----------

In addition to the already established answers, with ES6 arrow functions Promises turn from a modestly shining small blue dwarf *straight* into a red giant. That is about to collapse into a supernova:

```js
api().then(result => api2()).then(result2 => api3()).then(result3 => console.log(result3))
```

As [oligofren](https://stackoverflow.com/users/200987/oligofren) pointed out, without arguments between api calls you don't need the anonymous wrapper functions at all:

```js
api().then(api2).then(api3).then(r3 => console.log(r3))
```

And finally, if you want to reach a supermassive black hole level, Promises can be awaited:

```js
async function callApis() {
    let api1Result = await api();
    let api2Result = await api2(api1Result);
    let api3Result = await api3(api2Result);

    return api3Result;
}
```



--------





In addition to the awesome answers above, 2 more points may be added:

**1. Semantic difference:**

Promises may be already resolved upon creation. This means *they guarantee conditions rather than events*. If they are resolved already, the resolved function passed to it is still called.

Conversely, *callbacks* handle events. So, if the event you are interested in has happened before the callback has been registered, the callback is not called.

**2. Inversion of control**

*Callbacks* involve inversion of control. When you register a callback function with any API, the Javascript runtime stores the callback function and calls it from the event loop once it is ready to be run.

Refer [The Javascript Event loop](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/) for an explanation.

With *Promises*, control resides with the calling program. *The .then() method may be called at any time* if we store the promise object.