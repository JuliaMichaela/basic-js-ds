const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  // Duplicates are ignored: every value is stored at most once.
  add(data) {
    const node = new Node(data);
    if (this._root === null) {
      this._root = node;
      return;
    }
    let current = this._root;
    while (current.data !== data) {
      const side = data < current.data ? 'left' : 'right';
      if (current[side] === null) {
        current[side] = node;
        return;
      }
      current = current[side];
    }
  }

  find(data) {
    let current = this._root;
    while (current !== null && current.data !== data) {
      current = data < current.data ? current.left : current.right;
    }
    return current;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this._root = this._removeFrom(this._root, data);
  }

  // Returns the new subtree root after removing `data` from the subtree.
  _removeFrom(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeFrom(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this._removeFrom(node.right, data);
      return node;
    }
    // Found the node: leaf or one child -> replace by the child (or null).
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
    // Two children: take the smallest value from the right subtree.
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    node.data = successor.data;
    node.right = this._removeFrom(node.right, successor.data);
    return node;
  }

  min() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
