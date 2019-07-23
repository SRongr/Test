const os = new Set([1, 2, 3, [0,1], true, 'abc'])


os.add(9)
os.add([0,1])

os.delete(9)

// os.clear()


console.log(os)

os.forEach((a,b,c) => {
  console.log(a,b,c)
})