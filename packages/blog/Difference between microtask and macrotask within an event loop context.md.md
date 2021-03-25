# Difference between microtask and macrotask within an event loop context

I've just finished reading the Promises/A+ specification and stumbled upon the terms microtask and macrotask: see http://promisesaplus.com/#notes

##  Notes
[Promises/A+](Promises/A+)


1. Here “platform code” means engine, environment, and promise implementation code. In practice, this requirement ensures that `onFulfilled` and `onRejected` execute asynchronously, after the event loop turn in which `then` is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as [`setTimeout`](https://html.spec.whatwg.org/multipage/webappapis.html#timers) or [`setImmediate`](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html#processingmodel), or with a “micro-task” mechanism such as [`MutationObserver`](https://dom.spec.whatwg.org/#interface-mutationobserver) or [`process.nextTick`](https://nodejs.org/api/process.html#process_process_nexttick_callback). Since the promise implementation is considered platform code, it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.
2. That is, in strict mode `this` will be `undefined` inside of them; in sloppy mode, it will be the global object.
3. Implementations may allow `promise2 === promise1`, provided the implementation meets all requirements. Each implementation should document whether it can produce `promise2 === promise1` and under what conditions.
4. Generally, it will only be known that `x` is a true promise if it comes from the current implementation. This clause allows the use of implementation-specific means to adopt the state of known-conformant promises.
5. This procedure of first storing a reference to `x.then`, then testing that reference, and then calling that reference, avoids multiple accesses to the `x.then` property. Such precautions are important for ensuring consistency in the face of an accessor property, whose value could change between retrievals.
6. Implementations should *not* set arbitrary limits on the depth of thenable chains, and assume that beyond that arbitrary limit the recursion will be infinite. Only true cycles should lead to a `TypeError`; if an infinite chain of distinct thenables is encountered, recursing forever is the correct behavior.

------------

I've never heard of these terms before, and now I'm curious what the difference could be?

I've already tried to find some information on the web, but all I've found is this post from the w3.org Archives (which does not explain the difference to me): http://lists.w3.org/Archives/Public/public-nextweb/2013Jul/0018.html

Additionally, I've found an npm module called "macrotask": https://www.npmjs.org/package/macrotask Again, it is not clarified what the difference exactly is.



All I know is, that it has something to do with the event loop, as described in https://html.spec.whatwg.org/multipage/webappapis.html#task-queue and https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint

###  Task Queues

An [event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop) has one or more task queues. A [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) is a [set](https://infra.spec.whatwg.org/#ordered-set) of [tasks](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task).

[Task queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) are [sets](https://infra.spec.whatwg.org/#ordered-set), not [queues](https://infra.spec.whatwg.org/#queue), because [step one of the event loop processing model](https://html.spec.whatwg.org/multipage/webappapis.html#step1) grabs the first [*runnable*](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task-runnable) [task](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task) from the chosen queue, instead of [dequeuing](https://infra.spec.whatwg.org/#queue-dequeue) the first task.

The [microtask queue](https://html.spec.whatwg.org/multipage/webappapis.html#microtask-queue) is not a [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue).

Tasks encapsulate algorithms that are responsible for such work as:

- Events

  Dispatching an `Event` object at a particular `EventTarget` object is often done by a dedicated task.Not all events are dispatched using the [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue); many are dispatched during other tasks.

Tasks encapsulate algorithms that are responsible for such work as:

- Events

  Dispatching an `Event` object at a particular `EventTarget` object is often done by a dedicated task.Not all events are dispatched using the [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue); many are dispatched during other tasks.

- Parsing

  The [HTML parser](https://html.spec.whatwg.org/multipage/parsing.html#html-parser) tokenizing one or more bytes, and then processing any resulting tokens, is typically a task.

- Callbacks

  Calling a callback is often done by a dedicated task.

- Using a resource

  When an algorithm [fetches](https://fetch.spec.whatwg.org/#concept-fetch) a resource, if the fetching occurs in a non-blocking fashion then the processing of the resource once some or all of the resource is available is performed by a task.

- Reacting to DOM manipulation

  Some elements have tasks that trigger in response to DOM manipulation, e.g. when that element is [inserted into the document](https://html.spec.whatwg.org/multipage/infrastructure.html#insert-an-element-into-a-document).

Formally, a task is a [struct](https://infra.spec.whatwg.org/#struct) which has:

- Steps

  A series of steps specifying the work to be done by the task.

- A source

  One of the [task sources](https://html.spec.whatwg.org/multipage/webappapis.html#task-source), used to group and serialize related tasks.

- A document

  A `Document` associated with the task, or null for tasks that are not in a [window event loop](https://html.spec.whatwg.org/multipage/webappapis.html#window-event-loop).

- A script evaluation environment settings object set

  A [set](https://infra.spec.whatwg.org/#ordered-set) of [environment settings objects](https://html.spec.whatwg.org/multipage/webappapis.html#environment-settings-object) used for tracking script evaluation during the task.

A [task](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task) is runnable if its [document](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task-document) is either null or [fully active](https://html.spec.whatwg.org/multipage/browsers.html#fully-active).

Per its [source](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task-source) field, each [task](https://html.spec.whatwg.org/multipage/webappapis.html#concept-task) is defined as coming from a specific task source. For each [event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop), every [task source](https://html.spec.whatwg.org/multipage/webappapis.html#task-source) must be associated with a specific [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue).

Essentially, [task sources](https://html.spec.whatwg.org/multipage/webappapis.html#task-source) are used within standards to separate logically-different types of tasks, which a user agent might wish to distinguish between. [Task queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) are used by user agents to coalesce task sources within a given [event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop).

For example, a user agent could have one [task queue](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) for mouse and key events (to which the [user interaction task source](https://html.spec.whatwg.org/multipage/webappapis.html#user-interaction-task-source) is associated), and another to which all other [task sources](https://html.spec.whatwg.org/multipage/webappapis.html#task-source) are associated. Then, using the freedom granted in the initial step of the [event loop processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model), it could give keyboard and mouse events preference over other tasks three-quarters of the time, keeping the interface responsive but not starving other task queues. Note that in this setup, the processing model still enforces that the user agent would never process events from any one [task source](https://html.spec.whatwg.org/multipage/webappapis.html#task-source) out of order.

------



I know I should theoretically be able to extract the differences myself, given this ***WHATWG*** specification. But I'm sure that others could benefit as well from a short explanation given by an expert.


https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context





## 3 Answers

232







One go-around of the event loop will have **exactly one** task being processed from the **macrotask queue** (this queue is simply called the *task queue* in the [WHATWG specification](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)). After this macrotask has finished, all available **microtasks** will be processed, namely within the same go-around cycle. While these microtasks are processed, they can queue even more microtasks, which will all be run one by one, until the microtask queue is exhausted.

## What are the practical consequences of this?

If a **microtask** recursively queues other microtasks, it might take a long time until the next macrotask is processed. This means, you could end up with a blocked UI, or some finished I/O idling in your application.

However, at least concerning Node.js's `process.nextTick()` function (which queues **microtasks**), there is an inbuilt protection against such blocking by means of `process.maxTickDepth()`. This value is set to a *default* of `1000`, cutting down further processing of **microtasks** after this limit is reached which allows the next **macrotask** to be processed)

## So when to use what?

Basically, use **microtasks** when you need to do stuff asynchronously in a synchronous way (i.e. when you would say *perform this (micro-)task in the most immediate future*). Otherwise, stick to **macrotasks**.

## Examples

**macrotasks:** [setTimeout](https://developer.mozilla.org/docs/Web/API/WindowTimers/setTimeout), [setInterval](https://developer.mozilla.org/docs/Web/API/WindowTimers/setInterval), [setImmediate](https://developer.mozilla.org/docs/Web/API/Window/setImmediate), [requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame), [I/O](https://developer.mozilla.org/docs/Mozilla/Projects/NSPR/Reference/I_O_Functions), UI rendering
**microtasks:** [process.nextTick](https://nodejs.org/uk/docs/guides/event-loop-timers-and-nexttick/), [Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), [queueMicrotask](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask), [MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver)







---------







## Basic concepts in [spec](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue):

- An event loop has one or more task queues.(task queue is macrotask queue)
- Each event loop has a microtask queue.
- task queue = macrotask queue != microtask queue
- a task may be pushed into macrotask queue,or microtask queue
- when a task is pushed into a queue(micro/macro),we mean preparing work is finished,so the task can be executed now.

## And the event loop process model is as follows:

when [call stack](https://vimeo.com/96425312) is empty,do the steps-

1. select the oldest task(task A) in task queues
2. if task A is null(means task queues is empty),jump to step 6
3. set "currently running task" to "task A"
4. run "task A"(means run the callback function)
5. set "currently running task" to null,remove "task A"
6. perform microtask queue
   - (a).select the oldest task(task x) in microtask queue
   - (b).if task x is null(means microtask queues is empty),jump to step (g)
   - (c).set "currently running task" to "task x"
   - (d).run "task x"
   - (e).set "currently running task" to null,remove "task x"
   - (f).select next oldest task in microtask queue,jump to step(b)
   - (g).finish microtask queue;
7. jump to step 1.

## a simplified process model is as follows:

1. run the oldest task in macrotask queue,then remove it.
2. run all available tasks in microtask queue,then remove them.
3. next round:run next task in macrotask queue(jump step 2)

## something to remember:

1. when a task (in macrotask queue) is running,new events may be registered.So new tasks may be created.Below are two new created tasks:
   - promiseA.then()'s callback is a task
     - promiseA is resolved/rejected:  the task will be pushed into microtask queue in current round of event loop.
     - promiseA is pending:  the task will be pushed into microtask queue in the future round of event loop(may be next round)
   - setTimeout(callback,n)'s callback is a task,and will be pushed into macrotask queue,even n is 0;
2. task in microtask queue will be run in the current round,while task in macrotask queue has to wait for next round of event loop.
3. we all know callback of "click","scroll","ajax","setTimeout"... are tasks,however we should also remember js codes as a whole in script tag is a task(a macrotask) too.