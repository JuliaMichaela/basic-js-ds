const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this._head = null; // first node: dequeue takes from here
    this._tail = null; // last node: enqueue appends here
  }

  // Returns the head of the list, or null if the queue is empty.
  getUnderlyingList() {
    return this._head;
  }

  enqueue(value) {
    // Spread gives a plain { value, next } object with the ListNode shape:
    // the tests compare the list with plain objects via deepStrictEqual,
    // which also checks prototypes, so a ListNode instance would not match.
    const node = { ...new ListNode(value) };
    if (this._tail === null) {
      this._head = node;
    } else {
      this._tail.next = node;
    }
    this._tail = node;
  }

  // Returns undefined for an empty queue.
  dequeue() {
    if (this._head === null) {
      return undefined;
    }
    const { value } = this._head;
    this._head = this._head.next;
    if (this._head === null) {
      this._tail = null;
    }
    return value;
  }
}

module.exports = {
  Queue
};
