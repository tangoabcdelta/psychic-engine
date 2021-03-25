# Node.js: When to use Promises vs Callbacks

https://stackoverflow.com/questions/45041462/node-js-when-to-use-promises-vs-callbacks

I have some older Node.js code that I'm updating. In the process I'm designing new modules to work with the old code. I'm finding that now, as opposed to when I first wrote this, I rely more on using ES6 promises rather than callbacks. So now I have this mix of some functions returning promises and some taking callbacks - which is tedious. I think eventually it should be refactored to use promises. But before that is done...

What are the situations where promises are preferred and where are callbacks preferred?

Is there any type of situation that a callback can handle better than a promise and vice-versa?

Based on what I've seen so far, I can't really see any reason to use callbacks instead of promises. Is that true?

---------

First off, you pretty much never want to write code that is a mix of callbacks and promises for async operations. If you're moving to promises or introducing some promises, then you probably want to refactor the callbacks in that same section of code into promises. For the appropriate types of operations, there are so many advantages of promises over plain callbacks that it is well worth the effort to convert when already working in an area of code.

**Promises are great for:**

- Monitoring synchronous operations
- That need to notify only once (usually completion or error)
- Coordinating or managing multiple asynchronous operations such as sequencing or branching async operations or managing multiple operations in flight at the same time
- Propagating errors from nested or deeply nested async operations
- Getting code ready for the use of async/await (or using it now with a transpiler)
- Operations that fit the Promise model where there are only three states: `pending`, `fulfilled` and `rejected` and where the state transitions from `pending => fulfilled` or from `pending => rejected` can then not change (a single one-way transition).
- Dynamically linking or chaining asynchronous operations (such as do these two async operations, examine the result, then decide which other async operations to do based on the intermediate result)
- Managing a mix of asynchronous and synchronous operations
- Automatically catching and propagating upwards any exceptions that occur in async completion callbacks (in plain callbacks these exceptions are sometimes silently hidden).

**Plain callbacks are good for things that promises cannot do:**

- Synchronous notifications (such as the callback for `Array.prototype.map()`)
- Notifications that may occur more than once (and thus need to call the callback more than once). Promises are one-shot devices and cannot be used for repeat notifications.
- Situations that cannot be mapped into the pending, fulfilled, rejected one-way state model.

And, I'd also add `EventEmitter` to the mix.

**EventEmitters are great for:**

- Publish/subscribe type notifications
- An interface with an event model, particular when events can occur more than once (like streams)
- Loose couplings when 3rd party code wants to participate or monitor something without any more of an API than an eventEmitter. No API to design. Just make an eventEmitter public and define some events and the data that goes with them.

------

**Notes about converting plain callback code to Promises**

