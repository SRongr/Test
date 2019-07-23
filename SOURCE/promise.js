// 步骤 1 状态声明 改变
// 2 异步
// 3 链式调用
// 4 then 异步执行
// 异常捕获
// 空then 处理
// then 中返回一个新的Promise

function MyPromise(executor) {
  let _this = this
  _this.status = 'pending'
  _this.resolveValue = null
  _this.rejectValue = null
  _this.ResolveCallBackList = [] // 存储异步回调函数
  _this.RejectCallBackList = []
  function resolve(value) { 
    // 在此处接收值，如果想要传递到then， 只能保存到外面，所以在外面声明变量
    if (_this.status === 'pending') { // 只有等待状态的时候才可以改变状态
      _this.status = 'resolved'
      _this.resolveValue = value
      _this.ResolveCallBackList.forEach((ele) => {
        ele()
      })
    }
  }

  function reject(value) {
    if(_this.status === 'pending') {
      _this.status = 'rejected'
      _this.rejectValue = value
      _this.RejectCallBackList.forEach((ele) => {
        ele()
      })
    } 
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error) 
  }
}

function ResolveReturnPromise (nextResolveValue, res, rej) {
  // nextResolveValue 为then 中处理方式返回值， res, rej是传入的是executor
  if (nextResolveValue instanceof MyPromise) {
    nextResolveValue.then((val) => {
      res(val)
    }, (reason) => {
      rej(reason)
    })
  } else {
    res(nextResolveValue)
  }
}
// then
MyPromise.prototype.then = function (onResolved, onRejected) {
  if(!onResolved) {
    onResolved = function (val) {
      return val
    }
  }
  if(!onRejected) {
    onRejected = function (err) {
      throw new Error(err)
    }
  }
  let _this = this
  var nextPromise = new MyPromise((res, rej) => {
    if (_this.status === 'resolved') {
      setTimeout(() => {
        try {
          var nextResolveValue = onResolved(_this.resolveValue)  // 成功回调 传入回调的参数
          ResolveReturnPromise(nextResolveValue, res, rej)
        } catch (error) {
          rej(error)
        }
      }, 0)
    }
    if (_this.status === 'rejected') {
      setTimeout(() => {
        try {
          var nextRejectValue = onRejected(_this.rejectValue)
          ResolveReturnPromise(nextRejectValue, res, rej)
        } catch (error) {
          rej(error)
        }
      }, 0)
    }
    if (_this.status === 'pending') {
      // 如果Promise 里面是异步的， 在.then 的时候 status 状态没有被改变，将then 中传入的处理函数放到数组里，在异步执行完成之后执行。
      _this.ResolveCallBackList.push(function () {
        setTimeout(() => {
          try {
            var nextResolveValue = onResolved(_this.resolveValue)  // 成功回调 传入回调的参数
            ResolveReturnPromise(nextResolveValue, res, rej)
          } catch (error) {
            rej(error)
          }
        }, 0)
      })
      _this.RejectCallBackList.push(function () {
        setTimeout(() => {
          try {
            var nextRejectValue = onRejected(_this.rejectValue)
            ResolveReturnPromise(nextRejectValue, res, rej)
          } catch (error) {
            rej(error)
          }
        }, 0)
      })
    }
  })
  return nextPromise
}

// rece 特点传入一个promise 数组， 哪一个先改变，执行哪个promise 对象， 这可以恰好运用Promise 只能改变一次状态的特点
MyPromise.race = function (promiseArr) {
  return new MyPromise((res, rej) => {
    promiseArr.forEach((promise, index) => {
      promise.then(res,rej)
    })
  })
} 

// all 特点 传入一个promise 数组， 只有所有的resolve 之后才会接受， 并得到的是一个返回值数组，如果有一个拒绝，则返回拒绝的返回值。
MyPromise.all = function (promiseArr) {
  return new MyPromise((res, rej) => {
    var len = promiseArr.length 
    var valArr = new Array(len)
    var resolveCount = 0
    promiseArr.forEach((promise, index) => {
      promise.then(val => {
        valArr[index] = val
        resolveCount ++
        if (resolveCount === len) {
          res(valArr)
        }
      }, err => {
        rej(err)
      })
    })
  })
}


