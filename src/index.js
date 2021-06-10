const { add, subtract, divide, multiply } = require('./calculator');

/**
 * @file index.js is the root file for this example app
 * @author James Kulu
 * @see <a href="https://jameskulu.com">James Kulu</a>
 */

/**
 * Student Name
 * @type {string}
 */
const studentName = 'James';

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [98, 97.7, 76, 89];

/**
 * Todo object
 * @type {{id: number|string, text: string}}
 */
const todo = {
  id: '1',
  text: 'Hello'
};

/**
 * Calculate tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax) => {
  return `$${amount + tax * amount}`;
};



/**
 * Class to create a person object
 */
class Person {
  /**
   *
   * @param {Object} personInfo Information about the person
   */
  constructor(personInfo) {
    /**
     * @property {string} name Persons name
     */
    this.name = personInfo.name;
    /**
     * @property {string} age Persons age
     */
    this.age = personInfo.age;
  }

  /**
   * @property {Function} greet A greeting with the name and age
   * @returns {void}
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * See {@link Person}
 */
const person1 = new Person({
  name: 'John Doe',
  age: 30
});

console.log(add(20, 30));