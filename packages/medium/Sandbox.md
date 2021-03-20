Sandboxing

The act of creating a scope in which no other part of the application can operate (unless given an opportunity to), is called sandboxing.

In the context of JS apps, this is usually a function scope that exposes a limited subset of what's actually going on within it.

One library that's founded on the idea of sandboxes is YUI3. The basic unit of the application is a YUI instance sandbox:


    var Y = YUI(); // creates a configurable YUI instance

    // Creates a sandbox for one part of your application,
    // including the 'node' module.
    Y.use('node', function(Z) {
        // Z is a YUI instance that's specific to this sandbox.
        // Operations inside it are protected from outside code
        // unless exposed explicitly. Any modules you request in
        // use statement will be separately instanced just for
        // this sandbox (in this case, the 'node' module)
        //
        // That way, if another part of your application decides
        // to delete Z.Node (or worse, replace it with a
        // malicious proxy of Z.Node) the code you've written
        // here won't be affected.
    });

The advantages of sandboxes are primarily to reduce application complexity: since sandboxes are immutable, they're much easier to reason about and verify. They also improve runtime security, since a well-designed sandbox should be able to operate as a black box to other scripts running on the page. It does not prevent against all possible attacks, but it protects against many of the simple ones.

