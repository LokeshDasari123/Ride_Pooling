// // // function a (x){
// // //     return function(b){
// // //         return x+b;
// // //     }
// // // }

// // // function curry(r,con){
// // //     return function (a){
// // //         return r(a,con);
// // //     }
// // // }

// // // function add(a,b) {
// // //     return a+b;
// // // }

// // // var f1 = a(5);
// // // var f2 = a(10);
// // // var add10 = curry(add,10);
// // // var add5 = curry(add,5);
// // // console.log(add5(1));

// // for (let i = 0; i < 2; i++) {
// //   setTimeout(() => {
// //     console.log(i);
// //   }, 0);
// // }
// // {
// //     var i = 0;
// //   {
// //     let i = 0;
// //     setTimeout(() => {
// //       console.log(i);
// //     }, 0);
// //   }
// //   i++;
// //   {
// //     let i = 1
// //     setTimeout(() => {
// //       console.log(i);
// //     }, 0);
// //   }
// //   i++;
// // // }

// const promise = new Promise((resolve, reject)=>{
//     console.log(1)
//     setTimeout(()=>{
//         console.log('timerStart')
//         setTimeout(() => {
//             console.log("timeout inside");
//         },0)
//         resolve('success')
//         console.log('timerEnd')
//     },0)
//     console.log(2)
// })

// console.log(promise)
// promise
// .then((res)=>{
//     console.log(res)
// })
// console.log(4);

// console.log("Synchronous 1");

// let f = new Promise((resolve) => {
//     console.log(420);
//     setTimeout(() => {
//       console.log(69);
//     }, 0);
//     resolve("Promise 1");
// });

// setTimeout(() => {
//     console.log(f);
//     Promise.resolve().then(() => {
//     console.log(99);
//   });
//   console.log("Timeout 1");
// }, 0);

// function Student(name,age){
//     this.name = name;
//     this.age = age;
//     this.getDetails =  function() {
//         console.log(`Name: ${this.name}, Age: ${this.age}`);
//     }
//     this.add = function(a,b) {
//         console.log(this.age, a+b)
//     }
// }

// let a = new Student("teja",69);
// let b = {
//     name: "dinesh",
//     age: 20
// };
// let c = a.add.bind(b);
// c(3,4);
name = "teja";
const b = {
  name: "Vivek",
  f: function () {
    var self = this;
    console.log(this.name);
    (function () {
      console.log(this.name);
      console.log(self.name);
    })();
  },
};
b.f();
