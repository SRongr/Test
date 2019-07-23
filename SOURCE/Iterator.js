const arr = [1,2,3]

function OutIterator(arr) {
  let curIndex = 0
  const next = () => {
    return {
      value: arr[curIndex],
      done: ++curIndex == arr.length,
    }
  }
  return {
    next
  }
}

