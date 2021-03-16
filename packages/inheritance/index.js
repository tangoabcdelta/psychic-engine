// function Array2 () {
//   this.push.apply(this, arguments);
// };

function Array2 (...args) {
  this._args = args;
  this.push.apply(this, args);
};


Array2.prototype = new Array;
Array2.prototype.newFunc = function () {
  return `😋${this.length}😋`;
}


Object.defineProperty(Array2.prototype, 'size', {
  
  // configurable: true | false
  // type of this property descriptor may be changed
   // but the property shouldn't be deleted
   configurable: false,

  //  writable: true,
   // array length is a writable property


   get: function() {
     return this._args.length;
   }
});


var arr = [1,2,3];
var arr2 = new Array2(1,2,3);
console.log('newFunc' in arr);
console.log('newFunc' in arr2);

console.log('arr2', arr2)
arr2 = new Array2("a", "b", "c");
console.log('arr2', arr2)
arr2.push(1);
console.log('arr2', arr2)

class Array3 extends Array {
  newFunc() {
    return `😋${this.length}😋`;
  }
}

var arr3;
arr3 = new Array3("a", "b", "c");
arr3.newFunc()