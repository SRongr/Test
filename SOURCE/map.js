/**
 * map test
 */
// 链表结构
const obj2 = {
  key: 'name2',
  value: 'lcy',
  next: null
}

const obj1 = {
  key: 'name1',
  value: 'wrs',
  next: obj2
}

function myMap(arr){
  //这里定义了存放的桶的个数，  分桶的意义在于不会让某个链表非常的长
  this.bucketLength = 8
  //用来存放我们的kv
  this.bucket = []
  this.init();
};

//初始化函数 让每个桶里的初始next等于null
myMap.prototype.init = function (){
  this.bucket = new Array(this.bucketLength)
  for(let i = 0; i < this.bucketLength ; i++){
    this.bucket[i] = {next:null};
  }
}
//将传入的key值转换成hash值  依靠hash值分桶
myMap.prototype.makeHash = function (key){
  // String Number Object Array NaN boolean null undefined
  let newHash = 0;
  if (typeof key !== 'string') {
    // Number NaN function undefined null [] {}
    if (typeof key === 'number') {
      newHash += Object.is(key, NaN) ? 0 : key
    } else if (typeof key === 'object') {
      // null {} []
      newHash = 1
    } else if (typeof key === 'boolean') {
      // boolean
      newHash = Number(key)
    } else {
      newHash = 2
    }
  } else {
    // String
    let strLen = (key.length < 3) ? key.length : 3;
    for(let i = 0; i < strLen ; i++){
      newHash += (key[i] !== undefined) ? key[i].charCodeAt() : 0; 
    }
  }
  return newHash % this.bucketLength;
}


//set方法 有key值就覆盖value 没有就设置上
myMap.prototype.set = function (key,value){
  //不用遍历， 直接找到key 对应的hash值，
  let hash = this.makeHash(key);
  //转换成hash值
  let tempBucket = this.bucket[hash];
  // console.log(hash+','+list+','+nodeNext)
  while (tempBucket.next) {
    //next的key等于传入的key的话 value赋值 没有的话接着找下一个next
    if (tempBucket.next.key === key){
      tempBucket.next.value = value;
      return;
    }else{
      tempBucket = tempBucket.next;
    }
  }
    //如果没有next，则重新设置key，value；
  tempBucket.next = {key, value, next: null}

  //返回这个对象
  return tempBucket.next;
}
//get方法 有key则返回value没有则返回undefined
myMap.prototype.get = function (key){
  let hash = this.makeHash(key);
  let tempBucket = this.bucket[hash];
  //从每个桶的第一个开始查看
  while (tempBucket.next) {
    if (tempBucket.next.key === key) {
      // console.log(tempBucket.value)
      return tempBucket.next.value;
    }else {
      tempBucket = tempBucket.next;

    }
  }
  return

}
//has 方法 有key则返回true 无则false
myMap.prototype.has = function (key){
  let hash = this.makeHash(key);
  let tempBucket = this.bucket[hash];
  //从每个桶的第一个开始查看
  while (tempBucket.next) {
    if (tempBucket.next.key === key) {
      // console.log(tempBucket.value)
      return true
    }else {
      tempBucket = tempBucket.next;

    }
  }
  return false
}
//has 方法 删除key成功则返回true 无则false
myMap.prototype.delete = function (key){
  let hash = this.makeHash(key);
  let tempBucket = this.bucket[hash];
  //从每个桶的第一个开始查看
  while (tempBucket.next) {
    if (tempBucket.next.key === key) {
      tempBucket.next = tempBucket.next.next
      // console.log(tempBucket.value)
      return true
    }else {
      tempBucket = tempBucket.next;

    }
  }
  return false
}
//清空方法  直接执行初始化函数

myMap.prototype.clear = function (){
  this.init();
}
