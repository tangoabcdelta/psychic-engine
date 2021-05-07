// Given an integer array nums,\
// move all 0's to the end of it while maintaining
// the relative order of the non-zero elements.
// Note that you must do this in-place
// without making a copy of the array.
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Input: nums = [0]
// Output: [0]

var nums = [0, 1, 0, 3, 12];
function printIt(n) {
  // they solution is in linear time
  // if the number of zeros is given by M,
  // then this program will run exactly O(N + M) times

  // take two pointers
  var i = 0; // first one to run through the loop
  var j = 0; // second one to find the non-zero elements
  for (; i < n.length; i++) {
    if (n[i] !== 0) {
      n[j] = n[i];
      j++;
    }
  }

  // after you've moved all non-zero elements
  // to the start, you can start inserting elements
  // at the end of the array
  for (i = j; i < n.length; i++) {
    n[i] = 0;
  }
  console.log(n);
}

printIt(nums);
printIt([0, 0, 0, 0, 0, 0, 3, 12, 0, 1, 0]);
printIt([0, 0, 0, 0, 0, 0, 3, 12, 0, 1, 0]);
printIt([0, 1, 0, 3, 12, 0, 1, 0, 3, 0, 0, 0, 0, 0]);

// zigzag traversal
//  1 3 2 7 6 5 4.

// print 1 to 25
Array.from(new Array(25).fill(1), (i, j) => {
  return j;
});

for (let value of arr) {
  console.log(value);
}
