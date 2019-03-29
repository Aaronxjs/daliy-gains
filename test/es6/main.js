// const s = [];
// s[0] = 1;
// s[1] = 2;
// console.log(s)
let m = new Array();
console.log(m.constructor);
let s = new Number();
console.log(s)
// m.prototype.s = function(){
//     this.name = 1;
// }
function likeArray(){
    this.name = 'likeArray';
}
likeArray.prototype = new Array();
likeArray.prototype.constructor = likeArray;

l = new likeArray()
console.log(l)
console.log(l.prototype);
console.log(l.__proto__.prototype);
console.log(l.__proto__ == likeArray.prototype)
// console.log(m.constructor)
// const s = '1';
// function say(){
//     console.log(s) //s is not defined
//     let s = '2'
// }
// say()
// function bar(x=y,y=2){
//     return [x,y];
// }
// console.log(bar());   // y is not defined


// function bar2(x=2,y=x){
//     return [x,y];
// }
// console.log(bar2());   //[2,2]正常
// // let 不允许在相同作用域内，重复声明同一个变量，不能在函数内部重新声明参数
