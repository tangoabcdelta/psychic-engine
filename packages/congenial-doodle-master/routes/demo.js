async function f() { console.log('hello'); }
async function g() { console.log('world'); }
async function h() {
  console.log('2');

  await f();
  console.log('4');

  await g();
  console.log('5');

  await f();
  console.log('6');

  await g();
  console.log('7');

  console.log('8');
  return 'hello';
}

console.log('1');
console.log(h());
console.log('3');



