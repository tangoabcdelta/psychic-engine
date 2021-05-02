robber


[2, 3, 11, 17, 5, 6, 9]
























a = str1
b = str2

insert
remove
replace


convert("abcd", "abcda"); // insert "a"
convert("abcda", "abcd"); // remove "a"
convert("abc", "def"); // remove "abc", insert "def"
convert("abc", "abcabc"); // insert "abc"
convert("a", "abc"); // insert "bc"
convert("ab", "ac"); // replace b with c
convert("dbc", "bc"); // remove "d"




function convert (str1, str2) {

  let i=0, j=0, k=0;
  
  while(k != Math.max(str1.length, str2.length)) {
   // while (str1[i] == str2[j]) {
   //  i++;
   //  j++;
   // }
   
    while (str1[k] == str2[k]) {
      k++;
    }
    
    if(k == str1.length) {
      insert(str2.substr(k, str2.length)); // do the insert operation because we've reached the end of str1 
    }
    if(k == str2.length) {
      remove(str1.substr(k, str1.length)); // do the remove operation because we've reached the end of str1 & it's longer than str2, we can match them only if we get rid of the last bit of text
    }
    
    if(k==0) {
      remove(str1); // there's no match, which means we have to drop the entire (first) string
      insert(str2);
    }
    
    if

      
  }
  
  

}






























// binary tree
// path for max sum


//rootNode.getMaxSum()



function Tree () {
  this.root;
}


function Node() {
  this.value;
  this.left;
  this.right
 
}





function findMax(node, _MAX_ARRAY) {
   
   while (node != null) {
   
   if (node.left.value != null) {
    if(node.value() > node.left.value) {
      _MAX_ARRAY.push(node);
   } else {
      _MAX_ARRAY.push(node.left);
    }
        // findMax(node.left);
        getMaxSum(node.left);
   }
   if (node.right.value != null) {
    if(node.value() > node.right.value) {
      _MAX_ARRAY.push(node);
   } else {
      _MAX_ARRAY.push(node.right);
    }
    // findMax(node.right);
    getMaxSum(node.right);
   }
  }
}


const _MAX = 0; //global

function getMaxSum(rootNode, _MAX_ARRAY = [], ) {
  
  _MAX_ARRAY.push(rootNode);
  findMax(rootNode, _MAX_ARRAY);
  
  _MAX = Math.max(_MAX_ARRAY);
  
  return _MAX_ARRAY.reduce((acc, node, index) => {
    return acc += node.value;
  }, 0); /// rootNode.value
}

console.log(_MAX):


  


