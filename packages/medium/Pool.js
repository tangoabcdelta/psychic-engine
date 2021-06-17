// Question: Our application requires consumption of several objects which are reusable but expensive to create. 
// To eliminate the need to efficiently manage the creation and reuse of these resources,
// we intend to create a generic pooling library to abstract this for us. The interface of the class is depicted using the following example usage of the class:

function createUsableExpensiveObject() {
    // Just a stub implementation
    // Contains logic to create the object
    // It's implementation is *irrelevant* to the library
    //return {'a': 1};
    
    return {
        'a': 1
    };
}

class ResourcePool { 
    //to implement
    constructor(fn, maxInstances) {
        this.waitListQueue = [];
        this.maxInstances = maxInstances;
        this._pool = new Array(maxInstances).fill({});
        // .map((item, index) => {
        //     return {
        //         originalInstace: fn(),
        //         isFree: true
        //     }
        //     // Object.assign(source, moreProperties)
        //     // _.extend(fn(), moreProperties)
        //     return Object.assign(fn(), {
        //       isFree: true
        //     })
        // });
    }
    getFreeResource() {
        return this._pool.filter(instance => {
            return (instance.isFree === true);
        });
    }
    retrieve () {
        let freeResource = this.getFreeResource();
        this._pool
        
        return new Promise((resolve, reject) => {
            // setTimeOut(() => {
            // }, 1000);
        
            if(freeResource && freeResource.length > 0) {
                let obj = freeResource[0];
                obj.isFree = false;
                // send it to the consumer after marking "occupied"
                // resolve(obj);
                resolve(obj.originalInstace);
            } else {
                this.waitListQueue.push(resolve);
            }
        });
    }
    returnResource (instance) {
        let originalInstace = this._pool.filter(currentItem => {
            return (currentItem.originalInstace === instance);
        });
        
        originalInstace.isFree = true;
        
        if(this.waitListQueue.length > 0) {
            let resolveMethod = this.waitListQueue.unshift();
            resolveMethod(instance);
        }
    }
}

const maxInstances = 5;
const pool = new ResourcePool(createUsableExpensiveObject, maxInstances);

async function processInputUsingInstance (instance, input) {}

async (() => {
    const instance = await pool.retrieve();
    await processInputUsingInstance(instance, input); // we are just mocking the use of a resource, you can release after this statement
    
    
    const instance1 = await pool.retrieve();
    const instance2 = await pool.retrieve();


    // return the instance back to the pool so that it can be used 
    // again by future calls to pool.retrieve
    // return the res to the pool - sync opreation
    
    pool.returnResource(intance);    
})()


// either creates a new instance from the function passed, or 
// returns one previously created. always returns a promise.


// The pool should ensure that the creation is done only upto 
// maxInstances times.

// If the caller has already asked for max resources without returning 
// anything, and then asks for more, retrieve should queue the request 
// and return an incomplete promise.

// When the caller returns an instance, the queued requests should be 
// resolved.