If your callbacks fit the node calling convention with the callback passed as the last argument and called like this `callback(err, result)`, then you somewhat automatically wrap the parent function in a promise with `util.promisify()` in node.js or if using the [Bluebird promise library](http://bluebirdjs.com/docs/api-reference.html), with [`Promise.promisify()`](http://bluebirdjs.com/docs/api/promise.promisify.html).

With Bluebird, you can even promisify an entire module (that uses async callbacks in the node.js calling convention) at once such as:

```js
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

fs.writeFileAsync("file.txt", data).then(() => {
    // done here
}).catch(err => {
    // error here
});
```

------

**In node.js version 8+**

There is now `util.promisify()` which will convert an async function that uses the node.js async calling convention to a function that returns a promise.

Example from [the doc:](https://nodejs.org/api/util.html#util_util_promisify_original)

```js
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

// usage of promisified function
stat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```







They both exist to solve the same problem, handle the result of an asnychronous function.

Callbacks tend to be more verbose and coordinating multiple asynchronous requests concurrently can lead to [*callback hell*](http://callbackhell.com/) if you're not actively modularizing your functions. Error handling and tracing tends to be less straightforward and even confusing since there could be many Error objects that all go back to a single error further down the call stack. Errors, also need to be passed back to the original caller that can also lead to some head scratching when determining where the original Error was thrown if anonymous functions were used in the callback chain. One of the benefits of callbacks is that they are just plain old functions and don't require any additional understanding beyond knowing how an asynchronous operation works.

Promises are more common as they require less code, are more readable since they are written like synchronous functions, have a single error channel, can handle thrown errors and with [`util.promisify()`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) being added in the latest version of Node.js, can convert Error-First Callbacks to promises. There's also `async/await` which is [making its way into Node.js](https://blog.risingstack.com/async-await-node-js-7-nightly/) now as well, and they also interface with Promises.

This is totally opinion based, so it really is about what you're most comfortable with but, Promises and `async/await` are the evolution of the callback and enhance the asynchronous development experience. This isn't an exhaustive comparison by any means but rather, a high level look at both callbacks and promises.

> It sounds like you are saying that the process of using callbacks will be *replaced* by promises. Is that true? That's kind of what I was getting at with my question. I can't really see any reason to use callbacks instead of promises but I figured that might be a naive view. So I wanted to get a broader view (if any) of when to use callbacks and what are they good for. – [Sean Lynch](https://stackoverflow.com/users/1046297/sean-lynch) [Jul 11 '17 at 19:03](https://stackoverflow.com/questions/45041462/node-js-when-to-use-promises-vs-callbacks#comment77059513_45041629)
>
> 
> 
> They aren't being *replaced*, better alternatives are emerging that improve what callbacks do, handling asynchronous functionality. As far as when to use callbacks, like I said in my answer, it really depends on your comfort level with Promises or `async/await`. People tend to prefer Promises for the reasons that I stated above and more. I personally recommend using Promises if for nothing else than thats where the community is heading, if not already at. – [peteb](https://stackoverflow.com/users/2980607/peteb) [Jul 11 '17 at 19:06](https://stackoverflow.com/questions/45041462/node-js-when-to-use-promises-vs-callbacks#comment77059619_45041629) 



----------

2



I don't remember from where I got this stuff but might be helpful in understanding promises better.

Promises are not callbacks. A promise represents the future result of an asynchronous operation. Of course, writing them the way you do, you get little benefit. But if you write them the way they are meant to be used, you can write asynchronous code in a way that resembles synchronous code and is much more easy to follow: **ADVANTAGES** 1. Readability over callbacks 2. Easy to catch errors. 3. Simultaneous callbacks

**1. Readability over callbacks** Promises provide a more succinct and clear way of representing sequential asynchronous operations in javascript. They are effectively a different syntax for achieving the same effect as callbacks. The advantage is increased readability. Something like this

```js
aAsync()   
.then(bAsync)  
 .then(cAsync)   
.done(finish); 
```

is much more readable than the equivalent of passing each of those individual functions as callbacks, like

```js
aAsync(function(){
    return bAsync(function(){
        return cAsync(function(){
            finish()         
        })     
    }) 
}); 
```

**2. Easy to catch errors.** Certainly, not much less code, but much more readable. But this is not the end. Let's discover the true benefits: What if you wanted to check for any error in any of the steps? It would be hell to do it with callbacks, but with promises, is a piece of cake:

```js
api()
.then(function(result) {   
    return api2(); 
})
.then(function(result2){     
    return api3(); 
})
.then(function(result3){      
    // do work 
})
.catch(function(error) {    
    //handle any error that may occur before this point 
}); 
/* Pretty much the same as a try { ... } catch block. 
Even better: */
api()
.then(function(result){
    return api2(); })
.then(function(result2){
    return api3(); })
.then(function(result3){
    // do work 
})
.catch(function(error) {
    //handle any error that may occur before this point 
})
.then(function() {
    //do something whether there was an error or not      
    //like hiding an spinner if you were performing an AJAX request. 
});
```

**3. Simultaneous callbacks And even better:** What if those 3 calls to api, api2, api3 could run simultaneously (e.g. if they were AJAX calls) but you needed to wait for the three? Without promises, you should have to create some sort of counter. With promises, using the ES6 notation, is another piece of cake and pretty neat:

```js
Promise.all([api(), api2(), api3()])
.then(function(result) {
    //do work. result is an array containing the values of the three fulfilled promises. 
})
.catch(function(error) {
    //handle the error. At least one of the promises rejected. 
});
```

Hope you see Promises in a new light now.