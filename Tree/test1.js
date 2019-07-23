
/**
 * 二叉树的序列化
 */

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
// console.log(tree);
// console.log(tree.root);
//中序遍历BST
// console.log(tree.inOrder());
// console.log(tree.preOrder())
// console.log(tree.postOrder());

let str = ''
con(tree.root)
console.log(str)
function con(root) {
  let last = root
  let nlast = root
  let popNode = null
  let q = []
  q.push(root)
  while(q.length) {
    popNode = q[0]
    if (popNode.left) {
      q.push(popNode.left)
      nlast = popNode.left
    }
    if (popNode.right) {
      q.push(popNode.right)
      nlast = popNode.right
    }
    str += q.shift().data + '!'
    if (popNode === last) {
      last = nlast
      // 换行
      str += '###'
    }
  }
} 



let last = nlast = tree.root
let popNode = null
let q = []
q.push(tree.root) 
re()
console.log(str)
function re () {
  popNode = q[0]
  if (popNode.left) {
    q.push(popNode.left)
    nlast = popNode.left
  }
  if (popNode.right) {
    q.push(popNode.right)
    nlast = popNode.right
  }
  str += q.shift().data + '!'
  if (popNode === last) {
    last = nlast
    str += '#'
  }
  if (q.length) {
    re()
  }
}




