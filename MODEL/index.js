// class Plane  {
//   static alive () {
//     return true
//   }
//   constructor() {
//     this.name = name
//   }
//   get a () {
//     return 'a'
//   }
//   fly () {
//     console.log('fly')
//   }
//   age = 123
  
// }

// function old () {
//   this.name = 2432
//   this.oldsay = function () {
//     console.log('say')
//   }
// }
// old.die = function () {
//   return false
// }

// old.prototype.say = function () {
//   console.log('say')
// }

// console.log(new Plane().fly())

// console.log(new old())

// class car extends Plane {
//   constructor() {
//     super()
//     // this.name = 213123
//   }
// }




function Plane(name, size) {
  console.log(1)
  this.name = name || 'feiji'
  this.size = size || 100
}
Plane.prototype.init = function () {
  console.log(123)
}
function extents (origin) {
  const result = function () {
    origin.apply(this, arguments)
  }
  console.log(result)
  const temp = function () {}
  temp.prototype = origin.prototype
  result.prototype = new temp()
  result.prototype.constructor = result
  return result
}

// function single (origin) {
//   origin && extents(origin)
//   const singleResult = (function() {
//     var instance;
//     return function (){
//       if (instance) {
//         return instance
//       }
//       origin && origin.apply(this, arguments)
//       instance = this
//     }
//   })
//   return singleResult
// }


function single(origin) {
  var singleResult = (function() {
    var instance
    return function () {
      if (instance) {
        return instance
      } else {
        origin && origin.apply(this, arguments)
        console.log(this)
        instance = this
      }
    }
  })()
  // origin && inhert(singleResult, origin)
  return singleResult
}
const OPlane = single(Plane)
var plane = new OPlane()

function factoryP () {

}
factoryP.create = function (type){
  if (!factory.prototype[type]) {
    throw Error('not have type')
  } else {
    if (factoryP.prototype[type].prototype.__proto__ !== factoryP.prototype) {
      inheirt(factoryP.prototype[type], factoryP)
    }
  }
}
factoryP.prototype.big = function (){
  console.log('createbig')
}
factoryP.prototype.fly = function (){
  console.log('fly')
}

const p = new factoryP('big')
console.log(p)

// var x = 10;
// var foo = {
//   x : 20,
//   bar: function () {
//     var x = 30;
//     // console.log(this)
//     return this.x
//   }
// }
// console.log(foo.bar())
// console.log((foo.bar = foo.bar)())
// console.log((foo.bar, foo.bar)())
// console.log(foo.bar.call(foo))

// var x = 1;
// if (function f (){}) {
//   console.log(1 + typeof f)
// }

// var x = [typeof x, typeof y][1]
// console.log(typeof typeof x )

// (function () {
//   // console.log(foo)
//   // return typeof foo.bar
// })({
//   foo: {
//     bar: 1
//   }
// })

// (function (){console.log(x)}) (1)

var obj = {
  foo : {
    bar : 2
  }
};

// (function (foo){
//   console.log(typeof foo.bar)
// })(obj)


// (function (foo){
//   console.log(typeof foo.bar)
// })({
//   foo: {
//     bar: 1
//   }
// })
// function f () {
//   return f;
// }

// var a = new f() instanceof f 


function inheirt (target, origin) {
  const temp = function () {}
  temp.prototype = origin.prototype
  target.prototype = new temp()
  target.prototype.constructor = target
}
function extend (origin) {
  var res = function (){
    origin.apply(this, arguments)
  }
  return res
}
function single (origin) {
  var singleResult = (function (){
    var instance;
    return function () {
      if (instance) {
        return instance
      } else {
        console.log(this)
        origin && origin.apply(this, arguments)
        instance = this
      }
    }
    origin && inheirt(target)
  })
  return singleResult
}




const p1 = new Promise((res, rej) => {
  rej(123)
})

p1 
  .then(data => console.log(data), e => console.log(e))


const arr = [1,2,3,4,5,4,4,21,3,9] 

function res (arr) {
  const obj = {}
  for (let i = 0; i < arr.length; i ++) {
    if (!obj[arr[i]]) {
      
      console.log(arr[i])
      obj[arr[i]] = 1
    }
  } 
  const result = Object.keys(obj)
  return result
}
console.log(res(arr))
console.log(Number.call(arr,...arr ))



function printTree (root) {
  const arr = []
  if (!root) {
    return  []
  } else {
    const queue = []
    queue.push(root)
    while (queue.length) {
      for (let i = 0; i < queue.length; i ++) {
        const node = queue.shift()
        arr.push(node.val)
        if (nodeleft) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
  }
  return arr
}





function text(a){
  console.log(a)
  var a = 123;
  console.log(a);
  function a (){}
  console.log(a);
console.log(b);
  var b = function(){}
  console.log(b);
  function d(){}
console.log(d)
}
