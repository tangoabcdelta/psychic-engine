const p = new Promise((resolve, reject) => {
  setTimeout(function(){
     resolve('success');
  }, 1000);
});

p.then(()=> {
  console.log('hello world');
});


async function main() {
  await p;
  console.log('p is done');
} 

main();
