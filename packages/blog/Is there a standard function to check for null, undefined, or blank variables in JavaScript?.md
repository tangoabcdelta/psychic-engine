# Is there a standard function to check for null, undefined, or blank variables in JavaScript?
https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in/5515349#5515349


Is there a universal JavaScript function that checks that a variable has a value and ensures that it's not `undefined` or `null`? I've got this code, but I'm not sure if it covers all cases:

    function isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }
    
    
You can just check if the *variable* has a `truthy` value or not. That means

    if( value ) {
    }

will evaluate to `true` if `value` is **not**:

 - null
 - undefined
 - NaN
 - empty string ("")
 - 0
 - false

The above list represents all possible `falsy` values in ECMA-/Javascript. Find it in the [specification][1] at the `ToBoolean` section.

Furthermore, if you do not **know** whether a variable exists (that means, if it was *declared*) you should check with the `typeof` operator. For instance

    if( typeof foo !== 'undefined' ) {
        // foo could get resolved and it's defined
    }

If you can be sure that a *variable* is declared at least, you should directly check if it has a `truthy` value like shown above.

Further read: http://typeofnan.blogspot.com/2011/01/typeof-is-fast.html


  [1]: https://www.ecma-international.org/ecma-262/5.1/#sec-9.2
  
  
  
  
The verbose method to check if value is undefined or null is:

    return value === undefined || value === null;

You can also use the `==` operator but this expects one to [know all the rules][1]:

    return value == null; // also returns true if value is undefined


  [1]: http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3





    function isEmpty(value){
      return (value == null || value.length === 0);
    }

This will return true for

    undefined  // Because undefined == null

    null

    []

    ""

and zero argument functions since a function's `length` is the number of declared parameters it takes.

To disallow the latter category, you might want to just check for blank strings

    function isEmpty(value){
      return (value == null || value === '');
    }
    
    
    
    
    
    
    
    
    
    
This is the safest check and I haven't seen it posted here exactly like that:

    if (typeof value !== 'undefined' && value) {
        //deal with value'
    };

It will cover cases where **value** was never defined, and also any of these:

 - null
 - undefined (value of undefined is not the same as a parameter that was never defined)
 - 0
 - "" (empty string)
 - false
 - NaN


<sub>Edited: Changed to strict equality (!==) because it's the norm by now ;)</sub>




You may find the following function useful: 

    function typeOf(obj) {
      return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    }

Or in ES7 (comment if further improvements)

    function typeOf(obj) {
      const { toString } = Object.prototype;
      const stringified = obj::toString();
      const type = stringified.split(' ')[1].slice(0, -1);
          
      return type.toLowerCase();
    }

Results:

    typeOf(); //undefined
    typeOf(null); //null
    typeOf(NaN); //number
    typeOf(5); //number
    typeOf({}); //object
    typeOf([]); //array
    typeOf(''); //string
    typeOf(function () {}); //function
    typeOf(/a/) //regexp
    typeOf(new Date()) //date
    typeOf(new WeakMap()) //weakmap
    typeOf(new Map()) //map

"Note that the bind operator (::) is not part of ES2016 (ES7) nor any later edition of the ECMAScript standard at all. It's currently a stage 0 (strawman) proposal for being introduced to the language." – Simon Kjellberg. the author wishes to add his support for this beautiful proposal to receive royal ascension.





The first answer with best rating is wrong. If value is undefined it will throw an exception in modern browsers. You have to use: 

    if (typeof(value) !== "undefined" && value)

or 

    if (typeof value  !== "undefined" && value)
    
    
    
And sometimes
This condition check


    if (!!foo) {
        //foo is defined
    }


is all you need.



A solution I like a lot:

Let's define that a blank variable is `null`, or `undefined`, or if it has length, it is zero, or if it is an object, it has no keys:

    function isEmpty (value) {
      return (
        // null or undefined
        (value == null) ||

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
      )
    }

Returns:

- **true:** `undefined`, `null`, `""`, `[]`, `{}`
- **false:** `true`, `false`, `1`, `0`, `-1`, `"foo"`, `[1, 2, 3]`, `{ foo: 1 }`
    
    
    
    
    
    
    
    
    
    
    
    
