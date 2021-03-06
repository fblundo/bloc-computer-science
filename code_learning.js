For the following questions, describe in words how you could solve the problem and then do so. Use the depiction of the Binary Search Tree to refer to the examples.

1. Given a Binary Search Tree and a value, write a function that checks to see whether the value exists within the tree.
Example: The value 10 exists in the tree. The value 23 does not exist in the tree.

a) First, I would create a function "insert" to create my tree from scratch
b) Second, I would create a function called "search" that takes in 2 arguments, the starting node to search through (in this case the root), and the data or number to search for.
c) I would then check whether the node exists, if it doesn't, return 'this value doesn't exist in the tree.'
4) If I can't find the input data in the node I'm analyzing, I would check to see if input data is larger or smaller than node.data.
5) If smaller, I would keep moving left. If larger, I would move right.
6) After each move, I would restart the search function in a new node to analyze
7) Once the function finds that data is equal to the node data, it would return (`The value ${data} exists in the tree.`)

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.insert = function(val) {
  var root = this.root;

  if (!root) {
    this.root = new Node(val);
    return;
  }

  var currentNode = root;
  var newNode = new Node(val);

  while (currentNode) {
    if (val < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = newNode;
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
};

BinarySearchTree.prototype.getRootNode = function()
{
    return this.root;
}

// search for a node with given data
BinarySearchTree.prototype.search = function(rootNode, val) {
  if (!rootNode) {
    return("Value " + val + " does not exist in this tree.");
  }
  if (val < rootNode.value) {
    return this.search(rootNode.left, val);
  } else if (val > rootNode.value) {
    return this.search(rootNode.right, val);
  } else {
    return("Value " + val + " exists in this tree.");
  }
}

var BST = new BinarySearchTree();
BST.insert(15);
BST.insert(10);
BST.insert(25);
BST.insert(8);
BST.insert(20);
BST.insert(41);

console.log(BST.search(BST.root, 15)) // "Value 15 exists in this tree."
console.log(BST.search(BST.root, 49)) // "Value 49 does not exist in this tree."

2. Given a Binary Search Tree and two nodes, n1 and n2, write a function that finds the distance between the two nodes.
Example: The distance between the nodes 4 and 10 is 4. The distance between the nodes 8 and 10 is 1. The distance between the nodes 1 and 14 is 4.

a) First, I would create a function "insert" to create my tree from scratch
b) Second, I would create a function called "searchBool" to move through the tree
c) Then, I would create a function called "distancefromRoot" to compute the distance between one node and the root
d) Then, I would create a function called "distance" to compute the total distance between 2 nodes
e) Depending on where the 2 nodes are located, I would compute th distance accordingly (LCA = root, nodes are both on the right or left side of the tree, ...)

that takes in 2 arguments, the starting node to search through (in this case the root), and the data or number to search for.
c) I would then check whether the node exists, if it doesn't, return 'this value doesn't exist in the tree.'
4) If I can't find the input data in the node I'm analyzing, I would check to see if input data is larger or smaller than node.data.


function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.insert = function(val) {
  var root = this.root;

  if (!root) {
    this.root = new Node(val);
    return;
  }

  var currentNode = root;
  var newNode = new Node(val);

  while (currentNode) {
    if (val < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = newNode;
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
};

BinarySearchTree.prototype.searchBool = function(rootNode, val) {
  if (!rootNode) {
    return false;
  }
  if (val < rootNode.value) {
    return this.searchBool(rootNode.left, val);
  } else if (val > rootNode.value) {
    return this.searchBool(rootNode.right, val);
  } else {
    return true;
  }
}

BinarySearchTree.prototype.distanceFromRoot = function(root, node) {
    let counter=0;
     if (!this.searchBool(root, node)) {
      return 'node does not exist';
    }else if (root.value == node) {
    counter = 0;
  } else if (root.value > node) {
    counter = 1 + this.distanceFromRoot(root.left, node);
  } else {
    counter = 1 + this.distanceFromRoot(root.right, node);
  }
  return counter;
}

BinarySearchTree.prototype.distance = function(root, node1, node2) {
  if (this.searchBool(BST.root, node1) && this.searchBool(BST.root, node2)) {
    if (node1===root && node2===root){
      return `Total distance between nodes: 0`
    } else if (node1===root) {
      return `Total distance between nodes: ${this.distanceFromRoot(root, node2)}`;
    } else if (node2===root) {
      return `Total distance between nodes: ${this.distanceFromRoot(root, node1)}`;
      ;
    }

// Both lie in left
  if (root.value > node1 && root.value > node2) {
    if (node1 < node2){
      return this.distance(root.left, node1, node2);
    }else{
      return this.distance(root.left, node2, node1);
   }
  }
    // Both lie in right
    if (root.value < node1 && root.value < node2) {
      if (node1 < node2){
        return this.distance(root.right, node1, node2);
      }else{
        return this.distance(root.right, node2, node1);
      }
      return this.distance(root.right, node1, node2);
    }
    // Lie in opposite directions (Root is LCA of two nodes)
    if (root.value >= node1 && root.value <= node2) {
      return `Total distance between nodes: ${this.distanceFromRoot(root, node1) + this.distanceFromRoot(root, node2)}` ;
    }
  } else {
    return "One or both of the selected nodes does not exist in the tree";
  }
}

// Inserting nodes to the BinarySearchTree
var BST = new BinarySearchTree();
BST.insert(15);
BST.insert(10);
BST.insert(25);
BST.insert(9);
BST.insert(11);
BST.insert(19);
BST.insert(36);
BST.insert(8);
BST.insert(20);
BST.insert(41);

console.log(BST.distance(BST.root, 8, 41)) //"Total distance between nodes: 6"
console.log(BST.distance(BST.root, 15, 36)) //"Total distance between nodes: 2"
console.log(BST.distance(BST.root, BST.root, BST.root))//"Total distance between nodes: 0"
console.log(BST.distance(BST.root,BST.root, 25 )) //"Total distance between nodes: 1"
console.log(BST.distance(BST.root, 36,BST.root )) //"Total distance between nodes: 2"
console.log(BST.distance(BST.root, 8, BST.root )) //"Total distance between nodes: 3"

>> ALGORITHMS INTRODUCTION
